(function(){
  'use strict';

  angular.module('ShoppingListDirectiveApp',[])

  .controller('ShoppingListController1', ShoppingListController1)
  .controller('ShoppingListController2', ShoppingListController2)
  .factory('ShoppingListFactory', ShoppingListFactory)
  .directive('listItemDescription', ListItemDescription)
  .directive('listItem', ListItem);

  function ListItem(){
    var ddo = {
      restrict:'E',
      templateUrl:'listItem.html'
    };

    return ddo;
  }

  function ListItemDescription(){
    var ddo={
      template:'{{item.qty}} of {{item.name}}'
    };

    return ddo;
  }

  ShoppingListController1.$inject=['ShoppingListFactory'];
  function ShoppingListController1(ShoppingListFactory){
    var list1=this;
    // Use factory to create nerw shopping list service
    var shoppingList= ShoppingListFactory();
    list1.items=shoppingList.getItems();
    list1.itemName="";
    list1.itemQty="";
    list1.addItem=function(){
      shoppingList.addItem(list1.itemName,list1.itemQty);
    }
    list1.removeItem=function(itemIndex){
      shoppingList.removeItem(itemIndex);
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
