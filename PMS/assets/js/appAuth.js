

angular.module('appAuth').controller('controllerAuth', ['$rootScope', '$scope', '$http', '$localStorage', 'AuthenticationSrv', function ($rootScope, $scope, $http, $localStorage, AuthenticationSrv) {

    

    $scope.methods = {

        login: function () {

            var oUser = {
                UserName: $scope.models.UserName,
                Password: $scope.models.Password
            }
            AuthenticationSrv.LoginUser(oUser).then(function (successResponse) {

                if (successResponse.data.UserStatus == "-1")
                {
                    var msg = "";
                    if (successResponse.data.UserRole == 'RoleNotDefined')
                    {
                        msg = "User Role is not defined yet !!";
                        $scope.helperMethods.displayMsg(msg);
                    }

                    if (successResponse.data.UserRole == 'UserNotFound') {
                        msg = "User not found !!";
                        $scope.helperMethods.displayMsg(msg);
                    }

                    if (successResponse.data.UserRole == 'PaswordNotFound') {
                        msg = "Password not matching !!";
                        $scope.helperMethods.displayMsg(msg);
                    }

                }


                if (successResponse.data.UserStatus == "1")
                {
                    var myData = { "UserId": "0", "UserName": successResponse.data.UserName, "Password": successResponse.data.Password, "RoleName": successResponse.data.UserRole, "UserStatus": successResponse.data.UserStatus };
                    localStorage.setItem('LoginUser', JSON.stringify(myData));
                    localStorage.EncodedValues = $scope.helperMethods.EncodeText(successResponse.data.UserName + ":" + successResponse.data.Password);

                    if (myData.UserStatus != "1") {
                        msg = "Your account is disabled, please contact your administrator!!";
                        $scope.helperMethods.displayMsg(msg);
                    }

                    if (myData.RoleName == "SuperAdmin") {
                        location.href = 'Admin/AdminPanel.html';
                    }
                    else {

                        location.href = 'index.html';

                    }
                }

            }, function (failureResponse) {

                alert("User Authentication Failed!!");
            });

        }
       
    }

    $scope.models = {

        UserName: "",
        Password: "",
        UserRole: "",
        UserStatus: "",
        Msg: ""
    }

    $scope.helperMethods = {

        displayMsg: function (msg) {
            $scope.models.Msg = msg;
        },
        EncodeText: function (input) { /*Start*/

                var keyStr = 'ABCDEFGHIJKLMNOP' +
                             'QRSTUVWXYZabcdef' +
                             'ghijklmnopqrstuv' +
                             'wxyz0123456789+/' +
                             '=';
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
        /*end */} 
    }


}]);




