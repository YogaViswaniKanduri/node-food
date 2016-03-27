angular.module('foodController', [])

    // inject the Food service factory into our controller
    .controller('mainController', ['$scope','$http','Foods', function($scope, $http, Foods) {
        $scope.formData = {};
        $scope.loading = true;

        // GET =====================================================================
        // when landing on the page, get all foods and show them
        // use the service to get all the foods
        Foods.get()
            .success(function(data) {
                $scope.foods = data;
                $scope.loading = false;
                getTotalPrice();
            });

        // GET Total Price=====================================================================
        // when landing on the page, get all foods and show their total price
        // use the service to get all the foods
        var getTotalPrice = function() {
            Foods.getTotalPrice()
                .success(function (data) {
                    $scope.total = data;
                    $scope.loading = false;
                });
        }
        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createFood = function() {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.foodname != undefined && $scope.formData.price != undefined) {
                $scope.loading = true;
                //console.log('Enetered create');
                // call the create function from our service (returns a promise object)
                Foods.create($scope.formData)

                    // if successful creation, call our get function to get all the new food items
                    .success(function(data) {
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.foods = data;
                        getTotalPrice();// assign our new list of food items
                    });
            }
        };

        // DELETE ==================================================================
        // delete a food item after checking it
        $scope.deleteFood = function(id) {
            $scope.loading = true;

            Foods.delete(id)
                // if successful creation, call our get function to get all the new food items
                .success(function(data) {
                    $scope.loading = false;
                    $scope.foods = data;
                    getTotalPrice();// assign our new list of food items
                });
        };
    }]);