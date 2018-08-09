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
                label: 'Stock Entry ID',
                fieldname: 'name'
            },
            {
                label: 'Date',
                fieldname: 'date'
            },
            {
                label: 'Warehouse',
                fieldname: 'wName'
            },
            {
                label: 'Item',
                fieldname: 'itemName'
            },
            {
                label: 'Quantity',
                fieldname: 'quantity'
            },
            {
                label: 'Balance Quantity',
                fieldname: 'balance'
            }
        ];
    }
};
