
        function computeBalance(additions, deletions) {
            let balance = 0;

            let add = additions.map(function(item){
                balance += item.quantity;
                console.log(balance);
            })

            let del = deletions.map(function(item){
                balance -= item.quantity;
                console.log(balance);
            })

            console.log(balance);
            return balance;
        }

        function getAdditions(whName, itemName){
            let additions = frappe.db.getAll({
                doctype: 'StockEntryItem',
                fields: ['quantity'],
                orderBy: 'idx',
                order: 'desc',
                filters: {
                    targetWarehouse: whName,
                    itemName: itemName
                }
            });
            return additions;
        }

        function getDeletions(whName, itemName){
            let deletions = frappe.db.getAll({
                doctype: 'StockEntryItem',
                fields: ['quantity'],
                orderBy: 'idx',
                order: 'desc',
                filters: {
                    sourceWarehouse: whName,
                    itemName: itemName
                }
            });
            return deletions;
        }

        function getBalance(whName, itemName) {
            let additions = getAdditions(whName, itemName)
            let deletions = getDeletions(whName, itemName)
            additions.then(function(add){
                deletions.then(function (del){
                    console.log(`w: ${whName}, a:`);
                    console.log(add);
                    console.log(`w: ${whName}, d:`);
                    console.log(del);
                    x = computeBalance(add,del);
                    console.log(x);
                })
            })

        }