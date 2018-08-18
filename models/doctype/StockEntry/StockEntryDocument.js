const frappe = require('frappejs');
const BaseDocument = require('frappejs/model/document');

module.exports = class StockEntry extends BaseDocument {
    validate() {
        console.log(this);
    }
}