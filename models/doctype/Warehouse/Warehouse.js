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
			getFilters: (query, control) => {
				return {
					keywords: ["like", query],
					isGroup: 1
				}
			}
            
        },
		 
        {
            "fieldname": "isGroup",
            "label": "Is Group",
            "fieldtype": "Check"
        },
        



	],
	"keywordFields": ["name", "parentWarehouse"],
	"isSingle": 0,
	listSettings: {
		getFields(list) {
			return ['name', 'parentWarehouse', 'isGroup'];
		},
		getRowHTML(list, data) {
			// var datax = await frappe.db.get('Warehouse', data.name)
			var details;
			if (data.isGroup && data.parentWarehouse) {
				details = `&nbsp; ( type = group ) &emsp;( hasParent ➤ ${data.parentWarehouse} )`;
			}else if(data.isGroup) {
				details = `&nbsp; ( type = group ) &emsp;( noParent  )`
			}else {
				details = `&nbsp; ( type = child ) &emsp;( hasParent ➤ ${data.parentWarehouse} )`;
			}
			return `<div class="col-11">${data.name} ${details} </div>`;
		}
	},
	
}
