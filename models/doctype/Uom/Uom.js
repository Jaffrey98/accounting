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
            label: "UOM (Unit of Measure)",
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
    keywordFields: [],
    isSingle: 0,
    listSettings: {
        getFields(list) {
            return ['name', 'itemname', 'uom'];
        },
        getRowHTML(list, data) {
            return `<div class="col-11">${data.itemname} (${data.uom})</div>`;
        }
    },

}