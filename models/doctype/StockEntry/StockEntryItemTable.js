module.exports = {
    name: "StockEntryItemTable",
    doctype: "DocType",
    isChild: 1,
    naming: "autoincrement",
    fields: [
        {
            fieldname: "itemname",
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