(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])

  .controller('ShoppingListController', ShoppingListController)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .directive('shoppingList', ShoppingListDirective);

  function ShoppingListDirective(){
    var ddo = {
      templateUrl:'shoppingList.html',
      scope:{
        items:'<', // '<' means one-way binding
        myTitle:'@title',
        badRemove:'=', // '=' means tw-way binding
        onRemove:'&'
      },
      controller:ShoppingListDirectiveController,
      controllerAs:'list',
      bindToController:true
    };
    return ddo;
  }

  function ShoppingListDirectiveController(){
    var list=this;

    list.cookiesInList=function() {
      for(var i=0;i<list.items.length;i++){
        var name=list.items[i].name;
        if(name.toLowerCase().indexOf("cookie")!==-1){
          return true;
        }
      }
      return false;
    };
  }


  ShoppingListController.$inject=['ShoppingListFactory'];
  function ShoppingListController(ShoppingListFactory){
    var list=this;
    // Use factory to create nerw shopping list service
    var shoppingList= ShoppingListFactory();
    list.items=shoppingList.getItems();
    var originalTitle="Shopping List #1";
    list.title=originalTitle+"("+list.items.length+" items )";
    list.itemName="";
    list.itemQty="";
    list.addItem=function(){
      shoppingList.addItem(list.itemName,list.itemQty);
      list.title=originalTitle+"("+list.items.length+" items )";
    }
    list.removeItem=function(itemIndex){
      this.lasRemoved="Last item removed was "+ this.items[itemIndex].name;
      shoppingList.removeItem(itemIndex);
      this.title=originalTitle+"("+list.items.length+" items )";
      // list.title=originalTitle+"("+list.items.length+" items )";
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
  function ShoppingListFactory(){
    var factory=function(maxItems){
      return new ShoppingListService(maxItems);
    };
    return factory;
  }
})();
