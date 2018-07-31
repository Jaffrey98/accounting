const frappe = require('frappejs');

class StockLedger {
    async run(params) {
        const filters = {};
        if (params.fromDate) filters.date = ['>=', params.fromDate];
        if (params.toDate) filters.date = ['<=', params.toDate];

        let data = await frappe.db.getAll({
            doctype: 'StockEntryItem',
            fields: ['sourceWarehouse', 'targetWarehouse', 'itemName', 'quantity'],
            fields: ["*"],
            orderBy: 'idx',
            // filters: filters
        });

        return data;
    }
}

module.exports = StockLedger;