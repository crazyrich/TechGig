adminApp.controller('ControllerManageRole', ['$scope', '$http', '$q', 'ManageUserService', 'ngTableParams', function ($scope, $http, $q, ManageUserService, ngTableParams) {

    $("button[data-dismiss=modal]").click(function () {
      
        $scope.models.IsEdit = false;
        $scope.HelperMethods.ResetUserRole();
    });



    $scope.methods = {

        GetUserWithNoRole: function () {
            var list = [];
            var oPromise = ManageUserService.GetUserWithNoRole().then(function (successResponse) {
                $scope.models.UserList = [];
                if (successResponse.data.length != 0) {
                    $.each(successResponse.data, function (x, obj) {
                        list.push(obj);
                    });
                }
                else { list.push('--no more users--'); }

                $scope.models.UserList = list;
            }, function (failureResponse) {
                //alert("Failure");
            })
        },
      

        getAllRoles: function () {
            $scope.models.RoleList = [];
            var getroledata = ManageUserService.getAllRoles().then(function (successResponse) {
                $scope.models.RoleList = [];
                $scope.models.RoleList = successResponse.data;

            }, function (failureResponse) {

            });

        },

        getAllUsersInRole: function () {
            
            $scope.viewTable.ListData = [];
            var oPromise = ManageUserService.getAllUsersInRole().then(function (successResponse) {
                $scope.viewTable.ListData = [];
                $.each(successResponse.data, function (x, obj) {
                    $scope.viewTable.ListData.push({ "UserName": obj.UserName, "RoleName": obj.RoleName });
                });


                $scope.predicate = 'UserName';

                $scope.sort = function (predicate) {
                    $scope.predicate = predicate;
                }

                $scope.isSorted = function (predicate) {
                    return ($scope.predicate == predicate)
                }

                $scope.models.usersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.viewTable.ListData.length,
                    getData: function ($defer, params) {
                        $scope.filterName = "";
                        $scope.filterRoleName = "";
                        $scope.sortTypeName = 'UserName';
                        $scope.sortTypeRoleName = 'RoleName';
                        $scope.sortName = false;
                        $scope.sortRoleName = false;

                        $scope.data = $scope.viewTable.ListData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //  $scope.data = params.filter() ? $filter('filter')($scope.models.ListData, params.filter()) : $scope.data;
                        //  $scope.data = params.sorting() ? $filter('orderBy')($scope.models.ListData, params.orderBy()) : $scope.data;

                        $defer.resolve($scope.data);
                    }
                });


            }, function (failureResponse) {
               // alert("Failed Display Table");
            })

        },

        getAllRolesForUsername: function ()
        {
            var username = $scope.SelectedUserName;
            $scope.models.RoleForUser = [];
            var oPromise = ManageUserService.getAllRolesForUsername(username).then(function (successResponse) {
                $scope.models.RoleForUser = [];
                $.each(successResponse.data, function (x, obj) {
                    $scope.models.RoleForUser.push(obj);
                });

            }, function (failureResponse) {
                //alert("Getting Roles For This User Failed");
            })

        },
        AssignRole: function()
        {
           var username = $scope.SelectedUserName;
           var rolename = $scope.SelectedRole;

            if ($scope.models.IsEdit == false) {
                
                var AssignUserRole = ManageUserService.AssignRole(username, rolename).then(function (successResponse)
                {

                    alert('role assigned to user');
                   

                }, function (failureResponse) {
                   // alert('role cannot be assigned to user');
                });
            }
            else if ($scope.models.IsEdit == true)
            {
                var oldrolename = $scope.models.oldrolename;
                var newrolename=rolename;
                var AssignUserRole = ManageUserService.EditRole(username, oldrolename, newrolename).then(function (successResponse)
                {
                    alert('User ' + username + ' has been assigned role of ' + newrolename + '.');
                    $scope.models.IsEdit = false;
                    $scope.models.btnAddlable = "Add User";
                   

                }, function (failureResponse) {
                   // alert('User ' + username + ' cannot be assigned the role of ' + newrolename + ' .');
                });
 
            }
         
            $("button[data-dismiss=modal]").trigger('click');
            $scope.HelperMethods.ResetUserRole();
        },
        DeleteUserRole: function (username,rolename)
        {
          //  var username = $scope.SelectedUserName;
          //  var rolename = $scope.SelectedRole;
            var AssignUserRole = ManageUserService.DeleteUserRole(username, rolename).then(function (successResponse) {
                alert('User ' + username + ' removed From Role '+rolename+'.');
                $scope.HelperMethods.ResetUserRole();

            }, function (failureResponse) {
                alert('User ' + username + ' cannot be removed From Role '+rolename+' .');
            });

        },

        EditRole: function (username,rolename) {
            
            $scope.models.IsEdit = true;
            $scope.models.btnAddlable = "Update Role";
            $scope.models.UserList = [];
            $scope.models.UserList.push(username);
            $("#UserDropDown").val(username);
            $scope.SelectedUserName = username;
            $("#RoleDropDown").val(rolename);
            $scope.SelectedRole = rolename;
            $scope.models.oldrolename = rolename;
            
            $("button[data-toggle=modal]").trigger('click');
            
        }

    }

    $scope.models = {

        UserName: "",
        Email: "",
        Password: "",
        UserList: [],
        RoleList: [],
        RoleForUser:[],
        IsEdit: false,
        btnAddlable: "Assign Role",
        oldrolename: "",
        usersTable: []

}

    $scope.HelperMethods = {

    ComparePassword: function (pvalue,pconfvalue)
    {
        if (pvalue != pconfvalue)
        {
            return false;
        }
        return true;
    },
    ResetUserRole:function(){

        $('select').val('');
        $scope.SelectedRole = "";
        $scope.SelectedUserName = "";
        $scope.methods.GetUserWithNoRole();
        $scope.methods.getAllRoles();
        $scope.methods.getAllUsersInRole();
       

       
    },
    InitialiseJsTable: function () {
    $('#table_id').DataTable();
    },

    GetResponseForRoleDelete: function (username, rolename) {
        bootbox.confirm("Are You Sure To Delete ?", function (e) {
            if (e == true) {
                $scope.methods.DeleteUserRole(username, rolename);
            }
        });
    }
    }

    $scope.viewTable = {
        ListData: []
    }


    $scope.methods.GetUserWithNoRole();
    $scope.methods.getAllRoles();
    $scope.methods.getAllUsersInRole();

}]);
