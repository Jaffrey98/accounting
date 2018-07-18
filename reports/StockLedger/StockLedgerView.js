const ReportPage = require('frappejs/client/desk/reportpage');
const frappe = require('frappejs');

module.exports = class StockLedgerView extends ReportPage {
    constructor() {
        super({
            title: frappe._('Stock Ledger'),
            filterFields: [
                // {
                //     fieldtype: 'Select',
                //     options: ['', 'Invoice', 'Payment'],
                //     label: 'Reference Type',
                //     fieldname: 'referenceType'
                // },
                // {
                //     fieldtype: 'Link',
                //     target: 'Party',
                //     label: 'Party'
                // },
                // {
                //     fieldtype: 'Date',
                //     label: 'From Date'
                // },
                // {
                //     fieldtype: 'Date',
                //     label: 'To Date'
                // }
            ]
        });

        this.method = 'stock-ledger';
    }

    getColumns() {
        return [
            {
                label: 'Date',
                fieldname: 'date'
            },
            {
                label: 'Source',
                fieldname: 'sourceWarehouse'
            },
            {
                label: 'Target',
                fieldname: 'targetWarehouse'
            },
        ]
    }
}
