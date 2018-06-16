//const EventDocument=require('./UomFun');
module.exports = {
    name: "Uom",
    doctype: "DocType",
   // documentClass:EventDocument,
    naming: "random",
    fields: [{
            fieldname: "itemname",
            label: "Item Name",
            fieldtype: "Data"
        },
        {
            fieldname: "uom",
            label: "UOM (Unit of Measure)",
            fieldtype: "Read Only"
            // fieldtype: "Select",
            // default: "No",
            // options: [
            //     "No",
            //     "Liter",
            //     "Kg",
            //     "Gram",
            //     "Hour",
            //     "Day"
            // ]
        }
    ],
    keywordFields: [],
    isSingle: 0,
    listSettings: {
        getFields(list) {
            // var input=list.itemname;
            // console.log(input);
            return ['name', 'itemname', 'uom'];
        },
        getRowHTML(list, data) {
            var input=data.itemname;
            switch(input)
            { 
            case "milk": data.uom="Liter";
            break;    
            case "water": data.uom="Liter";
            break;
            case "vegetable": data.uom="Kg";
            break;
            case "chips" :data.uom="No";
            break;
            default : data.uom="null";
        }
        //console.log(data.itemname);
            return `<div class="col-11">${data.itemname} (${data.uom})</div>`;

        }
    },

}