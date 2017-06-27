
adminApp.directive('pwCheck', [function () {
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




adminApp.controller('ControllerManageUser', ['$scope', '$http', '$q', '$filter', 'ManageUserService', 'ngTableParams', function ($scope, $http, $q, $filter, ManageUserService, ngTableParams) {

    $("button[data-dismiss=modal]").click(function () {

        $scope.HelperMethods.ResetMsg();
        $scope.HelperMethods.ResetAddUser();
        $scope.$$childTail.CreateUserForm.$setPristine();
        $scope.$$childTail.CreateUserForm.$setUntouched();
        $scope.models.IsEdit = false;
        $scope.models.btnAddlable = "Add User";
    
    });

    $scope.methods = {

        AddUser: function ()
        {
            $scope.HelperMethods.ResetMsg();

            if ($scope.models.Password != "")
            {
                if (!$scope.HelperMethods.ComparePassword($scope.models.Password, $scope.models.confirmPassword))
                {
                    $scope.HelperMethods.DisplayMsg("Password and confirm Password do not match");
                    return

                }
            }
            var oUser = {
                "UserName": $scope.models.UserName,
                "Password": $scope.models.Password,
                "Email": $scope.models.Email

            }

            // Start : Add user Function //
            if ($scope.models.IsEdit == false) {
                var oPromise = ManageUserService.AddUser(oUser).then(function (successResponse) {

                    if (successResponse.data == "1") {

                        $("button[data-dismiss=modal]").trigger('click');
                        alert("User Added Successfully");
                        $scope.HelperMethods.ResetAddUser();
                        $scope.methods.GetAllUser(); // Bind new added User

                    }
                    else if (successResponse.data == "-2") { alert("Username Already Exists..."); }
                    else{
                        alert("Database Error in add user");
                    }
                }, function (failureResponse) {
                    alert("Fail Add User");
                });

            }
            // End : Add user Function //

            // Start : Edit user Function //
            if ($scope.models.IsEdit == true) {

                var oPromise = ManageUserService.UpdateUser(oUser).then(function (successResponse) {
                    $scope.models.IsEdit = false;
                    $scope.models.btnAddlable = "Add User";
                    $("button[data-dismiss=modal]").trigger('click');
                    $scope.methods.GetAllUser(); // Bind new added User
                }, function (failureResponse) {
                    //alert("Fail Update User");
                    $scope.HelperMethods.DisplayMsg("Error in User Update >> " + failureResponse);
                });

            }
            // End : Edit user Function //
            
        }, //end adduser

        GetAllUser: function () {
            $scope.viewModel.ListData = [];
            var oPromise = ManageUserService.GetAllUser().then(function (successResponse) {
                $scope.viewModel.ListData.length = 0; $scope.viewModel.ListData = [];
                $.each(successResponse.data, function (x, obj) {
                    $scope.viewModel.ListData.push({ "UserName": obj.UserName, "Email": obj.Email });
                });
                


                $scope.predicate = 'UserName';

                $scope.sort = function (predicate) {
                    $scope.predicate = predicate;
                }

                $scope.isSorted = function (predicate) {
                    return ($scope.predicate == predicate)
                }

                $scope.models.manageUsersTable = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: $scope.viewModel.ListData.length,
                    getData: function ($defer, params) {
                        //$scope.filterName = "";
                        //$scope.filterEmail = "";
                        //$scope.sortTypeName = 'UserName';
                        //$scope.sortTypeEmail = 'Email';
                        //$scope.sortName = false;
                        //$scope.sortEmail = false;

                        $scope.data = $scope.viewModel.ListData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        //  $scope.data = params.filter() ? $filter('filter')($scope.models.ListData, params.filter()) : $scope.data;
                        //  $scope.data = params.sorting() ? $filter('orderBy')($scope.models.ListData, params.orderBy()) : $scope.data;

                        $defer.resolve($scope.data);
                    }
                });

            }, function (failureResponse) {
                //alert("Fail Add User");
            })
        },
        //end GetAllUser

        // start : Edit User function
        EditUser: function (userName) {

            $scope.models.IsEdit = true;
            $scope.models.btnAddlable = "Edit User";
            $("button[data-toggle=modal]").trigger('click');
            var oPromise = ManageUserService.GetUserByUserName(userName).then(function (successResponse) {

                if (successResponse.data.UserName != null) {

                    $scope.models.UserName = successResponse.data.UserName;
                    $scope.models.Email = successResponse.data.Email;
                    $scope.models.Password = successResponse.data.Password;
                    $scope.models.confirmPassword = successResponse.data.Password;
                }

            }, function (failureResponse) { });
        },  //End : Edit User Function

        //Start : Delete User
        DeleteUser: function (username) {

            var oPromise = ManageUserService.DeleteUser(username).then(function (successResponse) {
                if (successResponse.data == "1") {
                    $scope.methods.GetAllUser();
                }
                else {

                    alert("Error in Delete user");
                }

            }, function (failureResponse) { });
        },
       
    }

    $scope.models = {

        UserName: "",
        Email: "",
        Password: "",
        confirmPassword: "",
        customeMsg: "",
        ShowMsg: false,
        IsEdit: false,
        btnAddlable: "Add User",
        manageUsersTable: []

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
        ResetMsg: function ()
        {
            $scope.models.ShowMsg = false;
            $scope.models.customeMsg = "";
        },
        DisplayMsg: function (msg) {
            $scope.models.ShowMsg = true;
            $scope.models.customeMsg = msg;
        },

        ResetAddUser: function () {
            $scope.models.UserName = "";
            $scope.models.Email = "";
            $scope.models.Password = "";
            $scope.models.confirmPassword = "";
            $("#txtUserName").val("");
            $("#txtEmail").val("");
            $("#txtPassword").val("");
            $("#txtConfPassword").val("");
            
 
        },
        InitialiseJsTable: function () {
            $('#table_id').DataTable();
        },

        GetResponseForDelete: function (UserName) {
        bootbox.confirm("Are You Sure To Delete ?", function (e) {
            if (e == true) {
                $scope.methods.DeleteUser(UserName);
            }
        });
    }
    }

    $scope.viewModel = {
        ListData: [],
    }

    //$scope.HelperMethods.InitialiseJsTable();
    $scope.methods.GetAllUser();

}]);

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});
