const frappe = require('frappejs');
const BaseDocument = require('frappejs/model/document');

module.exports = class StockEntry extends BaseDocument {
    validateFields() {
        alert('lol');
        console.log(this.sourceWarehouse);
        if (this.sourceWarehouse === this.targetWarehouse) {
            throw frappe.errors.ValidationError(frappe._("Source and target warehouse cannot be the same))"));
        }
        // throw frappe.errors.ValidationError(frappe._("Enter a source or a target Warehouse (or both(if they exist))"));
    }
}