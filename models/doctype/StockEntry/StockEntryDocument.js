const frappe = require('frappejs');
const BaseDocument = require('frappejs/model/document');

module.exports = class StockEntryItem extends BaseDocument {
    validate() {
        // alert('lol');
        debugger
        console.log(this);
        console.log(this.sourceWarehouse);
        if (this.sourceWarehouse === this.targetWarehouse) {
            throw new frappe.errors.ValidationError('Document Not Found');
            // throw frappe.errors.ValidationError(frappe._("Source and target warehouse cannot be the same))"));
        }
    }
}