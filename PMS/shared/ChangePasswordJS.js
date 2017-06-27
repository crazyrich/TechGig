
angular.module('myApp').service('UpdatePasswordService', ['$http', '$q', function ($http, $q) {
    // alert("ALERTED");

    var deferred = $q.defer();

    this.updateUserPassword = function (oldpassword, newpassword) {
        var person = JSON.parse(localStorage.getItem('LoginUser'));

        var url_api = "../api/ManageUser/UpdateUserPassword?username=" + person.UserName + "&oldpassword=" + oldpassword + "&newpassword=" + newpassword;
        var deferred = $q.defer();
        return $http({
            method: 'GET',
            url: url_api

        }).success(function (data) {
            deferred.resolve();
        }).error(function () {

        });
        return deferred.promise;
    }
}
]);

//var app = angular.module('myApp', ['UserValidation']);

angular.module('myApp')
  .directive('pwCheck', [function () {
      return {
          require: 'ngModel',
          link: function (scope, elem, attrs, ctrl) {
              var firstPassword = '#' + attrs.pwCheck;
              elem.add(firstPassword).on('keyup', function () {
                  scope.$apply(function () {
                      var v = elem.val() === $(firstPassword).val();
                      ctrl.$setValidity('pwmatch', v);
                  });
              });
          }
      }
  }]);

app.controller('ControllerUpdatePassword', ['$scope', '$http', 'UpdatePasswordService', function ($scope, $http, UpdatePasswordService) {

    $scope.methods = {
        updatePassword: function (oldpassword, newpassword) {
                UpdatePasswordService.updateUserPassword(oldpassword, newpassword).then(function (successresponse) {
                    $scope.formData.name = '';
                    $scope.formData.password = '';
                    $scope.formData.password_c = '';
                    $scope.updated = 0;
                    if (successresponse.data == 1) {
                        $scope.updated = 1;
                        $scope.myForm.$setPristine();
                    }
                    else {
                        $scope.updated = -1;
                        $scope.myForm.$setPristine();
                    }

                });
        },
        reset:function()
        {
            $scope.updated = 0;
            $scope.formData.name = '';
            $scope.formData.password = '';
            $scope.formData.password_c = '';
            $scope.myForm.$setPristine();
        }

    }



}]);