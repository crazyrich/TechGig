
UserAuthentication();

var adminApp = angular.module('adminApp', ["appAuth", "ngResource", "ngRoute", "ngTable", "ui.bootstrap"]);

//---------------- RouteProvider------------------//

adminApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/user', {
            templateUrl: 'template/ManageUser.html',
            controller: 'ControllerManageUser'
        }).when('/assignUser', {
            templateUrl: 'template/AssignUserRole.html',
            controller: 'ControllerManageRole'
        }).
          when('/modifyUserPermission', {
              templateUrl: 'template/ModifyUserPermissions.html',
              controller: 'ControllerModifyPermissions'
          }).
          when('/ManageProgram', {
              templateUrl: 'template/admin.html',
              controller: 'ControllerAdminGridListing'
          }).
           when('/ManageResource', {
               templateUrl: 'template/ManageResource.html',
               controller: 'ControllerManageResource'
           }).
          when('/AssignResource', {
              templateUrl: 'template/AssignResource.html',
              controller: 'ControllerManageResource'
          }).
                    when('/UpdateResource', {
                        templateUrl: 'template/UpdateResource.html',
                        controller: 'ControllerManageResource'
                    }).
        otherwise({
            templateUrl: 'template/ManageUser.html',
            controller: 'ControllerManageUser'
        });
  }]);




adminApp.controller('ControllerWelcome', ['$scope', '$http', '$q', function ($scope, $http, $q) {


   

}]);



adminApp.controller('ControllerLogout', ['$rootScope', '$scope', '$http', '$localStorage', 'AuthenticationSrv', function ($rootScope, $scope, $http, $localStorage, AuthenticationSrv) {

    $scope.methods = {

        logout: function () {
           
            var promise = AuthenticationSrv.LogOutUser();
            promise.then(function (successResponse) {
                localStorage.LoginUser = {};
                location.href = '../login.html';
              
            }, function () {
                console.log("Error in ControllerLogout >> logout()");
            })
          
        }
    }


}]);

function UserAuthentication() {
    //------------ Check for User Logged in --------------//

    var lgnUsr = localStorage.getItem('LoginUser');
    if (typeof (lgnUsr) == "undefined" || lgnUsr == null) {

        location.href = '../login.html';

    }
    else {

        try {
            var person = JSON.parse(localStorage.getItem('LoginUser'));
            if (person != null) {

                if ((typeof (person.RoleName) == 'undefined') || (person.RoleName == null) || (typeof (person.UserName) == 'undefined') || (person.UserName == null)) {

                    location.href = '../login.html';

                }

            }
        }
        catch (err) {
            location.href = '../login.html';
        }
    }

    //------------ Check for User Logged in --------------//

}



