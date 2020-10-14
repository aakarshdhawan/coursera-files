(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject=['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var toBuy=this;
    toBuy.items=ShoppingListCheckOffService.itemstoBuy;
    toBuy.boughtItem=function(index){
      ShoppingListCheckOffService.buyItem(index);
    }
  }

  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought=this;
    bought.items=ShoppingListCheckOffService.boughtItems;
  }

  function ShoppingListCheckOffService(){
    var service=this;
    // List of bought items
    service.boughtItems=[];
    // add items to bought list
    service.buyItem=function(itemIndex){
      var item=this.itemstoBuy[itemIndex];
      this.itemstoBuy.splice(itemIndex,1);
      this.boughtItems.push(item);
    }

    // List of items to buy
    service.itemstoBuy=[{ name: "cookies", quantity: 10 },
    { name: "apples", quantity: 5 },
    { name: "mangoes", quantity: 6 },
    { name: "chocolates", quantity: 4 },
    { name: "pens", quantity: 50 },
    { name: "toys", quantity: 5 },
    { name: "bananas", quantity: 12 },
    { name: "waffles", quantity: 4 },
    { name: "cookies", quantity: 100 }];
  }
})();
