(function(){
  'use strict';

  angular.module('FiltersTutorial',[])

  .controller('FiltersTutorialController', FiltersTutorialController)
  .filter('loves',LovesFilter)
  .filter('truth', TruthFilter);

  FiltersTutorialController.$inject=['$scope','lovesFilter'];
  function FiltersTutorialController($scope,lovesFilter){
    $scope.name="Aakarsh";
    $scope.stateOfBeing="sad";
    $scope.cookieCost = 10.9086;
    $scope.sayMessage=function(){
      var msg=$scope.name + " likes to eat mangoes!"
      var output= msg;
      return  output;
    }
    $scope.sayLovesMessage=function(){
      var msg=$scope.name + " likes to eat mangoes!"
      var output= lovesFilter(msg);
      return  output;
    }
    $scope.feedHim=function(){
      $scope.stateOfBeing="happy";
    }
  }

  function LovesFilter(){
    return function (input){
      input=input || "";
      input=input.replace("likes","loves");
      return input;
    }
  }
  function TruthFilter(){
    return function(input, target, replace){
      input = input || "";
      input=input.replace(target,replace);
      return input;
    }
  }
})();
