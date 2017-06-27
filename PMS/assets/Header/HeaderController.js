




angular.module('myApp').service('HeaderTilesSrv', ['$http', '$q', '$rootScope', '$localStorage', '$resource', function ($http, $q, $rootScope, $localStorage, $resource) {

    var deferred = $q.defer();

    this.getResourceCount = function () {
        var lvl = $rootScope.GlobalId;
        
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var HearderCount = $resource("api/Resource/GetResourceCount?level=" + lvl + "&UserName=" + person.UserName, {}, {
            "ResourceCount": {
                method: "GET",
                isArray: false
            }
        });

        return HearderCount.ResourceCount().$promise;
    }

    this.getRiskCount = function () {
        var lvl = $rootScope.GlobalId;
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var HearderCount = $resource("api/Risk/GetRiskCount?level=" + lvl + "&UserName=" + person.UserName, {}, {
            "RiskCount": {
                method: "GET",
                isArray: false
            }
        });

        return HearderCount.RiskCount().$promise;
    }

    this.getIssueCount = function () {
        var lvl = $rootScope.GlobalId;
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var HearderCount = $resource("api/Issue/GetIssueCount?level=" + lvl + "&UserName=" + person.UserName, {}, {
            "IssueCount": {
                method: "GET",
                isArray: false
            }
        });

        return HearderCount.IssueCount().$promise;
    }

    // end parameter function
}]);

app.controller('ControllerLogoutIndex', ['$rootScope', '$scope', '$http', '$localStorage', function ($rootScope, $scope, $http, $localStorage) {

    $scope.methods = {

        logout: function () {
            $localStorage.LoginUser = {};
            location.href = '../login.html';
        }
    }


}]);

app.controller('NavigationController', function ($scope) {

    $scope.changeview = function (color) {
        var progDiv = angular.element(document.querySelector('#ProgramDiv'));
        var mainDiv = angular.element(document.querySelector('#tablesandcharts'));

        var myElTeal = angular.element(document.querySelector('#divTeal'));

        var myElPurple = angular.element(document.querySelector('#divPurple'));
        var myElBlue = angular.element(document.querySelector('#divBlue'));
        var myElAqua = angular.element(document.querySelector('#divAqua'));
        var myElRed = angular.element(document.querySelector('#divRed'));
        var myElYellow = angular.element(document.querySelector('#divYellow'));
        var myElTealRelease = angular.element(document.querySelector('#divTeal'));


        var myTblPurple = angular.element(document.querySelector('#tablePurple'));
        var myTblBlue = angular.element(document.querySelector('#tableBlue'));
        var myTblAqua = angular.element(document.querySelector('#tableAqua'));
        var myTblRed = angular.element(document.querySelector('#tableRed'));
        var myTblYellow = angular.element(document.querySelector('#tableYellow'));
        var myTblTeal = angular.element(document.querySelector('#tableTeal'));


        var myFinanceBrdCrumShow = angular.element(document.querySelector('#financeBrdCrumShow'));

        var myResourceBrdCrumShow = angular.element(document.querySelector('#resourceBrdCrumShow'));
        var myRiskBrdCrumShow = angular.element(document.querySelector('#riskBrdCrumShow'));
        var myIssueBrdCrumShow = angular.element(document.querySelector('#issueBrdCrumShow'));
        var myReleaseBrdCrumShow = angular.element(document.querySelector('#releaseBrdCrumShow'));
        //   var myFinanceBrdCrumShow = document.getElementById('financeBrdCrumShow');

        if (color == 'Programs') {

            progDiv.css('display', '');
            mainDiv.css('display', 'none');

            //myElPurple.css('display', '');
            //myElBlue.css('display', 'none');
            //myElAqua.css('display', 'none');
            //myElRed.css('display', 'none');
            //myElYellow.css('display', 'none');

            //myTblPurple.css('display', 'none');
            //myTblBlue.css('display', 'none');
            //myTblAqua.css('display', 'none');
            //myTblRed.css('display', 'none');
            //myTblYellow.css('display', 'none');
        }
        if (color == 'Amount') {

            if ($scope.IsUserHasPermission(2) == false)
            {
                alert("You do not have permission to access this module !!");
                return false;
            }

            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', '');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myTblTeal.css('display', 'none');
            myFinanceBrdCrumShow.css('display', '');
            myResourceBrdCrumShow.css('display', 'none');
            myRiskBrdCrumShow.css('display', 'none');
            myIssueBrdCrumShow.css('display', 'none');
            myReleaseBrdCrumShow.css('display', 'none');
            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
            if (programOrProject[3] == 'Y') {
                RestoreFinanceChart();
                //document.getElementById('PortfolioBreadCrumbForFinance').style.cursor = "pointer";
                //document.getElementById('PortfolioBreadCrumbForFinance').onclick = RestoreFinanceChart;
            }
            else {
                document.getElementById('PortfolioBreadCrumbForFinance').style.cursor = "default";
                document.getElementById('PortfolioBreadCrumbForFinance').onclick = "";
                SetBreadCrumbForFinance(document.getElementById('idBrdScrProgName').innerHTML);
            }

        }
        if (color == 'Persons') {

            if ($scope.IsUserHasPermission(3) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', '');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myTblTeal.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myRiskBrdCrumShow.css('display', 'none');
            myIssueBrdCrumShow.css('display', 'none');
            myReleaseBrdCrumShow.css('display', 'none');

            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
            if (programOrProject[3] == 'Y') {
                document.getElementById('PortfolioBreadcrumbForResource').style.cursor = "pointer";
                document.getElementById('PortfolioBreadcrumbForResource').onclick = RestoreResourceChart;
            }
            else {
                document.getElementById('PortfolioBreadcrumbForResource').style.cursor = "default";
                document.getElementById('PortfolioBreadcrumbForResource').onclick = "";
            }
        }
        if (color == 'Risks') {

            if ($scope.IsUserHasPermission(4) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', '');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myTblTeal.css('display', 'none');

            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
            myRiskBrdCrumShow.css('display', '');
            myIssueBrdCrumShow.css('display', 'none');
            myReleaseBrdCrumShow.css('display', 'none');

            angular.element(document.getElementById('RiskItem-chart')).scope().getRiskItemTypeChart();

            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
            if (programOrProject[3] == 'Y') {
                drilldownRisk = 0;
                drillDownRiskProgramName = "";
                //angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(document.getElementById('idBrdScrProgName').innerHTML);
                //document.getElementById('PortfolioBreadcrumbForRisk').style.cursor = "pointer";
                //document.getElementById('PortfolioBreadcrumbForRisk').onclick = RestoreRiskChart;
                RestoreRiskChart();

            }
            else {
                // drilldownRisk = 1;
                SetBreadCrumbForRisk(document.getElementById('idBrdScrProgName').innerHTML);
                angular.element(document.getElementById('RiskHesto-chart')).scope().riskProgramChartData();
                angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(document.getElementById('idBrdScrProgName').innerHTML);
                document.getElementById('PortfolioBreadcrumbForRisk').style.cursor = "default";
                document.getElementById('PortfolioBreadcrumbForRisk').onclick = "";
            }
        }
        if (color == 'Issues') {

            if ($scope.IsUserHasPermission(5) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }

            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', '');
            myElYellow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myTblTeal.css('display', 'none');

            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
            myRiskBrdCrumShow.css('display', 'none');
            myIssueBrdCrumShow.css('display', '');
            myReleaseBrdCrumShow.css('display', 'none');

            //angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();
            //angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();

            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
             if (programOrProject[3] == 'Y') {
                
                drilldownIssue = 0;
                drillDownIssueProgramName = "";
                var temp = document.getElementById('IssueHesto-chart');
                // angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(document.getElementById('idBrdScrProgName').innerHTML);
                // document.getElementById('PortfolioBreadcrumbForIssue').style.cursor = "pointer";
                //document.getElementById('PortfolioBreadcrumbForIssue').onclick = RestoreIssueChart;
                RestoreIssueChart();


            } else {
                SetBreadCrumbForIssue(document.getElementById('idBrdScrProgName').innerHTML);
                angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(document.getElementById('idBrdScrProgName').innerHTML);
                angular.element(document.getElementById('IssueHesto-chart')).scope().issueProgramChartData();
                angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();
                angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();
                document.getElementById('PortfolioBreadcrumbForIssue').style.cursor = "default";
                document.getElementById('A3').style.cursor = "default";
                document.getElementById('PortfolioBreadcrumbForIssue').onclick = "";
            }

        }
        if (color == 'UndCon') {
            progDiv.css('display', 'none');
            mainDiv.css('display', '');
            myElTeal.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');
            $('#sectionID3').css("display", "block");
            $('#sectionID4').css("display", "block");

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myTblTeal.css('display', '');

            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
            myRiskBrdCrumShow.css('display', 'none');
            myIssueBrdCrumShow.css('display', 'none');
            myReleaseBrdCrumShow.css('display', '');
            GetDefaultRelease();
        }


        if (color == 'Amount') {

            if ($scope.IsUserHasPermission(2) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }

            myTblPurple.css('display', '');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', '');
            myResourceBrdCrumShow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");
            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
         
            if (programOrProject[3] == 'Y') {
                var GlobalId = (document.getElementById('hdGlobalID').value);
                if (GlobalId == 0) {

                    financeChart();
                }
                else {

                    RestoreFinanceChart();
                }
            }
            else {

                financeChart();
            }

        }
        if (color == 'Persons') {

            if ($scope.IsUserHasPermission(3) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', '');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', '');

            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
            if (programOrProject[3] == 'Y') {
                RestoreResourceChart();
                changeResourceToProjectLevel("Y", programOrProject[2]);
                resourceChart();
            }
            else {
                SetBreadCrumbForResource(document.getElementById('idBrdScrProgName').innerHTML);
                changeResourceToProjectLevel("N", document.getElementById('idBrdScrProgName').innerHTML);
                getResourceBarDataProject(document.getElementById('idBrdScrProgName').innerHTML);
                getResourceUtilizationChart();
                getResourceTypeChart("resource type");
                getResourceTypeChart("resource location");
            }
        }
        if (color == 'Risks') {

            if ($scope.IsUserHasPermission(4) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', '');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");
            //riskChart();
        }
        if (color == 'Issues') {

            if ($scope.IsUserHasPermission(5) == false) {
                alert("You do not have permission to access this module !!");
                return false;
            }

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', '');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
            $('#sectionID3').css("display", "none");
            $('#sectionID4').css("display", "none");
        }
        if ($('#divTeal').css('display') == 'block') {

            $('#sectionID1').removeClass("col-lg-6").addClass("col-lg-4");
            $('#sectionID2').removeClass("col-lg-6").addClass("col-lg-8");
           



        } else {
            $('#sectionID1').removeClass("col-lg-4").addClass("col-lg-6");
            $('#sectionID2').removeClass("col-lg-8").addClass("col-lg-6");

        }
       
    };

    $scope.ShowTable = function (color) {

        var myTblPurple = angular.element(document.querySelector('#tablePurple'));
        var myTblBlue = angular.element(document.querySelector('#tableBlue'));
        var myTblAqua = angular.element(document.querySelector('#tableAqua'));
        var myTblRed = angular.element(document.querySelector('#tableRed'));
        var myTblYellow = angular.element(document.querySelector('#tableYellow'));

        if (color == 'Purple') {
            myTblPurple.css('display', '');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', '');
            myResourceBrdCrumShow.css('display', 'none');
        }
        if (color == 'Blue') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', '');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', '');
        }
        if (color == 'Aqua') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', '');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
        }
        if (color == 'Red') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', '');
            myTblYellow.css('display', 'none');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
        }
        if (color == 'Yellow') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', '');
            myFinanceBrdCrumShow.css('display', 'none');
            myResourceBrdCrumShow.css('display', 'none');
        }

    };

    $scope.ZoomOut = function (value) {
        if (value == '1') {
            document.getElementById("ProjectPNG").style.width = '100px';
            document.getElementById("ProjectPNG").style.height = '50px';
        }
        if (value == '2') {
            document.getElementById("FinancePNG").style.width = '100px';
            document.getElementById("FinancePNG").style.height = '50px';
        }
        if (value == '3') {
            document.getElementById("MemberPNG").style.width = '100px';
            document.getElementById("MemberPNG").style.height = '50px';
        }
        if (value == '4') {
            document.getElementById("RiskPNG").style.width = '100px';
            document.getElementById("RiskPNG").style.height = '50px';
        }
        if (value == '5') {
            document.getElementById("IssuePNG").style.width = '100px';
            document.getElementById("IssuePNG").style.height = '50px';
        }
        if (value == '6') {
            document.getElementById("ProjectPNG").style.width = '100px';
            document.getElementById("ProjectPNG").style.height = '50px';
        }
    };

    $scope.ZoomIn = function (value) {
        if (value == '1') {
            document.getElementById("ProjectPNG").style.width = '41px';
            document.getElementById("ProjectPNG").style.height = '42px';
        }
        if (value == '2') {
            document.getElementById("FinancePNG").style.width = '46px';
            document.getElementById("FinancePNG").style.height = '43px';
        }
        if (value == '3') {
            document.getElementById("MemberPNG").style.width = '49px';
            document.getElementById("MemberPNG").style.height = '24px';
        }
        if (value == '4') {
            document.getElementById("RiskPNG").style.width = '51px';
            document.getElementById("RiskPNG").style.height = '45px';
        }
        if (value == '5') {
            document.getElementById("IssuePNG").style.width = '51px';
            document.getElementById("IssuePNG").style.height = '46px';
        }
        if (value == '6') {
            document.getElementById("ProjectPNG").style.width = '41px';
            document.getElementById("ProjectPNG").style.height = '42px';
        }
    };


    var id = $("#hdGlobalID").val();
    SetFinanceDataForHeader(id);

    $scope.IsUserHasPermission = function (moduleId) {
        var isAuthorised = true;
        $.each(arrModPermission, function (indx, itm) {
            isAuthorised = false;
            if (itm.ModuleID == moduleId)
            {
                isAuthorised = true;
                return false;
            }

        });

        return isAuthorised;
    }

});

app.controller('dataProgram', ['$rootScope','$scope', '$http', 'HeaderTilesSrv', 'ProgrammeSrv', function ( $rootScope,$scope, $http, HeaderTilesSrv, ProgrammeSrv) {

    var statusFlag = document.getElementById('statusProgramOrProject').value;
    var id = document.getElementById('programid').value;
    $scope.getProgramHeader = function (id) {
    ProgrammeSrv.getProgramByUserID(id).then(function (successresponse) {
        
        $scope.programValue = successresponse;
        $scope.totalCount = successresponse.length;
        if (id == 0) {
            $scope.name = 'Program';
        }
        else
        {
            $scope.name = 'Project';
        }
        $scope.changeBrdScrName('Program');
        $.each(successresponse, function (i, item) {
            riskPrgListDrpdwn.push({ "PID": item.Program_Id, "PName": item.Program_Name });
        });

        //  var fxn = riskGetPrg(null, 'random', 0,list);
        //riskPrg(list);

    });
    /*
       
        // 
       
        $http.get("api/program/GetAllProgram/" + id)
        //$http.get("http://172.18.66.83:8080/api/program/")
                 .success(function (response) {
                     $scope.programValue = response;
                     $scope.totalCount = $scope.programValue.length;
                     $scope.name = 'Program';
                     $scope.changeBrdScrName('Program');
                     //angular.forEach($scope.programValue, function (value, key) {
                     //    $scope.totalCount = value.Program_Id + 1;
                     //});
    
                 })
                 .error(function (execption, ab, er) {
                 });
        */


    var gB = 0, rB = 0, yB = 0, totPers = 0;
    var percentageGreen = 0, percentageRed = 0, percentageYellow = 0;

   


    /*
        $http.get("api/weeklystatus")
        //$http.get("http://172.18.66.83:8080/api/weeklystatus")
                 .success(function (response) {
                     $scope.barValue = response;
                     $scope.criticalIssues = response.length;
    
                     angular.forEach($scope.barValue, function (value, key) {
                         if (value.Program_Id.toString().trim() != '0' && value.WEEKSTATUS == 'CurrentWeek') {
                             if (value.Status.toString().trim() == 'G') {
                                 gB++;
                                 //gB = gB + 1;
                                 //$scope.greenBar++;
                             }
                             if (value.Status.toString().trim() == 'R') {
                                 rB++;
                                 //rB = rB + 1;
                                 //$scope.redBar++;
                             }
                             if (value.Status.toString().trim() == 'Y') {
                                 yB++;
                                 //yB = yB + 1;
                                 //$scope.yellowBar++;
                             }
                         }
                     });
    
                     percentageGreen = gB * 100 / (gB + rB + yB);
                     percentageRed = rB * 100 / (gB + rB + yB);
                     percentageYellow = yB * 100 / (gB + rB + yB);
    
                     $scope.greenBar = Math.round(percentageGreen);
                     $scope.redBar = Math.round(percentageRed);
                     $scope.yellowBar = Math.round(percentageYellow);
    
                     var tmp = {}
                     response.forEach(function (row) {
                         if (!tmp[row.Resource_Id]) {
                             tmp[row.Resource_Id] = {
                                 Resource_Id: row.Resource_Id
    
                             };
                             totPers++;
                         }
                         if (!tmp[row.Resource_Id]) {
                             tmp[row.Resource_Id] = 0;
                         }
                         tmp[row.equipmentType] += row.count;
                     });
    
                     $scope.totalPersons = totPers;
    
                 })
                 .error(function (execption, ab, er) {
                 });
        */
    $scope.OpenProjects = function (statusFlg, programId) {

    

        if (statusFlg == 'Y') {
            /*    var totalProjects = 0;
                idList = [];
                personList = [];
                issueList = [];
                riskList = [];
                //  alert("Drilled Down = " + programId);
                //  $http.get("api/project/")
                $http.get("api/program/GetAllProgram/" + programId)
                         .success(function (response) {
                             console.log("heder = " + response);
                             $scope.projectValue = response;
                             //$scope.totalCount = $scope.projectValue.length;
    
                             response.forEach(function (row) {
                                 if (row.Parent_Id == programId) {
                                     //
    
                                     // alert("Project Count = " + totalProjects);
                                     totalProjects++;
                                 }
                             })
                             $scope.totalCount = totalProjects;
                             $scope.name = 'Project';
                             changeName();
                             $scope.changeBrdScrName('Project');
    
                             response.forEach(function (row) {
                                 if (row.Parent_Id == programId) {
                                     idList.push({ "Project_Id": row.Program_Id });
                                 }
                                 //alert(item.Program_Name);
                             })
                             //angular.forEach($scope.programValue, function (value, key) {
                             //    $scope.totalCount = value.Program_Id + 1;
                             //});
    
                         })
                         .error(function (execption, ab, er) {
                         });
                */
            /*   var gB = 0, rB = 0, yB = 0, totPers = 0;
               var percentageGreen = 0, percentageRed = 0, percentageYellow = 0;
   
               $http.get("api/weeklystatus")
               //$http.get("http://172.18.66.83:8080/api/weeklystatus")
                        .success(function (response) {
                            $scope.barValue = response;
                            $scope.criticalIssues = response.length;
                            idList.forEach(function (row) {
                                angular.forEach($scope.barValue, function (value, key) {
                                    if (row.Project_Id == value.Project_Id) {
                                        personList.push({ "Person_Id": value.Resource_Id });
                                        if (value.keyIssues != null) {
                                            issueList.push({ "Issues": value.keyIssues });
                                        }
                                        if (value.Status.toString().trim() == 'G' && value.WEEKSTATUS == 'CurrentWeek') {
                                            gB++;
                                            //gB = gB + 1;
                                            //$scope.greenBar++;
                                        }
                                        if (value.Status.toString().trim() == 'R' && value.WEEKSTATUS == 'CurrentWeek') {
                                            rB++;
                                            //rB = rB + 1;
                                            //$scope.redBar++;
                                        }
                                        if (value.Status.toString().trim() == 'Y' && value.WEEKSTATUS == 'CurrentWeek') {
                                            yB++;
                                            //yB = yB + 1;
                                            //$scope.yellowBar++;
                                        }
                                    }
                                });
                            })
                            percentageGreen = gB * 100 / (gB + rB + yB);
                            percentageRed = rB * 100 / (gB + rB + yB);
                            percentageYellow = yB * 100 / (gB + rB + yB);
   
                            $scope.greenBar = Math.round(percentageGreen);
                            $scope.redBar = Math.round(percentageRed);
                            $scope.yellowBar = Math.round(percentageYellow);
   
                            //$scope.greenBar = Math.round(percentageGreen);
                            //$scope.redBar = Math.round(percentageRed);
                            //$scope.yellowBar = Math.round(percentageYellow);
   
   
                            var tmp = {}
                            personList.forEach(function (row) {
                                if (!tmp[row.Person_Id]) {
                                    tmp[row.Person_Id] = {
                                        Resource_Id: row.Person_Id
   
                                    };
                                    totPers++;
                                }
                                if (!tmp[row.Person_Id]) {
                                    tmp[row.Person_Id] = 0;
                                }
                                tmp[row.equipmentType] += row.count;
                            });
   
                            $scope.totalPersons = totPers;
                            $scope.criticalIssues = issueList.length;
   
                        })
                        .error(function (execption, ab, er) {
                        });
               */

            $http.get("api/risk")
            //$http.get("http://172.18.66.83:8080/api/risk")
                      .success(function (response) {
                          $scope.riskValue = response;
                          //$scope.riskCount = $scope.riskValue.length;

                          idList.forEach(function (row) {
                              angular.forEach($scope.riskValue, function (value, key) {
                                  if (row.Project_Id == value.Project) {

                                      if (value.RiskStatus == 'Active') {
                                          riskList.push({ "Risks": value.RiskTitle });
                                      }

                                  }
                              });
                          })
                          $scope.riskCount = riskList.length;

                      })
                      .error(function (execption, ab, er) {
                      });
        }
    };

    $scope.nameChange = function () {
        $scope.name = 'Project';
    };

    $scope.changeBrdScrName = function (pro) {
        if (pro == 'Program') {
            //var statusFlag = document.getElementById('statusProgramOrProject').value;
            //var id = document.getElementById('programid').value;
            if (document.getElementById('header').getElementsByTagName('h4')[0] != undefined) {
                var nameofProgram = document.getElementById('header').getElementsByTagName('h4')[0].innerText.toString().trim();
                angular.element(document.getElementById('idBrdScrProgName')).css('display', '');
                $scope.nameofprogram = nameofProgram;
            }

        }
        if (pro == 'Project') {
            var nameOfProject = document.getElementById('header').getElementsByTagName('h4')[0].innerText.toString().trim();
            var nameOfProgram = document.getElementById('idBrdScrProgName').innerHTML.toString().trim();
            //angular.element(document.getElementById('idBrdScrProgName')).css('display', 'none');
            angular.element(document.getElementById('idBrdScrProj')).css('display', '');
            angular.element(document.getElementById('idBrdScrProjName')).css('display', '');
            //$scope.nameofproject = nameOfProject;
            document.getElementById('idBrdScrProjName').innerHTML = nameOfProject;
        }
    };

    $scope.cngPrgrsBar = function (statusFlg, programId) {
     
        $scope.helperMethods.BindRGYProgressBar();
        /*    if (statusFlg == 'Y') {
    
                var gB = 0, rB = 0, yB = 0, totPers = 0;
                var percentageGreen = 0, percentageRed = 0, percentageYellow = 0;
    
                $http.get("api/weeklystatus")
                //$http.get("http://172.18.66.83:8080/api/weeklystatus")
                         .success(function (response) {
                             $scope.barValue = response;
    
                             angular.forEach($scope.barValue, function (value, key) {
                                 if (value.Program_Id.toString().trim() != '0' && value.WEEKSTATUS == 'CurrentWeek') {
                                     if (value.Status.toString().trim() == 'G') {
                                         gB++;
                                         //gB = gB + 1;
                                         //$scope.greenBar++;
                                     }
                                     if (value.Status.toString().trim() == 'R') {
                                         rB++;
                                         //rB = rB + 1;
                                         //$scope.redBar++;
                                     }
                                     if (value.Status.toString().trim() == 'Y') {
                                         yB++;
                                         //yB = yB + 1;
                                         //$scope.yellowBar++;
                                     }
                                 }
                             });
    
                             percentageGreen = gB * 100 / (gB + rB + yB);
                             percentageRed = rB * 100 / (gB + rB + yB);
                             percentageYellow = yB * 100 / (gB + rB + yB);
    
                             $scope.greenBar = Math.round(percentageGreen);
                             $scope.redBar = Math.round(percentageRed);
                             $scope.yellowBar = Math.round(percentageYellow);
    
                         })
                         .error(function (execption, ab, er) {
                         });
            }
    
            if (statusFlg == 'N') {
                var totalProjects = 0;
                idList = [];
                personList = [];
                issueList = [];
                riskList = [];
    
                $http.get("api/project/" + programId)
                //$http.get("http://172.18.66.83:8080/api/project/" + programId)
                         .success(function (response) {
    
                             var idProgram = response['Program_Id'];
    
                             $http.get("api/project/")
                             //$http.get("http://172.18.66.83:8080/api/project/")
                            .success(function (response) {
    
                                response.forEach(function (row) {
                                    if (row.Program_Id == idProgram) {
                                        idList.push({ "Project_Id": row.Project_Id });
                                    }
                                })
    
                                $scope.cngPrgrBarProject(idList);
    
                            })
                         .error(function (execption, ab, er) {
                         });
    
                         })
                         .error(function (execption, ab, er) {
                         });
    
    
    
            } */
    };

    $scope.cngPrgrBarProject = function (list) {


        /*  var idList = list;
        var gB = 0, rB = 0, yB = 0, totPers = 0;
        var percentageGreen = 0, percentageRed = 0, percentageYellow = 0;

        $http.get("api/weeklystatus")
        //$http.get("http://172.18.66.83:8080/api/weeklystatus")
                 .success(function (response) {
                     $scope.barValue = response;
                     $scope.criticalIssues = response.length;
                     idList.forEach(function (row) {
                         angular.forEach($scope.barValue, function (value, key) {
                             if (row.Project_Id == value.Project_Id) {
                                 personList.push({ "Person_Id": value.Resource_Id });
                                 if (value.keyIssues != null) {
                                     issueList.push({ "Issues": value.keyIssues });
                                 }
                                 if (value.Status.toString().trim() == 'G' && value.WEEKSTATUS == 'CurrentWeek') {
                                     gB++;
                                     //gB = gB + 1;
                                     //$scope.greenBar++;
                                 }
                                 if (value.Status.toString().trim() == 'R' && value.WEEKSTATUS == 'CurrentWeek') {
                                     rB++;
                                     //rB = rB + 1;
                                     //$scope.redBar++;
                                 }
                                 if (value.Status.toString().trim() == 'Y' && value.WEEKSTATUS == 'CurrentWeek') {
                                     yB++;
                                     //yB = yB + 1;
                                     //$scope.yellowBar++;
                                 }
                             }
                         });
                     })
                     percentageGreen = gB * 100 / (gB + rB + yB);
                     percentageRed = rB * 100 / (gB + rB + yB);
                     percentageYellow = yB * 100 / (gB + rB + yB);

                     $scope.greenBar = Math.round(percentageGreen);
                     $scope.redBar = Math.round(percentageRed);
                     $scope.yellowBar = Math.round(percentageYellow);

                 })
                 .error(function (execption, ab, er) {
                 });
        */
    }

    $scope.helperMethods = {

        GetResourceCount: function () {
            HeaderTilesSrv.getResourceCount().then(function (successResponse) {
                $scope.Models.ResourceCount = successResponse.ResourceCount;
            }, function (failureResponse) {

            });

        },
        GetRiskCount: function () {
            HeaderTilesSrv.getRiskCount().then(function (successResponse) {
                $scope.Models.RiskCount = successResponse.RiskCount;
            }, function (failureResponse) {

            });

        },
        GetIssueCount: function () {
            HeaderTilesSrv.getIssueCount().then(function (successResponse) {
                $scope.Models.IssueCount = successResponse.IssueCount;
            }, function (failureResponse) {

            });

        },

        BindRGYProgressBar: function ()
        {

            percentageGreen = 0; percentageRed = 0; percentageYellow = 0;
            gB = 0; rB = 0; yB = 0;
            var ProWeek = ProgrammeSrv.getWeeklyStausByUserName();
            
            ProWeek.then(function (sucessResponse) {
              
                $.each(sucessResponse, function (key, value) {
                
                    if ($rootScope.EntityLevel == "0") {
                      
                    
                        if (value.Program_Id.toString().trim() != '0' && value.WEEKSTATUS == 'CurrentWeek') {

                           
                            if (value.Status.toString().trim() == 'G') {
                                gB++;
                                //gB = gB + 1;
                                //$scope.greenBar++;
                            }
                            if (value.Status.toString().trim() == 'R') {
                                rB++;
                                //rB = rB + 1;
                                //$scope.redBar++;
                            }
                            if (value.Status.toString().trim() == 'Y') {
                                yB++;
                                //yB = yB + 1;
                                //$scope.yellowBar++;
                            }
                      
                         //   alert("values="+gB+','+rB+','+yB);
                        }
                    }
                    else {

                        if (value.Project_Id.toString().trim() != '0' && value.WEEKSTATUS == 'CurrentWeek') {
                        
                            if (value.Status.toString().trim() == 'G') {
                                gB++;
                                //gB = gB + 1;
                                //$scope.greenBar++;
                            }
                            if (value.Status.toString().trim() == 'R') {
                                rB++;
                                //rB = rB + 1;
                                //$scope.redBar++;
                            }
                            if (value.Status.toString().trim() == 'Y') {
                                yB++;
                                //yB = yB + 1;
                                //$scope.yellowBar++;
                            }
                           
                        }

            

                    }
                  
                });
                
                percentageGreen = gB * 100 / (gB + rB + yB);
                percentageRed = rB * 100 / (gB + rB + yB);
                percentageYellow = yB * 100 / (gB + rB + yB);

                var TotalPerc=(Math.round(percentageGreen) + Math.round(percentageRed) + Math.round(percentageYellow));

                $scope.greenBar = Math.round(percentageGreen);
                $scope.redBar = Math.round(percentageRed);

                if (TotalPerc == 100) {
                    $scope.yellowBar = Math.round(percentageYellow);
                }
                else { $scope.yellowBar = 100 - (Math.round(percentageGreen) + Math.round(percentageRed)) }
               
               


            }, function (errorResponse) {
                
                console.log("Database Error in HeaderController >> BindRGYProgressBar()");
            });

        }

    }

    $scope.Models = {

        ResourceCount: "0",
        RiskCount: "0",
        IssueCount: "0"
    }

    $scope.$on('handleBroadcast', function (event, args) {

        $scope.helperMethods.GetResourceCount();
        $scope.helperMethods.GetRiskCount();
        $scope.helperMethods.GetIssueCount();
        
    });

    //   $scope.helperMethods.BindRGYProgressBar();

    $scope.$on('handleBroadcast', function (event, args) {

        $scope.helperMethods.BindRGYProgressBar();

    });

}

}]);