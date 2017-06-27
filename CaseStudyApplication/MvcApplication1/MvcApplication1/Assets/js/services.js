var app = angular.module("myModule", ['ngRoute']).config(function ($routeProvider) {


    $routeProvider.when("/login", {
        templateUrl: "Assets/partials/login.html",
        controller: "loginController"
    }).when("/signup", {
        templateUrl: "Assets/partials/signup.html",
        controller: "signupController"
    }).when("/admin", {
        templateUrl: "Assets/partials/adminservices.html ",
        controller: "adminController"
    }).when("/client", {
        templateUrl: "Assets/partials/clientservices.html",
        controller: "clientController"
    }).when("/addProduct", {
        templateUrl: "Assets/partials/Add_product.html",
        controller: "adminController"
    }).when("/deleteProduct", {
        templateUrl: "Assets/partials/Delete_product.html",
        controller: "adminController"
    }).when("/listProduct", {
        templateUrl: "Assets/partials/List_product.html",
        controller: "adminController"
    }).when("/purchaseProduct", {
        templateUrl: "Assets/partials/Purchase_product.html",
        controller: "clientController"
    }).when("/billPaymentProduct", {
        templateUrl: "Assets/partials/Bill_payment.html",
        controller: "billPaymentController"
    })
});



//User
app.service('userService', ['$http', '$q', function ($http, $q) {

    this.getAllUsers = function () {

        var deferred = $q.defer();
        var url_api = "/api/User/GetAllUsers";
        return $http({
            method: 'GET',
            url: url_api

        }).success(function (data) {
            deferred.resolve();

        }).error(function () {
            deferred.reject();
        })
        return deferred.promise;
    }

}])
//Admin
app.service('productService', ['$http', '$q', function ($http, $q) {

    this.getAllProducts = function () {

        var deferred = $q.defer();
        var url_api = "/api/Product/GetAllProducts";
        return $http({
            method: 'GET',
            url: url_api

        }).success(function (data) {
            deferred.resolve();

        }).error(function () {
            deferred.reject();
        })
        return deferred.promise;
    }

}])