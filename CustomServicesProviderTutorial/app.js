(function(){
  'use strict';

  angular.module('ShoppingListApp',[])

  .controller('ShoppingListController', ShoppingListController)
  .provider('ShoppingListService', ShoppingListServiceProvider) // it is NOT manadatory to add "Provider" at the end of ShoppingListServiceProvider. It is added only for clarity.
  .config(Config);

  Config.$inject=['ShoppingListServiceProvider'];
  function Config(ShoppingListServiceProvider){
    ShoppingListServiceProvider.defaults.maxItems=2;
  }

  ShoppingListController.$inject=['ShoppingListService'];
  function ShoppingListController(ShoppingListService){
    var list=this;
    // Use factory to create nerw shopping list service
    list.items=ShoppingListService.getItems();
    list.itemName="";
    list.itemQty="";
    list.addItem=function(){
      try{
        ShoppingListService.addItem(list.itemName,list.itemQty);
      }catch(error){
        list.errorMessage=error.message;
      }
    }
    list.removeItem=function(itemIndex){
      ShoppingListService.removeItem(itemIndex);
    }
  }

  function ShoppingListService(maxItems){
    var service=this;
    // List of shopping items
    var items=[];
    service.addItem=function(itemName,itemQty){
      if((maxItems===undefined)|| (maxItems!==undefined)&& (items.length<maxItems)){
        var item={
          name:itemName,
          qty:itemQty
        };
        items.push(item);
      }
      else {
        throw new Error("Max items ("+maxItems+") reached.");
      }
    }
    service.getItems=function(){
      return items;
    }
    service.removeItem=function(itemIndex){
      items.splice(itemIndex,1);
    }
  }
  function ShoppingListServiceProvider(){
    var provider=this;

    provider.defaults={
      maxItems:10
    };

    provider.$get = function() {
      var shoppingList = new ShoppingListService(provider.defaults.maxItems);
      return shoppingList;
    }
  }
})();
