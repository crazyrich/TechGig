var EditPermissionListForLoginUser = [];



function UserAuthentication()
{
    //------------ Check for User Logged in --------------//

    var lgnUsr = localStorage.getItem('LoginUser');
    if (typeof (lgnUsr) == "undefined" || lgnUsr == null) {

        location.href = 'login.html';

    }
    else {
        try {

            var person = JSON.parse(localStorage.getItem('LoginUser'));
            if (person != null) {

                if ((typeof (person.RoleName) == 'undefined') || (person.RoleName == null) || (typeof (person.UserName) == 'undefined') || (person.UserName == null)) {

                    location.href = 'login.html';

                }

            }
        }
        catch (err)
        {
            location.href = 'login.html';
        }
    }

    //------------ Check for User Logged in --------------//

}

UserAuthentication();


var app = angular.module('myApp', ["ngStorage", "ngResource", "ngRoute", "UserValidation", "ngSanitize"]);

angular.module('UserValidation', []).directive('validPasswordC', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue, $scope) {
                var noMatch = viewValue != scope.myForm.password.$viewValue
                ctrl.$setValidity('noMatch', !noMatch)
                if (noMatch == false)
                    this.$valid = true;
            })
        }
    }
})

//---------------- RouteProvider------------------//
/*
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/riskModule', {
            templateUrl: 'shared/RiskTemplate.html',
            controller: 'RiskController'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);
*/

//---------------- Route Provider ---------------//

//------------------ Start : Run --------------------//

app.run(function ($rootScope) {

    $rootScope.GlobalId = "-1";
    $rootScope.SelectedProgram = undefined;
    $rootScope.EntityLevel = "0";

    $rootScope.$on('handleEmit', function (event, args) {

        $rootScope.$broadcast('handleBroadcast', args);

    });

});

//------------------ End   : Run --------------------//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**************************** Refactor Start : Controller : chemCtrl **********************************/
// controller removed to leftPanal.js file
/**************************** Refactor End : Controller : chemCtrl **********************************/



app.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function (name,progName,flag,programID) {
        $scope.noofprogramp = name;
        $scope.nameofprogramp = progName;
        $scope.countdatafor = flag;
        $scope.showModal = !$scope.showModal;
    };
});

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

app.controller('ProgramNameController', function ($scope, $http) {
    
    


});


// save weekly futur plan
app.factory('dataService', function ($rootScope) {

    // private variable
    var _Service = {};
    _Service.data = false;
    _Service.sendData = function (data) {
        this.data = data;
        $rootScope.$broadcast('data_shared');
        
    };
    _Service.getData = function () {
         return this.data;
    };
    return _Service;
    // public API
    //this.dataObj = _dataObj;
    //this.saveprogramid=function(progmid)
    //{
    //    _dataObj = { "programId": progmid };
    //}
});

app.controller('shareData', ['$scope','$http', 'dataService', function ($scope, $http, dataService) {
     $scope.programIDS = '';
    
     $scope.$on('data_shared', function () {
        var text = dataService.getData();
        $scope.programIDS = text;
        
     });

     $scope.doubleclick1 = function (programid) {
         $scope.Listdata = [{ "Program_Id": "21", "Program_Name": "qd2222sd", "projectStatus": "Y" }];
         document.getElementById('programid').value = programid;
         //alert(document.getElementById('programid').value);
         //dataService.saveprogramid(programid);
         //var path = "/index.html";
         //window.location.href = path;

         //$http.get("http://172.18.66.83:8080/api/project")
         //    .success(function (response) {
         //        $.each(response, function (i, item) {

         //            if (item.Program_Id == document.getElementById('programid').value) {
         //                dataproject +="<a href=''><i></i><h3 style='margin-top:0px; padding-bottom:5px;'>"+item.Project_Name+"</h3><div><div style='display: inline;'><img src='img/member_small.png'/>32</div>&nbsp;"         
         //                                +"<div style='display: inline;' ng-click='toggleModal(2,2,2,1)'><img src='img/risk_small.png' />2</div>&nbsp;"
         //                                +"<div style='display: inline;'><img src='img/issue_small.png'/>5</div>&nbsp;&nbsp;&nbsp;&nbsp;"
         //                                +"</div></a>";


         //            }
         //        });
         //        document.getElementById('divprogramid').style.display ='none';
         //        document.getElementById('divprojectid').style.display ='';
         //        document.getElementById('liprojectid').innerHTML = null;
         //        document.getElementById('liprojectid').innerHTML = dataproject;
         //    })
         //         .error(function (execption, ab, er) {

         //   });
     };
    //$scope.data = dataService.dataObj;
   // alert($scope.programIDS);
        //   $.ajax({
        //    url: "http://172.18.66.83:8080/api/weeklystatus/KeyAccomplishments/" + weeklystatus_id,
        //    type: "POST",
        //    data: JSON.stringify(document.getElementById('divKeyAcco').innerText),
        //    headers: {
        //        "Content-Type": "application/json",
        //        "X-HTTP-Method-Override": "PUT"
        //    },
        //})
        

   
}]);



/**************************** Refactor Start : Controller : keyaccom (Key Accomplisment) **********************************/
// controller removed to KeyAccomlishment.js file
/**************************** Refactor End : Controller :  keyaccom (Key Accomplisment) **********************************/

