module.exports = {
    name: "UomConversionTable",
    doctype: "DocType",
    isChild: 1,
    fields: [
        {
            fieldname: "name",
            label: "UOM",
            fieldtype: "Data"
        },
        {
            fieldname: "conversionFactor",
            label: "Conversion Factor",
            fieldtype: "Float"
        }
    ],
}