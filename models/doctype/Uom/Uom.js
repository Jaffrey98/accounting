//const EventDocument=require('./UomFun');
module.exports = {
    name: "Uom",
    doctype: "DocType",
   // documentClass:EventDocument,
    naming: "random",
    fields: [{
            fieldname: "itemnameKg",
            label: "Item Name(Kg)",
            fieldtype: "Data"
        },
        {
            fieldname: "uomKg",
            label: "UOM (Unit of Measure)",
            fieldtype: "Read Only"
           
        },
        {
            fieldname: "itemnameL",
            label: "Item Name(Liter)",
            fieldtype: "Data"
        },
        {
            fieldname: "uomL",
            label: "UOM (Unit of Measure)",
            fieldtype: "Read Only"
           
        },
        {
            fieldname: "itemnameNo",
            label: "Item Name(Number)",
            fieldtype: "Data"
        },
        {
            fieldname: "uomNo",
            label: "UOM (Unit of Measure)",
            fieldtype: "Read Only"
           
        }
    ],
    keywordFields: [],
    isSingle: 0,
    listSettings: {
        getFields(list) {
          
            return ['name', 'itemnameKg', 'uomKg','itemnameL','uomL','itemnameNo','uomNo'];
        },
        getRowHTML(list, data) {
            var in1=data.itemnameKg;
            var in2=data.itemnameNo;
            var in3=data.itemnameL;
            if(in1!=null && in2==null && in3==null)
            {
               // console.log(in1);
            return `<div class="col-11">${data.itemnameKg} (${"Kg"})</div>`;
            }
            if(in2!=null &&in1==null &&in3==null)
            {
            return `<div class="col-11">${data.itemnameNo} (${"No"})</div>`;
            }
            if(in3!=null &&in1==null &&in2==null)
            {
            return `<div class="col-11">${data.itemnameL} (${"Liter"})</div>`;
            }

        }
    },

}