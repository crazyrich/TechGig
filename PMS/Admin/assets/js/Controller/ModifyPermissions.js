

adminApp.controller('ControllerModifyPermissions', ['$scope', '$http', '$q', '$filter', 'ManageUserService', 'ngTableParams', function ($scope, $http, $q, $filter, ManageUserService, ngTableParams) {

    $("button[data-dismiss=modal]").click(function () {
        $scope.models.btnAddlable="Assign Permissions"
        $scope.HelperMethods.ResetModifyUserPermissionsModal();
    });

    
   

    $scope.methods = {

        GetAllUsersForRole: function (rolename) {
            var List = [];
            var oPromise = ManageUserService.GetUsersForRole(rolename).then(function (successResponse) {
                $scope.models.UsersList = [];
                $scope.models.UsersForRoleList = [];
                $.each(successResponse.data, function (x, obj) {
                    List.push({ "UserName": obj });
                });
                $scope.models.UsersList = List;
                $scope.models.UsersForRoleList = List;
                
            }, function (failureResponse) {
               // alert("Fail Add User");
            })
        },

        getAllRoles: function () {
            var getroledata = ManageUserService.getAllRoles().then(function (successResponse) {
                var list = [];
                $.each(successResponse.data, function (x, obj) {
                    
                    if (obj != "SuperAdmin")
                    {
                        list.push(obj);
                    }

                });

                $scope.models.RoleNameList = list;

            }, function (failureResponse) {

            });

        },
        getAllUsers: function () {
            var getUserData = ManageUserService.GetAllUser().then(function (successResponse) {
                var list = [];
                $scope.models.UsersList=[];

                $.each(successResponse.data, function (x, obj) {
                    
                    if (obj.UserName != "admin")
                    {
                        list.push(obj);
                    }

                });
                
                $scope.models.UsersList = list;

            }, function (failureResponse) {

            });

        },

        getAllProgram: function () {
            
            $scope.models.ProgramList = getProgramDataForAdmin();
        },

        getAllProject: function () {
            $scope.models.ProjectList = "";
        },

        GetUserPermissionForRole: function (username,rolename,programname) {
          
            var oPromise = ManageUserService.GetUsersPermissionForRole(username,rolename,programname).then(function (successResponse) {
                var List = [];
                $.each(successResponse.data, function (x, obj) {
                    if (obj.EditPermission == "Y")
                    { obj.EditPermission = true }
                    else { obj.EditPermission = false }

                    List.push(obj);
                });
                $scope.models.UsersPermissionForRoleList = List;

            }, function (failureResponse) {
                //alert("Fail Add User");
            })
        },

        GetUserPermissionTableData: function (SelectedRole, SelectedUser) {
            $scope.models.ListData = [];
            if ((typeof(SelectedRole) == "undefined")||SelectedRole==null) { SelectedRole = "Default"; }
            if ((typeof (SelectedUser) == "undefined")||SelectedUser==null) { SelectedUser = "Default"; }
           
            var oPromise = ManageUserService.GetUserPermissionTableData(SelectedRole,SelectedUser).then(function (successResponse) {
                $scope.models.ListData.length = 0; $scope.models.ListData = [];
                $.each(successResponse.data, function (x, obj) {
				if(obj.RoleName!='SuperAdmin')
				{
                    $scope.models.ListData.push({ "UserName": obj.UserName, "RoleName": obj.RoleName, "ProjectName": obj.ProjectName, "ProgramName": obj.ProgramName, "PID": obj.PID, "ParentID": obj.ParentID, "EditPermission": obj.EditPermission });
		        }
                });
                


                $scope.predicate = 'ProgramName';

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
                    total: $scope.models.ListData.length,
                    getData: function ($defer, params) {
                        $scope.filterProgram = "";
                        $scope.filterProject = "";
                        $scope.sortTypeProgram = 'ProgramName';
                        $scope.sortTypeProject = 'ProjectName';
                        $scope.sortProgram = false;
                        $scope.sortProject = false;

                        $scope.data = $scope.models.ListData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                       //  $scope.data = params.filter() ? $filter('filter')($scope.models.ListData, params.filter()) : $scope.data;
                       //  $scope.data = params.sorting() ? $filter('orderBy')($scope.models.ListData, params.orderBy()) : $scope.data;
                       
                        $defer.resolve($scope.data);
                    }
                });

            }, function (failureResponse) {
               // alert("Failed Display Table");
            })
        },

        AssignPermissions: function (value) {
            var arr = [];
            for (var i in value) {
                if(value[i].ViewPermission == true){
                    if (value[i].EditPermission == true  ) {
                        arr.push({ Id: value[i].Id, EditPermission: 'Y', ViewPermission: true, ProgramName: value[i].ProgramName, PID: value[i].PID, RoleName: $scope.SelectedRoleForPermission, UserName: $scope.SelectedUserNameForPermission });
                    }
                    else {
                      
                        arr.push({ Id: value[i].Id, EditPermission: 'N', ViewPermission: true, ProgramName: value[i].ProgramName, PID: value[i].PID, RoleName: $scope.SelectedRoleForPermission, UserName: $scope.SelectedUserNameForPermission });
                    }
                }
                else {
                    arr.push({ Id: value[i].Id, EditPermission: 'N', ViewPermission: false, ProgramName: value[i].ProgramName, PID: value[i].PID, RoleName: $scope.SelectedRoleForPermission, UserName: $scope.SelectedUserNameForPermission });
                }
            }
            $scope.models.UsersModifiedPermission = [];
            $scope.models.UsersModifiedPermission = arr;
            $scope.HelperMethods.UpdatePermission();
        },

        DeleteUserPermission: function (UserName, PID, ParentID)
        {
          
            var oPromise = ManageUserService.DeleteUserEditPermission(UserName, PID, ParentID).then(function (successResponse) {
               
               if (successResponse.data==1) {
                   alert('User Permission Deleted');
                   $scope.methods.GetUserPermissionTableData();
               } else if(successResponse.data==-1) { alert('This Permission Does not Exist');}
             
            }, function (failureResponse) {
                alert("Failed Delete user Permission");
            })
        },

        EditUserPermission: function (UserName,ProgramName,ProjectName)
        {
            $scope.models.btnAddlable = "Modify User Permissions";

            var oPromise = ManageUserService.getAllRolesForUsername(UserName).then(function (successResponse) 
            {
                if(successResponse.data[0]==="Program Manager")
                {
                    $scope.SelectedRoleForPermission = "Program Manager";
                    $("#ModifyRoleDropDown").val("Program Manager");
                    $scope.HelperMethods.FillResourceDropDown();
                    $scope.SelectedUserNameForPermission = UserName;
                    $("#ModifyUserDropDown").val(UserName);

                    var PromiseChar = $scope.methods.checkProgramOrProject();
                    PromiseChar.then(function (successResponse) {
    
                        $scope.HelperMethods.FillPermissionGridProgramLevel();

                    }, function (failureResponse) {

                    });
                }
                else if(successResponse.data[0]==="Project Manager"){

            $scope.SelectedRoleForPermission = "Project Manager";
                $("#ModifyRoleDropDown").val("Project Manager");
                $scope.HelperMethods.FillResourceDropDown();
                $scope.SelectedUserNameForPermission = UserName;
                $("#ModifyUserDropDown").val(UserName);
                $scope.models.ProgramForProjectManager = ProgramName;

                var PromiseChar = $scope.methods.checkProgramOrProject();
                PromiseChar.then(function (successResponse) {
                    $("#ProgramList").val(ProgramName.trim());
                    $scope.HelperMethods.FillPermissionGridProjectLevel();

                }, function (failureResponse) {

                });

               
            }
            $("button[data-toggle=modal]").trigger('click');
            }, function (failureResponse) {
                //alert("Failed Display Table");
            })
        },

        UpdateUserPermissionForRole: function (listData) {
            var List = [];
            var oPromise = ManageUserService.UpdateUsersPermissionForRole(listData).then(function (successResponse) {

                $("button[data-dismiss=modal]").trigger('click');
                

            }, function (failureResponse) {
                //alert("Fail Add User");
            })
        },

        checkProgramOrProject: function () {
            //var role = $scope.SelectedRoleForPermission;
            var deferred = $.Deferred();
            var flag = 0;

            if ($scope.SelectedRoleForPermission === "Program Manager") {
                $scope.HelperMethods.FillPermissionGridProgramLevel();
                flag = 1;
            }
            else
            {
                $scope.models.ProgramList = [];
                var templist = getProgramDataForAdmin();
                $.each(templist, function (x, obj) {
                    $scope.models.ProgramList.push(obj.Program_Name );
                });
                flag = 1;
            }

            if (flag == 1) {
                deferred.resolve(true);
            } else { deferred.reject(false); }


            return deferred.promise();

        },

        filterUserPermissionTable: function ()
        {
            var SelectedRole = $scope.SelectedRoleForFilter;
            var SelectedUser = null;
            if ($scope.SelectedUserNameForFilter != null) {
               SelectedUser = $scope.SelectedUserNameForFilter.UserName;
            }
           

            $scope.methods.GetUserPermissionTableData(SelectedRole, SelectedUser);

            if((typeof (SelectedUser) == "undefined") || SelectedUser == null)
            {

                if ((typeof (SelectedRole) == "undefined") || SelectedRole == null) {
                    $scope.methods.getAllUsers();
                }
                else { $scope.HelperMethods.FillResourceDropDownForFilter(); }
            }
        }

    }

    $scope.models = {

        UserName: "",
        UsersForRoleList:[],
        RoleNameList: [],
        UsersList:[],
        UsersPermissionForRoleList: [],
        UsersModifiedPermission:[],
        ProgramForProjectManager: "",
        CheckBoxStatus: "",
        ListData: [],
        usersTable: [],
        btnAddlable :"Assign Permissions"
            }

    $scope.HelperMethods = {
       
        FillResourceDropDown: function ()
        {
            var rolename = $scope.SelectedRoleForPermission;
            $scope.methods.GetAllUsersForRole(rolename);
        },

        FillResourceDropDownForFilter: function ()
        {

            var rolename = $scope.SelectedRoleForFilter;
            $scope.methods.GetAllUsersForRole(rolename);

        },

        FillPermissionGridProgramLevel: function () {
            //var username = $scope.SelectedUserNameForPermission;
            $scope.methods.GetUserPermissionForRole($scope.SelectedUserNameForPermission, $scope.SelectedRoleForPermission, "0");
        },
        FillPermissionGridProjectLevel: function () {

            
            var programname = $scope.models.ProgramForProjectManager
            $scope.methods.GetUserPermissionForRole($scope.SelectedUserNameForPermission, $scope.SelectedRoleForPermission, programname);
        },
       
        UpdatePermission: function () {
            $scope.methods.UpdateUserPermissionForRole($scope.models.UsersModifiedPermission);
        },

        InitialiseJsTable: function () {
            $('#table_id').DataTable();
        },

        ResetModifyUserPermissionsModal: function ()
        {
            $scope.models.UsersForRoleList = [];
            $scope.models.UsersPermissionForRoleList = [];
            $scope.models.UsersModifiedPermission = [];
            $scope.models.ProgramForProjectManager = "";
            $scope.models.ListData = [];

            $('select').val('');
            $scope.SelectedRoleForPermission = "";
            $scope.SelectedUserNameForPermission = "";
        
            $scope.methods.getAllRoles();
            $scope.methods.getAllProgram();
            $scope.methods.getAllProject();
            $scope.methods.GetUserPermissionTableData();
           
            
        },

        GetResponseForDelete: function (UserName, PID, ParentID) {
            bootbox.confirm("Are You Sure To Delete ?", function (e) {
                if (e == true) {
                    $scope.methods.DeleteUserPermission(UserName, PID, ParentID);
                }
            });
        }

    }
    $scope.methods.getAllUsers();
    $scope.methods.getAllRoles();
    $scope.methods.getAllProgram();
    $scope.methods.getAllProject();
    $scope.methods.GetUserPermissionTableData();
    
  //  alert($scope.models.ListData[0].UserName);


}]);


function getProgramDataForAdmin() {
    var ID = '0';
    var jsonDataResponse = "";
    $.ajax({
        url: "../api/program/GetAllProgram/" + ID,
        type: "GET",
        async: false,
        success: function (data) {
         jsonDataResponse = data;
        },
        error: function () {
            alert("Error value  = ");
            connectionError("api/program/GetAllProgram/" + id);
        }
    });
    return jsonDataResponse;
}