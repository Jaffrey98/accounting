const frappe = require('frappejs');

class StockLedger {
    async run(params) {
        const filters = {};
        if (params.fromDate) filters.date = ['>=', params.fromDate];
        if (params.toDate) filters.date = ['<=', params.toDate];

        let data = await frappe.db.getAll({
            doctype: 'StockEntry',
            fields: ['date', 'sourceWarehouse', 'targetWarehouse'],
            // filters: filters
        });

        return data;
    }
}

module.exports = StockLedger;