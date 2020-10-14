(function(){
  'use strict';

  angular.module('ShoppingListApp',[])

  .controller('ShoppingListAddController', ShoppingListAddController)
  .controller('ShoppingListShowController', ShoppingListShowController)
  .service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject=['ShoppingListService'];
  function ShoppingListAddController(ShoppingListService){
var itemAdder=this;
itemAdder.itemName="";
itemAdder.itemQty="";
itemAdder.addItem=function(){
  ShoppingListService.addItem(itemAdder.itemName,itemAdder.itemQty);
}
  }

ShoppingListShowController.$inject=['ShoppingListService'];
function ShoppingListShowController(ShoppingListService){
  var showList=this;
  showList.items=ShoppingListService.getItems();

  showList.removeItem=function(index){
    ShoppingListService.removeItem(index);
  }
}
  function ShoppingListService(){
    var service=this;
var items=[];
    // List of shopping items
    service.addItem=function(itemName,itemQty){
      var item={
        name:itemName,
        qty:itemQty
      };
      items.push(item);
    }
    service.getItems=function(){
      return items;
    }
    service.removeItem=function(itemIndex){
      items.splice(itemIndex,1);
    }
  }
})();
