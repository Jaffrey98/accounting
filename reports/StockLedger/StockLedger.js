const frappe = require('frappejs');

class StockLedger {
    async run(params) {
        let data = [];

        const filters = {};
        if (params.fromDate) filters.date = ['>=', params.fromDate];
        if (params.toDate) filters.date = ['<=', params.toDate];

        function setEntryData(wh, whType, meta, item){
            wh.name = meta.name;
            wh.date = meta.date;
            wh.itemName = item.itemName;
            switch (whType) {
                case 'src':
                    wh.wName = item.sourceWarehouse;
                    wh.quantity = `- ${item.quantity}`;
                    break;
                    case 'targ':
                    wh.wName = item.targetWarehouse;
                    wh.quantity = `+ ${item.quantity}`;
                    break;
            }
            console.log(wh);
        }

        function populateData(meta, item, choice) {
            let dataItem = [];
            let src = {};
            let targ = {};
            switch (choice) {
                case (0):
                    setEntryData(src, 'src', meta, item);
                    setEntryData(targ, 'targ', meta, item);
                    dataItem.push(src,targ);
                    break;
                case (1):
                    setEntryData(src, 'src', meta, item);
                    dataItem.push(src);
                    break;
                case (2):
                    setEntryData(targ, 'targ', meta, item);
                    dataItem.push(targ);
                    break;            
                default:
                    break;
            }
            return dataItem;
        }

        async function organizeEntries(stockEntryData) {
            await stockEntryData.map(async function(stockEntry){
                await stockEntry.items.map((item)=>{
                    if(item.sourceWarehouse && item.targetWarehouse) {
                        data.push(...populateData(stockEntry.meta, item, 0))
                    } else if (item.sourceWarehouse){
                        data.push(...populateData(stockEntry.meta, item, 1))
                    } else {
                        data.push(...populateData(stockEntry.meta, item, 2))
                    }
                })                
            })
            console.log(data);
        }

        async function getStockEntryItems(stockEntries) {
            console.log(stockEntries)
            let stockEntryRawData = await stockEntries.map(async function(stockEntry) {
                let stockEntryItems = await frappe.db.getAll({
                    doctype: 'StockEntryItem',
                    fields: ['sourceWarehouse', 'targetWarehouse', 'itemName', 'quantity'],
                    orderBy: 'idx',
                    order: 'desc',
                    filters: { parent : stockEntry.name }
                });
                return { 
                    meta : stockEntry,
                    items : stockEntryItems 
                }
            })
            await Promise.all(stockEntryRawData).then(function (stockEntryData) {
                console.log(stockEntryData);
                organizeEntries(stockEntryData);
            })
        }

        async function getStockEntries(params) {
            let stockEntries = await frappe.db.getAll({
                doctype: 'StockEntry',
                fields: ["*"],
                // filters: filters
            });

            let stockEntryRawData = await getStockEntryItems(stockEntries);

            // return organizeEntries(stockEntryRawData); 
        }

        async function getData(params){
            return getStockEntries(params);
        }

        await getData(params);
        return(data);
    }
}

module.exports = StockLedger;