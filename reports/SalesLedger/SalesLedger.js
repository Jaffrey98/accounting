const frappe = require('frappejs');

class SalesLedger {
    async run(params) {

        let filters = {};

        console.log(params);

        if (params.toDate || params.fromDate) {
            filters.date = [];
            if (params.toDate) filters.date.push('<=', params.toDate);
            if (params.fromDate) filters.date.push('>=', params.fromDate);
        }

        if(params.customer) {
            filters.customer = params.customer;
        }

        function checkExistance(key, value, array) {
            console.log(array);
            let arrayItem;
            for(arrayItem of array) {
                // console.log('in for each arrayItem');
                // console.log(arrayItem);
                if (arrayItem[key] == value) {
                    // console.log('in for each arrayItem condition true');
                    // console.log(arrayItem[key]);
                    return true;
                }
            };
            return false;
        }

        async function getFulfillmentEntries(salesEntriesItems) {
            let fulfillmentEntriesItemsDetails = await frappe.db.getAll({
                doctype: 'FulfillmentItem',
                fields: ['*'],
                orderBy: 'name',
                order: 'asc',
            });
            return fulfillmentEntriesItemsDetails.filter(function (fI) {
                console.log(fI);
                let condition = checkExistance("salesOrderID", fI.salesOrder, salesEntriesItems);
                fI.salesOrderID = fI.salesOrder;
                console.log(fI);
                console.log(condition);
                return condition;
            });
        }

        function getSalesOrderStatus(salesEntriesItem) {
            let status;
            switch (salesEntriesItem.deliveredPercent) {
                case 0:
                    status = "Uncommenced";
                    break;
                case 100:
                    status = "Completed";
                    break;
                default:
                    status = "Pending";
                    break;
            }
            return status;
        }

        async function populateSalesEntries(...salesData) {
            let [salesEntriesItems, salesEntriesItemsDetails] = salesData;
            let fulfillmentEntriesItemsDetails = await getFulfillmentEntries(salesEntriesItems);
            console.log(fulfillmentEntriesItemsDetails);
            return salesEntriesItems.map(function (salesEntriesItem) {
                let salesEntryItems = salesEntriesItemsDetails.filter(function(sI){
                    return (sI.parent == salesEntriesItem.salesOrderID);
                });
                let fulfillmentEntryItems= fulfillmentEntriesItemsDetails.filter(function(fI){
                    return (fI.salesOrderID == salesEntriesItem.salesOrderID);
                });
                salesEntriesItem.noItemsOrdered = salesEntryItems.reduce(function (acc, sI) {
                    return (acc + sI.quantity);
                }, 0);
                salesEntriesItem.noItemsDelivered = fulfillmentEntryItems.reduce(function(acc, fI){
                    return (acc + fI.quantity);
                }, 0);
                salesEntriesItem.deliveredPercent = Math.round((salesEntriesItem.noItemsDelivered * 100) / salesEntriesItem.noItemsOrdered);
                salesEntriesItem.noItemsRemaining = salesEntriesItem.noItemsOrdered - salesEntriesItem.noItemsDelivered;
                salesEntriesItem.status = getSalesOrderStatus(salesEntriesItem);
                console.log(salesEntriesItem);
                return salesEntriesItem;
            });
        }

        async function getSalesOrderItems(salesEntriesItems, salesEntries) {
            let salesEntriesItemsDetails = await frappe.db.getAll({
                doctype: 'SalesOrderItem',
                fields: ['*'],
                orderBy: 'name',
                order: 'asc',
            });
            return populateSalesEntries(
                salesEntriesItems,
                salesEntriesItemsDetails,
            );
        }

        async function getSalesOrderEntries(filters) {
            let salesEntries = await frappe.db.getAll({
                doctype: 'SalesOrder',
                fields: ["*"],
                filters: filters
            });
            let salesEntriesItems = [];
            salesEntries.forEach(function(salesEntry) {
                salesEntriesItems.push({
                    salesOrderID : salesEntry.name,
                    date: salesEntry.date,
                    customer: salesEntry.customer
                });
            });
            salesEntriesItems =  await getSalesOrderItems(salesEntriesItems, salesEntries);
            if(!(!(params.status) || params.status == "Any")) {
                return salesEntriesItems.filter(function(salesEntriesItem){
                    return (salesEntriesItem.status == params.status);
                });
            }
            return salesEntriesItems;
        }

        let data = await getSalesOrderEntries(filters);
        return data;
    }
}

module.exports = SalesLedger;