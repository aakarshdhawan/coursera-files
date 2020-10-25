(function(){
  'use strict';

  angular.module('ShoppingListDirectiveIsolateApp',[])

  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .directive('shoppingList', ShoppingList);

  function ShoppingList(){
    var ddo = {
      templateUrl:'shoppingList.html',
      scope:{
        list:'=myList',
        title:'@title'
      }
    };
    return ddo;
  }

  ShoppingListController1.$inject=['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
    var list1=this;
    // Use factory to create nerw shopping list service
    var shoppingList= ShoppingListFactory();
    list1.items=shoppingList.getItems();
    var originalTitle="Shopping List #1";
    list1.title=originalTitle+"("+list1.items.length+" items )";
    list1.itemName="";
    list1.itemQty="";
    list1.addItem=function(){
      shoppingList.addItem(list1.itemName,list1.itemQty);
      list1.title=originalTitle+"("+list1.items.length+" items )";
    }
    list1.removeItem=function(itemIndex){
      shoppingList.removeItem(itemIndex);
      list1.title=originalTitle+"("+list1.items.length+" items )";
    }
  }

  ShoppingListController2.$inject=['ShoppingListFactory'];
  function ShoppingListController2(ShoppingListFactory){
    var list2=this;
    var shoppingList= ShoppingListFactory(3);

    list2.items=shoppingList.getItems();
    list2.itemName="";
    list2.itemQty="";
    list2.addItem=function(){
      try{
        shoppingList.addItem(list2.itemName,list2.itemQty);
      }catch(err){
        list2.errorMessage=err.message;
      }
    }
    list2.removeItem=function(index){
      shoppingList.removeItem(index);
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
