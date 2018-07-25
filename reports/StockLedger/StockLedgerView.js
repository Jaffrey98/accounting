const title = 'Stock Ledger';
module.exports = {
    title: title,
    method: 'stock-ledger',
    filterFields: [
        // {
        //     fieldtype: 'Select',
        //     options: ['', 'Invoice', 'Payment'],
        //     label: 'Reference Type',
        //     fieldname: 'referenceType'
        // },
        {
            fieldtype: 'Date',
            label: 'From Date',
            fieldname: 'fromDate'
        },
        {
            fieldtype: 'Date',
            label: 'To Date',
            fieldname: 'toDate'
        }
    ],
    getColumns() {
        return [
            {
                label: 'Date',
                fieldname: 'date'
            }, {
                label: 'Source',
                fieldname: 'sourceWarehouse'
            }, {
                label: 'Target',
                fieldname: 'targetWarehouse'
            },
        ];
    }
};
