


adminApp.service('ManageUserService', ['$http', '$q','$localStorage', function ($http, $q,$localStorage) {


    var deferred = $q.defer();

  

    this.AddUser = function (userData) {

        var oMyUname = localStorage.LoginUser.UserName;
        var oMyPwd = localStorage.LoginUser.Password;
        var oEncodedValue = localStorage.EncodedValues

        return $http({
            url:"../api/ManageUser/AddUser", 
            dataType: 'json', 
            method: 'POST',  
            data: userData,  
            headers: {  
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + oEncodedValue
            }
        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    } // end function
    //return Risks;   

    // Start : Get All User function //
    this.GetAllUser = function () {

        return $http({
            url: "../api/ManageUser/GetAllUser",
            dataType: 'json',
            method: 'GET',
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

    } //end GetAllUser
    // End : Get All User function   //


    this.GetUserWithNoRole = function () {

        return $http({
            url: "../api/ManageUser/GetAllUsersWithoutRole",
            dataType: 'json',
            method: 'GET',
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

    }

    this.GetUsersForRole = function (RoleName)
    { 
        var uri="../api/ManageUser/GetAllUsersForRole?RoleName=" + RoleName;
        return $http({
            url: uri,
            dataType: 'json',
            method: 'GET',
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

    this.getAllRolesForUsername = function (username)
    {
        var uri = "../api/Role/GetRolesForUser?username=" + username;
        return $http({
            url: uri,
            dataType: 'json',
            method: 'GET',
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

    this.GetUserByUserName = function (userName) {

        var mydata = { "username": userName };
        return $http({
            url: "../api/ManageUser/GetUserByUserName",
            dataType: 'json',
            method: 'GET',
            params: mydata
        }).success(function (succesResponse) {

            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });

    } //end GetAllUser

    // Start : Edit User

    this.UpdateUser = function (userData) {

        return $http({
            url: "../api/ManageUser/UpdateUser",
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

    // End : Edit User

    // Start : Delete User 

    this.DeleteUser = function (userData) {

        return $http({

            url: "../api/ManageUser/DeleteUser?username=" + userData,
            dataType: 'json',
            method: 'POST'
        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    } // end function

    // End : Delete User 

    this.getAllPrograms = function (id)
    {
        var mydata = { "username": userName };
        return $http({
            url: "../api/ManageUser/GetUserByUserName",
            dataType: 'json',
            method: 'GET',
            params: mydata
        }).success(function (succesResponse) {

            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });



    }


    this.GetUsersPermissionForRole = function (UserName,RoleName,ProgramName) {
        var uri = "../api/ManageUser/GetUserPermissionForRole?UserName=" + UserName + "&RoleName=" + RoleName + "&ProgramName=" + ProgramName;
        return $http({
            url: uri,
            dataType: 'json',
            method: 'GET',
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

    this.UpdateUsersPermissionForRole = function (UserData) {
        var uData = UserData ;
        return $http({
            url: "../api/ManageUser/UpdateUserPermissionForRole",
            dataType: 'json',
            method: 'POST',
            data: uData,
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

    this.DeleteUserEditPermission = function (UserName, PID, ParentID)
    {
        var url_api = "../api/ManageUser/DeletePermission?UserName=" + UserName + "&PID=" + PID + "&ParentID=" + ParentID;

        return $http({
            url: url_api,
            dataType: 'string',
            method: 'DELETE'
        }).success(function (successResponse) {
        
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    }

    this.getAllRoles=function()
    {
        return $http({
            url: "../api/Role/GetAllRoles",
            dataType: 'json',
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function (successResponse) {
            //alert("Response = " + successResponse)
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });

    }

    this.GetUserPermissionTableData = function (SelectedRole, SelectedUser) {
       
        return $http({
            url: "../api/ManageUser/GetDataForUsersPermissionTable?SelectedRole=" + SelectedRole + "&SelectedUser=" + SelectedUser,
            dataType: 'json',
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function (successResponse) {
            //alert("Response = " + successResponse)
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });

    }

    this.getAllUsersInRole = function ()
    {
        return $http({
            url: "../api/Role/GetUserRoles",
            dataType: 'json',
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).success(function (successResponse) {
            //alert("Response = " + successResponse)
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });

    } 

    this.AssignRole = function (username,rolename)
    {
        var url_api = "../api/Role/AssignRoleToUser?username=" + username + "&rolename=" + rolename;

        return $http({
            url: url_api,
            dataType: 'string',
            method: 'POST'
        }).success(function (successResponse) {
            //alert("Response = " + successResponse)
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });


    },

    this.EditRole = function (username, oldrolename, newrolename) {
        var url_api = "../api/Role/UpdateUserRole?username=" + username + "&oldrolename=" + oldrolename + "&newrolename=" + newrolename;

        return $http({
            url: url_api,
            dataType: 'string',
            method: 'PUT'
        }).success(function (successResponse) {
            //alert("Response = " + successResponse)
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });


    }

    this.DeleteUserRole = function (username, rolename) {
        var url_api = "../api/Role/DeleteUserInRole?username=" + username + "&rolename=" + rolename;

        return $http({
            url: url_api,
            dataType: 'string',
            method: 'DELETE'
        }).success(function (successResponse) {
            
            deferred.resolve(successResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });


    }
	
} // end parameter function
]);