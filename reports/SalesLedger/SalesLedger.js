const frappe = require('frappejs');

class SalesLedger {
    async run(params) {

        let filters = {};
        filters.parent = {};
        filters.child = {};

        if (params.toDate || params.fromDate) {
            filters.parent.date = [];
            if (params.toDate) filters.parent.date.push('<=', params.toDate);
            if (params.fromDate) filters.parent.date.push('>=', params.fromDate);
        }


        async function getSalesOrderEntries(filters) {
            let salesEntries = await frappe.db.getAll({
                doctype: 'SalesOrder',
                fields: ["*"],
            });

            console.log(salesEntries);
        }

        let data = await getSalesOrderEntries(filters);
        return data;
    }
}

module.exports = SalesLedger;