module.exports = {
    name: "Item",
    doctype: "DocType",
    isSingle: 0,
    keywordFields: [
        "name",
        "description"
    ],
    fields: [
        {
            fieldname: "name",
            label: "Item Name",
            fieldtype: "Data",
            required: 1
        },
        {
            fieldname: "description",
            label: "Description",
            fieldtype: "Text"
        },
        {
            fieldname: "unit",
            label: "Stock Unit",
            fieldtype: "Link",
            target: "Uom"
        },
        {
            fieldname: "uomConversion",
            label: "UOM conversion table",
            fieldtype: "Table",
            childtype: "ItemUomTable"
        },
        {
            fieldname: "incomeAccount",
            label: "Income Account",
            fieldtype: "Link",
            target: "Account"
        },
        {
            fieldname: "expenseAccount",
            label: "Expense Account",
            fieldtype: "Link",
            target: "Account"
        },
        {
            fieldname: "tax",
            label: "Tax",
            fieldtype: "Link",
            target: "Tax"
        },
        {
            fieldname: "rate",
            label: "Rate",
            fieldtype: "Currency"
        }
    ],
    layout: [
        // section 1
        {
            columns: [
                { fields: [ "name", "unit" ] },
                { fields: [ "rate" ] }
            ]
        },

        // section 2
        {
            columns: [
                { fields: ["uomConversion"] }
            ],
        },
        // section 3
        {
            columns: [
                { fields: ['incomeAccount', 'expenseAccount'] },
                { fields: ['tax'] }
            ]
        },
        // section 4
        {
            columns: [
                { fields: ["description"] }
            ],
        },
    ]
};
