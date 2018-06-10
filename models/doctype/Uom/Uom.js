module.exports = {
    name: "Uom",
    doctype: "DocType",
    naming: "random",
    fields: [{
            fieldname: "itemname",
            label: "Item Name",
            fieldtype: "Data"
        },
        {
            fieldname: "uom",
            label: "UOM(Unit of Measure)",
            fieldtype: "Select",
            default: "No",
            options: [
                "No",
                "Liter",
                "Kg",
                "Gram",
                "Hour",
                "Day"
            ]
        }
    ],
    keywordFields: [

    ],
    isSingle: 0,

}