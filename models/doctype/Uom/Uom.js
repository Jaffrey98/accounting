module.exports = {
    name: "Uom",
    doctype: "DocType",
    fields: [
        {
            fieldname: "name",
            label: "Stock UOM",
            fieldtype: "Data",
            required: 1
        }
    ],
    keywordFields: ["name"],
    isSingle: 0,
    listSettings: {
        getFields(list) {
            return ["name"];
        },
        getRowHTML(list, data) {
            return `<div class="col-11">${data.name}</div>`;
        }
    },

}