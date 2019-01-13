import { _ } from 'frappejs/utils';
import frappe from 'frappejs';

export default {
  doctype: 'Tax',
  title: _('Tax'),
  columns: [
    'name',
    {
      label: 'Account(s) and Rate(s) associated',
      async getValue(doc) {
        let AllTaxDetails = await frappe.db.getAll({
          doctype: 'TaxDetail',
          fields:['parent','account','rate'],
          orderBy: 'parent',
        })
        console.log(AllTaxDetails);
        let taxDetails = AllTaxDetails.filter(obj=>obj.parent==doc.name);
        // console.log(taxDetails);
        let result = ``;
        taxDetails.forEach(el => {
          result += `${el.account} - ${el.rate} %\n`
        });
        // console.log(result);
        return result;
      }
    }
  ]
}