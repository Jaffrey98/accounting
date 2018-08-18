const frappe = require('frappejs');
const Balance = require('./Balance');
const balance = new Balance();

class StockLedger {
    async run(params) {
        const filters = {};
        
        async function setEntryData(whType, meta, item) {
            let wh = {};
            wh.name = meta.name;
            wh.date = meta.date;
            wh.itemName = item.itemName;
            switch (whType) {
                case 'src':
                    wh.wName = item.sourceWarehouse;
                    wh.quantity = `- ${item.quantity}`;
                    wh.balance = await balance.getBalance(item.sourceWarehouse, item.itemName, item.parent);
                    wh.balance = `${wh.balance}`;
                    break;
                case 'targ':
                    wh.wName = item.targetWarehouse;
                    wh.quantity = `+ ${item.quantity}`;
                    wh.balance = await balance.getBalance(item.targetWarehouse, item.itemName, item.parent);
                    wh.balance = `${wh.balance}`;
                    break;
            }
            return wh;
        }

        async function populateData(meta, item, choice) {
            let dataItem = [];
            let src = {};
            let targ = {};
            switch (choice) {
                case (0):
                    src = await setEntryData('src', meta, item);
                    targ = await setEntryData('targ', meta, item);
                    dataItem.push(src, targ);
                    break;
                case (1):
                    src = await setEntryData('src', meta, item);
                    dataItem.push(src);
                    break;
                case (2):
                    targ = await setEntryData('targ', meta, item);
                    dataItem.push(targ);
                    break;
                default:
                    break;
            }
            return dataItem;
        }

        async function organizeEntries(stockEntryData) {
            let data = [];
            console.log(stockEntryData);
            await Promise.all(await stockEntryData.map(async function (stockEntry) {
                await Promise.all(await stockEntry.items.map(async function (item) {
                    let d;
                    if (item.sourceWarehouse && item.targetWarehouse) {
                        d = await populateData(stockEntry.meta, item, 0);
                        data.push(...d);
                    } else if (item.sourceWarehouse) {
                        d = await populateData(stockEntry.meta, item, 1);
                        data.push(...d);
                    } else {
                        d = await populateData(stockEntry.meta, item, 2);
                        data.push(...d);
                    }
                }));
            }));
            return data;
        }

        async function getStockEntryItems(stockEntries) {
            let stockEntryRawData = await stockEntries.map(async function (stockEntry) {
                let stockEntryItems = await frappe.db.getAll({
                    doctype: 'StockEntryItem',
                    fields: ['parent', 'sourceWarehouse', 'targetWarehouse', 'itemName', 'quantity'],
                    orderBy: 'parent',
                    order: 'desc',
                    filters: {
                        parent: stockEntry.name
                    }
                });
                return {
                    meta: stockEntry,
                    items: stockEntryItems
                }
            });
            return await Promise.all(stockEntryRawData).then(async function (stockEntryData) {
                return await organizeEntries(stockEntryData);
            });
        }

        async function getStockEntries(params) {
            let stockEntries = await frappe.db.getAll({
                doctype: 'StockEntry',
                fields: ["*"],
                // filters: filters
            });

            return await getStockEntryItems(stockEntries);
        }

        let data = await getStockEntries(params);
        return data;
    }
}

module.exports = StockLedger;