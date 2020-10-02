(function() {
    'use strict';

    angular.module('LunchCheck', [])

        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchItems = "";
        $scope.message = "";
        $scope.total = "";
        $scope.showMessage = false;
        $scope.calculateItems = function() {
            debugger;
            if (isNullOrWhitespace($scope.lunchItems)) {
                $scope.message = "Please enter data first.";
                $scope.showMessage = true;
                updateMessageStyle("red");
                return;
            }
            var items = $scope.lunchItems.split(',');
            var count = items.filter(t => !isNullOrWhitespace(t)).length;
            $scope.total = count;
            if (count <= 3) {
                $scope.message = "Enjoy!\nTotal items:" + count;
                $scope.showMessage = true;
                updateMessageStyle("green");
            } else {
                $scope.message = "Too much!\nTotal items:" + count;
                $scope.showMessage = true;
                updateMessageStyle("green");
            }
        }

        function isNullOrWhitespace(input) {
            return (typeof input === 'undefined' || input == null) ||
                input.replace(/\s/g, '').length < 1;
        }

        function updateMessageStyle(color) {
            $scope.msgStyle = {
                "color": color
            }
            $scope.textBoxStyle = {
                "border-color": color
            }
        }
    }
})
();
