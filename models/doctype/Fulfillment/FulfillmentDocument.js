const frappe = require('frappejs');
const BaseDocument = require('frappejs/model/document');

module.exports = class Fullfillment extends BaseDocument {
    validateDuplicateEntries(fItems) {
        function count(arr, el) {
            return arr.reduce(function (acc, i) {
                if (i === el)
                return acc + 1;
            }, 0)
        }
        let fObjects = fItems.map((i)=>({salesOrder: i.salesOrder, item: i.item}));
        for (let i of fObjects) {
            if (count(fObjects, i) > 1) {
                alert(`Duplicate Entries of Sales Order "${i.salesOrder}" item "${i.item}" found`);
                throw new frappe.errors.ValidationError(`Duplicate Entries of Sales Order "${i.salesOrder}" item "${i.item}" found`);
            }
        }
    }

    async validateItemQuantity(fItems) {
        await Promise.all(fItems.map(async function(i){
            console.log("i.salesOrder")
            console.log(i.salesOrder)
            console.log("i.item")
            console.log(i.item)
            let soItem = await frappe.db.getAll({
                doctype: 'SalesOrderItem',
                fields: ['*'],
                orderBy: 'name',
                order: 'asc',
                filters: {
                    item: i.item,
                    parent: i.salesOrder
                }
            });
            soItem = soItem[0];
            console.log("soItem")
            console.log(soItem)
            if(i.quantity > soItem.itemsRemaining) {
                alert(`Quantity entered for item "${i.item}" greater than remaining`);
                throw new frappe.errors.ValidationError(`Quantity entered for item "${i.item}" greater than remaining`);
            }
        }));
    }

    async validate() {
        console.log("in validate");
        let fItems = this.items;
        await this.validateDuplicateEntries(fItems);
        this.validateItemQuantity(fItems);
    }

    async afterSubmit() {
        console.log("after Submit");
        let fItems = this.items;
        console.log("Fitems");
        console.log(fItems);
        let that = this;
        await Promise.all(fItems.map(async function (fitem) {
            console.log('fitem');
            console.log(fitem);
            await that.updateRemainingItems(fitem);
            await that.updateOrderStatus(fitem.salesOrder);
            console.log("update done");
        }));
    }

    async updateRemainingItems(fitem) {
        let { salesOrder, item, quantity } = fitem;
        let soItems = await frappe.db.getAll({
            doctype: 'SalesOrderItem',
            fields: ['*'],
            orderBy: 'name',
            order: 'asc',
            filters: {
                parent: salesOrder,
                item: item
            }
        });
        let soItem = soItems[0];
        // let soItem = soItems.filter((i)=>(i.item == item))[0];
        console.log("soItem");
        console.log(soItem);
        let soItemData = await frappe.getDoc('SalesOrderItem', soItem.name);
        console.log('soItemData');
        console.log(soItemData);
        soItemData.itemsRemaining -= quantity;
        await soItemData.update();
    }

    getDeliveredPercent(soItems) {
        let itemsOrdered = soItems.reduce(function(acc, i) {
            return (acc + i.quantity);
        },0);
        let itemsRemaining = soItems.reduce(function(acc, i) {
            return (acc + i.itemsRemaining);
        },0);
        return(Math.round((itemsOrdered - itemsRemaining)*100/itemsOrdered));
    }

    getStatus(deliveredPercent) {
        let status;
        switch (deliveredPercent) {
            case 0:
                status = "Not Delivered";
                break;
            case 100:
                status = "Fully Delivered";
                break;
            default:
                status = "Partially Delivered";
                break;
        }
        return status;
    }

    async getSalesOrderStatus(salesOrder) {
        let soItems = await frappe.db.getAll({
            doctype: 'SalesOrderItem',
            fields: ['*'],
            orderBy: 'name',
            order: 'asc',
            filter: { parent: salesOrder }
        });
        let deliveredPercent = this.getDeliveredPercent(soItems);
        return this.getStatus(deliveredPercent);
    }

    async updateOrderStatus(salesOrder) {
        debugger
        let salesOrderData = await frappe.getDoc('SalesOrder', salesOrder);
        let newStatus = await this.getSalesOrderStatus(salesOrder);
        if(salesOrderData.status != newStatus)
            await salesOrderData.update();
    }

}