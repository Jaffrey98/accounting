
const frappe = require('frappejs');
const utils = require('../../../accounting/utils');

module.exports = {
    name: "Fulfillment",
    label: "Fulfillment",
    doctype: 'DocType',
    documentClass: require('./FulfillmentDocument.js'),
    print: {
        printFormat: 'Standard Invoice Format'
    },
    isSingle: 0,
    isChild: 0,
    isSubmittable: 1,
    keywordFields: ['name'],
    settings: "FulfillmentSettings",
    showTitle: true,
    fields: [
        {
            fieldname: 'date',
            label: 'Date',
            fieldtype: 'Date'
        },
        {
            fieldname: 'items',
            label: 'Items',
            fieldtype: 'Table',
            childtype: "FulfillmentItem",
            required: true
        },
        // {
        //     fieldname: 'netTotal',
        //     label: 'Net Total',
        //     fieldtype: 'Currency',
        //     formula: (doc) => doc.getSum('items', 'amount'),
        //     disabled: true
        // },
        // {
        //     fieldname: 'taxes',
        //     label: 'Taxes',
        //     fieldtype: 'Table',
        //     childtype: 'TaxSummary',
        //     disabled: true,
        //     template: (doc, row) => {
        //         return `<div class='row'>
        //             <div class='col-6'></div>
        //             <div class='col-6'>
        //                 <div class='row' v-for='row in value'>
        //                     <div class='col-6'>{{row.account}} ({{row.rate}}%)</div>
        //                     <div class='col-6 text-right'>
        //                         {{frappe.format(row.amount, 'Currency')}}
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>`;
        //     }
        // },
        // {
        //     fieldname: 'grandTotal',
        //     label: 'Grand Total',
        //     fieldtype: 'Currency',
        //     formula: (doc) => doc.getGrandTotal(),
        //     disabled: true
        // },
        {
            fieldname: 'terms',
            label: 'Terms',
            fieldtype: 'Text'
        }
    ],

    layout: [
        // section 1
        {
            columns: [
                { fields: ['date'] }
            ]
        },

        // section 2
        {
            columns: [
                { fields: ['items'] }
            ]
        },

        // section 3
        // {
        //     columns: [{
        //         fields: ['netTotal', 'taxes', 'grandTotal']
        //     }]
        // },

        //section 4
        {
            columns: [
                { fields: ['terms'] }
            ]
        }
    ],

};
