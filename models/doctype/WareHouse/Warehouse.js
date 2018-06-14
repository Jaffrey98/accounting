module.exports = {
	"name": "Warehouse",
	"doctype": "DocType",
	"isTree": 1,
	"fields": [
		{
			fieldname:"name",
			label: "Warehouse Name",
			fieldtype: "Data"
		},
		{
            "fieldname": "parentWarehouse",
            "label": "Parent Warehouse",
            "fieldtype": "Link",
            "target": "Warehouse",
            
        },
		 
        {
            "fieldname": "isGroup",
            "label": "Is Group",
            "fieldtype": "Check"
        }
        



	],
	keywordFields: [],
	"isSingle": 0,
	
}
