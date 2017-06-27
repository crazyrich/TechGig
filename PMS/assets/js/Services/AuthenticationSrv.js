
var appAuth = angular.module('appAuth', ["ngStorage", "ngResource", "ngRoute"]);


appAuth.service('AuthenticationSrv', ['$http', '$q', function ($http, $q) {

    this.LoginUser = function (userData) {

        var deferred = $q.defer();
        return $http({
            url: "../api/ManageUser/AutheticateUser",
            dataType: 'json',
            method: 'POST',
            data: userData,
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    } // end function


    this.LogOutUser = function () {
        var deferred = $q.defer();
        return $http({
            url: "../api/ManageUser/LogOutUser",
            dataType: 'json',
            method: 'POST',
            data: {},
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    } // end function

   
}]);

