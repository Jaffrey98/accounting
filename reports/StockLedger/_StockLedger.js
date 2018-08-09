const frappe = require('frappejs');

class StockLedger {
    async run(params) {
        let data = [];

        const filters = {};
        if (params.fromDate) filters.date = ['>=', params.fromDate];
        if (params.toDate) filters.date = ['<=', params.toDate];

        function computeBalance(additions, deletions) {
            let add = 0;
            let del = 0;
            console.log("in compute");
            console.log(additions);
            console.log(deletions);
            if (additions.length !== 0) {
                additions.forEach(function (item) {
                    add += item.quantity;
                    console.log(add);
                });
            }
            if (deletions.length !== 0) {
                deletions.forEach(function (item) {
                    del -= item.quantity;
                    console.log(del);
                });
            }

            console.log(add + del);
            return add + del;
        }

        async function getAdditions(whName, itemName) {
            let additions = await frappe.db.getAll({
                doctype: 'StockEntryItem',
                fields: ['quantity'],
                orderBy: 'idx',
                order: 'desc',
                filters: {
                    targetWarehouse: whName,
                    itemName: itemName
                }
            });
            return additions;
            // return Promise.resolve(additions);
            // return Promise.resolve(additions.then((res)=>res));
        }

        async function getDeletions(whName, itemName) {
            let deletions = await frappe.db.getAll({
                doctype: 'StockEntryItem',
                fields: ['quantity'],
                orderBy: 'idx',
                order: 'desc',
                filters: {
                    sourceWarehouse: whName,
                    itemName: itemName
                }
            });
            return deletions;
            // return Promise.resolve(deletions);
            // return Promise.resolve(deletions.then((res)=>res));
        }

        async function getBalance(whName, itemName) {
            let additions = await getAdditions(whName, itemName)
            let deletions = await getDeletions(whName, itemName)
            let x = computeBalance(additions, deletions);
            console.log(x);
            // return x;
            return Promise.resolve(x);
            // additions.then(function(add){
            //     deletions.then(function (del){
            //         console.log(`w: ${whName}, a:`);
            //         console.log(add);
            //         console.log(`w: ${whName}, d:`);
            //         console.log(del);
            //         let x = computeBalance(add,del);
            //         console.log(x);
            //         return Promise.resolve(x)
            //     })
            // })

        }

        async function setEntryData(whType, meta, item) {
            let wh = {}
            let balance;
            wh.name = meta.name;
            wh.date = meta.date;
            wh.itemName = item.itemName;
            switch (whType) {
                case 'src':
                    wh.wName = item.sourceWarehouse;
                    wh.quantity = `- ${item.quantity}`;
                    wh.balance = await getBalance(item.sourceWarehouse, item.itemName);
                    wh.balance = `${wh.balance}`;
                    console.log(wh.wName);
                    console.log(wh.balance);
                    break;
                case 'targ':
                    wh.wName = item.targetWarehouse;
                    wh.quantity = `+ ${item.quantity}`;
                    wh.balance = await getBalance(item.targetWarehouse, item.itemName);
                    wh.balance = `${wh.balance}`;
                    console.log(wh.wName);
                    console.log(wh.balance);
                    break;
            }
            return Promise.resolve(wh);
        }

        async function populateData(meta, item, choice) {
            let dataItem = [];
            let src = {};
            let targ = {};
            let request;
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
            return Promise.resolve(dataItem);
        }

        async function organizeEntries(stockEntryData) {
            await stockEntryData.forEach(async function (stockEntry) {
                await stockEntry.items.forEach(async function (item) {
                    let d;
                    if (item.sourceWarehouse && item.targetWarehouse) {
                        d = await populateData(stockEntry.meta, item, 0);
                        console.log('d');
                        console.log(d);
                        data.push(...d);
                    } else if (item.sourceWarehouse) {
                        d = await populateData(stockEntry.meta, item, 1);
                        data.push(...d);
                        console.log('d');
                        console.log(d);
                    } else {
                        d = await populateData(stockEntry.meta, item, 2);
                        data.push(...d);
                        console.log('d');
                        console.log(d);
                    }
                });
            });
            console.log(data);
        }

        async function getStockEntryItems(stockEntries) {
            console.log(stockEntries)
            let stockEntryRawData = await stockEntries.map(async function (stockEntry) {
                let stockEntryItems = await frappe.db.getAll({
                    doctype: 'StockEntryItem',
                    fields: ['sourceWarehouse', 'targetWarehouse', 'itemName', 'quantity'],
                    orderBy: 'idx',
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
            await Promise.all(stockEntryRawData).then(function (stockEntryData) {
                console.log(stockEntryData);
                organizeEntries(stockEntryData);
            });
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

        async function getData(params) {
            return getStockEntries(params);
        }

        await getData(params);
        return (data);
    }
}

module.exports = StockLedger;