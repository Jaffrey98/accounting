module.exports = {
    name: "StockEntryItem",
    doctype: "DocType",
    isChild: 1,
    naming: "autoincrement",
    fields: [
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
            // getFilters: (query, control) => {
            //     return {
            //         keywords: ["like", query],
            //         name: ["!=", control.doc.sourceWarehouse]
            //     }
            // }
        },
        {
            fieldname: "itemName",
            label: "Item Name",
            fieldtype: "Link",
            target: "Item"
        },
        {
            fieldname: "quantity",
            label: "Quantity",
            fieldtype: "Int"
        }
    ],
}