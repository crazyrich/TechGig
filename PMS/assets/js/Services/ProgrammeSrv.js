


angular.module('myApp').service('ProgrammeSrv', ['$http', '$q','$rootScope', '$localStorage', '$resource', function ($http, $q,$rootScope,$localStorage, $resource) {

    var deferred = $q.defer();
    var id = $("#hdGlobalID").val();

    this.getProgramByUserID = function (ProgramId) {
       
        var person = JSON.parse(localStorage.getItem('LoginUser'));

      

        var programs = $resource("api/Program/GetProgramByUserId?ProgramId=" + ProgramId + "&LoginId=" + person.UserName, {}, {
            "getProgram": {
                method: "GET",
                isArray: true
            }
        });

        return programs.getProgram().$promise;
    }
    
    // end parameter function


    this.GetLoginUserPermission = function (userData) {
        
        var deferred = $q.defer();

        return $http({
            url: "../api/ManageUser/GetPermissionForLoginUser?UserName="+userData,
            dataType: 'json',
            method: 'POST',
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

    }



    //----------Start : Key Accomplishment--------------------//

    this.getKeyAccomplishment = function (PID) {
       var person = JSON.parse(localStorage.getItem('LoginUser'));
        var lvl = $rootScope.EntityLevel;
      
        
        var KeyAccomplish = $resource("api/Weeklystatus/GetKeyAccomplishMent?level=" + lvl + "&PID=" + PID + "", {}, {
            "getKeyAccomplishment": {
                method: "GET",
                isArray: false
            }
        });

        return KeyAccomplish.getKeyAccomplishment().$promise;
    }



    this.getAllKeyAccomplishment = function (PID) {
        PID = document.getElementById('weeklyStatusID').value;
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var lvl = $rootScope.EntityLevel;

        var KeyAccomplish = $resource("api/Weeklystatus/GetAllKeyAccomplishMent?PID=" + PID + "", {}, {
            "getAllKeyAccomplishment": {
                method: "GET",
                isArray: true
            }
        });

        return KeyAccomplish.getAllKeyAccomplishment().$promise;
    }
    
    //----------End : Key Accomplishment -------------------//



    //----------Start :Get Weekly Status --------------------//

    this.getWeeklyStausByUserName = function () {

        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var lvl = $rootScope.EntityLevel;
        var id = $("#hdGlobalID").val();

        var WeeklyStatus = $resource("api/Weeklystatus/GetWeeklyStatusByUserName?UserName=" + person.UserName + "&ID=" + id, {}, {
            "getWeeklyStausByUserName": {
                method: "GET",
                isArray: true
            }
        });

        return WeeklyStatus.getWeeklyStausByUserName().$promise;
    }

    //----------End :Get Weekly Status -------------------//


    //--------- Start : Get Module Permission By Loggedin User --------//

    this.GetModulesPermissionByUserName = function (UserName) {

        var deferred = $q.defer();
        var User = {
            UserName: UserName
        }
        return $http({
            url: "api/ManageUser/GetModulesPermissoinByUserName",
            dataType: 'json',
            method: 'POST',
            data: User,
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

    }

    //--------  End   : Get Module Permission By Loggedin User --------//
}]);







