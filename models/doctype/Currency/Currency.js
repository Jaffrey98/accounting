const countryInfo = require('../../../fixtures/countryInfo.json');
let countryCurrency = {};

const countryList = Object.keys(countryInfo).sort();
const currencyList = countryList.map((country) => {
    if (currency = countryInfo[country].currency) {
        countryCurrency[currency] = country;
        return currency;
    }
}).filter(currency => currency !== undefined);

function getValue(country, property) {
    if (value = countryInfo[country][property]) {
        return value;
    }
    return null;
}

module.exports = {
    name: "Currency",
    doctype: "DocType",
    isSingle: 0,
    naming: "currency",
    fields: [
        {
            fieldname: "currency",
            label: "Currency",
            fieldtype: "Autocomplete",
            getList: () => currencyList
        },
        {
            fieldname: "fraction",
            label: "Fraction",
            fieldtype: "Data",
            formula: (doc) => getValue(countryCurrency[doc.currency], 'currency_fraction')
        },
        {
            fieldname: "fraction_unit",
            label: "Fraction Units",
            fieldtype: "Data",
            formula: (doc) => getValue(countryCurrency[doc.currency], 'currency_fraction_units')
        },
        {
            fieldname: "symbol",
            label: "Symbol",
            fieldtype: "Data",
            formula: (doc) => getValue(countryCurrency[doc.currency], 'currency_symbol')
        }
    ]
}