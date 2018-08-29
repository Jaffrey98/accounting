const frappe = require('frappejs');
const BaseDocument = require('frappejs/model/document');
const Balance = require('../../../reports/StockLedger/Balance.js');
const balance = new Balance();

module.exports = class StockEntry extends BaseDocument {
    async validate() {
        console.log(this);
        let seItems = this.items;
        let entryName = this.name;
        console.log(this.name);
        await Promise.all(seItems.map(async function (item) {
            if(item.sourceWarehouse == item.targetWarehouse){
                alert('Source and Target Warehouse cannot be the same');
                throw new frappe.errors.ValidationError('Source and Target Warehouse cannot be the same');
                // throw new Error('Source and Target Warehouse cannot be the same');
            }
            if(item.sourceWarehouse){
                console.log('in if');
                console.log(item.sourceWarehouse, item.itemName, entryName);
                console.log(await balance.getBalance(item.sourceWarehouse, item.itemName, entryName));
                if (item.quantity > await balance.getBalance(item.sourceWarehouse, item.itemName, entryName)) {
                    console.log('in if if');
                    alert(`Insufficient quantity for item "${item.itemName}" in warehouse "${item.sourceWarehouse}"`);
                    throw new frappe.errors.ValidationError(`Insufficient quantity for item "${item.itemName}" in warehouse "${item.sourceWarehouse}"`);
                    throw new Error(`Insufficient quantity for item "${item.itemName}" in warehouse "${item.sourceWarehouse}"`);
                }
            }
        }));
    }
}