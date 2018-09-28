const title = 'Sales Ledger';
module.exports = {
    title: title,
    method: 'sales-ledger',
    filterFields: [
        {
            fieldtype: 'Date',
            label: 'From Date',
            fieldname: 'fromDate'
        },
        {
            fieldtype: 'Date',
            label: 'To Date',
            fieldname: 'toDate'
        },
        {
            fieldtype: 'Link',
            label: 'Customer',
            target: 'Party',
            getFilters: (query, control) => {
                return {
                    keywords: ['like', query],
                    customer: 1
                };
            },
            fieldname: 'customer'
        },
        {
            fieldtype: "Select",
            label: 'Status',
            options: [
                "Unbegun",
                "Pending",
                "Completed"
            ],
            fieldname: 'status'
        },
    ],
    getColumns() {
        return [
            {
                label: 'Sales Order ID',
                fieldname: 'name'
            },
            {
                label: 'Date',
                fieldname: 'date'
            },
            {
                label: 'Customer',
                fieldname: 'customer'
            },
            {
                label: 'Items Ordered (Total)',
                fieldname: 'noItemsOrdered'
            },
            {
                label: 'Items Delivered',
                fieldname: 'noItemsDelivered'
            },
            {
                label: 'Items Delivered (%)',
                fieldname: 'deliveredPercent'
            },
            {
                label: 'Items Remaining',
                fieldname: 'quantity'
            },
            {
                label: 'Status',
                fieldname: 'status'
            },
        ];
    }
};
