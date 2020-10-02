(function(){
'use strict';

angular.module('NameCalculator',[])

.controller('NameCalculatorController', NameCalculatorController);

NameCalculatorController.$inject=['$scope'];
function NameCalculatorController($scope){
  $scope.name="Sammy";
  $scope.totalValue=0;
  $scope.DisplayNumeric=function(){
    var totalNameValue=calculateNumericForString($scope.name);
    $scope.totalValue=totalNameValue;
  };
  $scope.init=function(){
    $scope.DisplayNumeric();
  };
  function calculateNumericForString(string){
    var totalStringValue=0;
    for(var i=0;i<string.length;i++){
      totalStringValue+=string.charCodeAt(i);
    }
    return totalStringValue;
  }
}
})();
