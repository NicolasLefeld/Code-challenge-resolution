const salesOrders = [{
    'id': 'S1',
    'created': '2020-01-02', // <- 3
    'quantity': 6
  }, {
    'id': 'S2',
    'created': '2020-11-05', // <- 5
    'quantity': 2
  }, {
    'id': 'S3',
    'created': '2019-12-04', // <- 1
    'quantity': 3
  }, {
    'id': 'S4',
    'created': '2020-01-20', // <- 4
    'quantity': 2
  }, {
    'id': 'S5',
    'created': '2019-12-15', // <- 2
    'quantity': 9
  }];
  
  const purchaseOrders = [{
    'id': 'P1',
    'receiving': '2020-01-04', // <- 1
    'quantity': 4
  }, {
    'id': 'P2',
    'receiving': '2020-01-05', // <- 2
    'quantity': 3
  }, {
    'id': 'P3',
    'receiving': '2020-02-01', // <- 3
    'quantity': 5
  }, {
    'id': 'P4',
    'receiving': '2020-03-05', // <- 5
    'quantity': 1
  }, {
    'id': 'P5',
    'receiving': '2020-02-20', // <- 4
    'quantity': 7
  }];
  
  const sortByDate = (array) => {
    const arraySorted = array.sort((a, b) => a.receiving ? new Date(a.receiving) - new Date(b.receiving) : new Date(a.created) - new Date(b.created));
  
    return arraySorted;
  }
  
  function allocate(salesOrders, purchaseOrders) {
    const salesOrdersSorted = sortByDate(salesOrders)
    const purchaseOrdersSorted = sortByDate(purchaseOrders)
  
    const result = []
  
    salesOrdersSorted.forEach((salesOrderSorted) => {
      let salesOrderSortedQuantity = salesOrderSorted.quantity;
      purchaseOrdersSorted.every((purchaseOrderSorted) => {
  
        if (purchaseOrderSorted.quantity < salesOrderSortedQuantity) {
          salesOrderSortedQuantity -= purchaseOrderSorted.quantity
          purchaseOrderSorted.quantity = 0;
  
          return true
        }
  
        if (purchaseOrderSorted.quantity === salesOrderSortedQuantity) {
          result.push(salesOrderSorted)
  
          purchaseOrderSorted.quantity = 0;
  
          return false
        }
  
        if (purchaseOrderSorted.quantity >= salesOrderSortedQuantity) {
          result.push(salesOrderSorted)
  
          purchaseOrderSorted.quantity -= salesOrderSortedQuantity
  
          return false
        }
      })
    })
  
    return result;
  }
  
  module.exports = allocate
  