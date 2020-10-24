(function(){
  'use strict';

  angular.module('ShoppingListPromiseApp',[])

  .controller('ShoppingListController', ShoppingListController)
  .service('ShoppingListService', ShoppingListService)
  .service('WeightLossFilterService', WeightLossFilterService);

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
  ShoppingListService.$inject=['$q','WeightLossFilterService'];
  function ShoppingListService($q, WeightLossFilterService){
    var service=this;
    // List of shopping items
    var items=[];
  //   service.addItem=function(itemName,itemQty){
  //     var promise=WeightLossFilterService.checkName(itemName);
  //     promise.then(function(response){
  //       var nextPromise=WeightLossFilterService.checkQuantity(itemQty);
  //       nextPromise.then(function(response) {
  //         var item={
  //           name:itemName,
  //           qty:itemQty
  //         };
  //         items.push(item);
  //       }, function(errorResponse){
  //         console.log("Error in Next Promise: ", errorResponse);
  //       })
  //   },function(errorResponse){
  //     console.log("Error in Promise: ",errorResponse);
  //   });
  // }

  // 2nd approach for calling promises
  service.addItem=function(itemName,itemQty){
    var promise= WeightLossFilterService.checkName(itemName);
    promise
    .then(function(response){
      return WeightLossFilterService.checkQuantity(itemQty);
    })
    .then(function(response){
      var item={
        name:itemName,
        qty:itemQty
      };
      items.push(item);
    })
    .catch(function(errorResponse){
      console.log(errorResponse);
    })
  };

  // 3rd approach for calling promises
  // This approach runs multiple promises in parallel.
  // $q.all method allows us to exwecute multiple promises in parallel,
  // handling success/failure in one central place. See method below.
  service.addItem=function(itemName,itemQty){
    var namePromise= WeightLossFilterService.checkName(itemName);
    var qtyPromise=WeightLossFilterService.checkQuantity(itemQty);
    $q.all([namePromise, qtyPromise])
    .then(function(response){
      var item={
        name:itemName,
        qty:itemQty
      };
      items.push(item);
    })
    .catch(function(errorResponse) {
      console.log(errorResponse);
    });
  };

  service.getItems=function(){
    return items;
  }
  service.removeItem=function(itemIndex){
    items.splice(itemIndex,1);
  }
}

WeightLossFilterService.$inject=['$q','$timeout'];
function WeightLossFilterService($q,$timeout){
  var service=this;

  service.checkName=function(name){
    var deferred=$q.defer();

    var result={
      message:""
    };

    $timeout(function(){
      if(name.toLowerCase().indexOf('cookie')==-1){
        deferred.resolve(result);
      }else{
        result.message="Stay away from cookie";
        deferred.reject(result);
      }
    },3000);

    return deferred.promise;
  }

  service.checkQuantity=function (qty) {
    var deferred=$q.defer();

    var result={
      message:""
    };

    $timeout(function(){
      if(qty<6){
        deferred.resolve(result);
      }else{
        result.message="That's too much";
        deferred.reject(result);
      }
    },1000);
    return deferred.promise;
  }
}
})();
