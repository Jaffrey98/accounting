module.exports = {
    name: "StockEntry",
    label: "Stock Entry",
    doctype: "DocType",
    settings: 'StockEntrySettings',
    documentClass: require("./StockEntryDocument.js"),
    pageSettings: {
        hideTitle: true
    },
    fields: [
        {
            fieldname: "date",
            label: "Date",
            fieldtype: "Date",
            required: 1
        },
        {
            fieldname: "items",
            label: "Entries",
            fieldtype: "Table",
            childtype: "StockEntryItem"
        }
    ],
    events: {
        // validate: (doc) => {
            // console.log(doc);
            // console.log(this.sourceWarehouse);
            // if (this.sourceWarehouse === this.targetWarehouse){
            //     throw frappe.errors.ValidationError(frappe._("Source and target warehouse cannot be the same))"));
            // }
            // throw frappe.errors.ValidationError(frappe._("Enter a source or a target Warehouse (or both(if they exist))"));
        // }
    },
    keywordFields: [],
    isSingle: 0,
    listSettings: {
        getFields(list) {
            return ["date", "sourceWarehouse","targetWarehouse"];
        },
        getRowHTML(list, data) {
            return `<div class="col-11">${data.date} (${data.sourceWarehouse} ➤ ${data.targetWarehouse})</div>`;
        }
    },


}