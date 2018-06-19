module.exports = {
    name: "StockEntry",
    label: "Stock Entry",
    doctype: "DocType",
    documenClass: require("./StockEntryDocument.js"),
    naming: "autoincrement",
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
            fieldname: "sourceWarehouse",
            label: "Source Warehouse",
            fieldtype: "Link",
            target: "Warehouse",
            // getFilters: (query, control) => {
            //     return {
            //         keywords: ["like", query],
            //         name: ["!=", control.doc.targetWarehouse]
            //     }
            // }
        },
        {
            fieldname: "targetWarehouse",
            label: "Target Warehouse",
            fieldtype: "Link",
            target: "Warehouse",
            getFilters: (query, control) => {
                return {
                    keywords: ["like", query],
                    name: ["!=", control.doc.sourceWarehouse]
                }
            }
        },
        {
            fieldname: "itemStockEntry",
            label: "Items",
            fieldtype: "Table",
            childtype: "StockEntryItemTable"
        }
    ],
    events: {
        validate: (doc) => {
            // console.log(doc);
            // console.log(this.sourceWarehouse);
            // if (this.sourceWarehouse === this.targetWarehouse){
            //     throw frappe.errors.ValidationError(frappe._("Source and target warehouse cannot be the same))"));
            // }
            // throw frappe.errors.ValidationError(frappe._("Enter a source or a target Warehouse (or both(if they exist))"));
        }
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