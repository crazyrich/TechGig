
app.controller('NavigationController', function ($scope) {

    $scope.changeview = function (color) {
        var progDiv = angular.element(document.querySelector('#ProgramDiv'));
        var mainDiv = angular.element(document.querySelector('#tablesandcharts'));

        var myElTeal = angular.element(document.querySelector('#divUnderConstruction'));

        var myElPurple = angular.element(document.querySelector('#divPurple'));
        var myElBlue = angular.element(document.querySelector('#divBlue'));
        var myElAqua = angular.element(document.querySelector('#divAqua'));
        var myElRed = angular.element(document.querySelector('#divRed'));
        var myElYellow = angular.element(document.querySelector('#divYellow'));


        var myTblPurple = angular.element(document.querySelector('#tablePurple'));
        var myTblBlue = angular.element(document.querySelector('#tableBlue'));
        var myTblAqua = angular.element(document.querySelector('#tableAqua'));
        var myTblRed = angular.element(document.querySelector('#tableRed'));
        var myTblYellow = angular.element(document.querySelector('#tableYellow'));

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
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', '');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Persons') {
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', '');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Risks') {
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', '');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Issues') {
            progDiv.css('display', 'none');
            myElTeal.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', '');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
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

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }


        if (color == 'Amount') {
            myTblPurple.css('display', '');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Persons') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', '');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Risks') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', '');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Issues') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', '');
            myTblYellow.css('display', 'none');
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
        }
        if (color == 'Blue') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', '');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Aqua') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', '');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Red') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', '');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Yellow') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', '');
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

});


app.controller('dataProgram', function ($scope, $http) {
    alert("data programme = ")
    var statusFlag = document.getElementById('statusProgramOrProject').value;
    var id = document.getElementById('programid').value;

    $http.get("api/program/")
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

    var gB = 0, rB = 0, yB = 0, totPers = 0;
    var percentageGreen = 0, percentageRed = 0, percentageYellow = 0;

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

                 $scope.greenBar = percentageGreen;
                 $scope.redBar = percentageRed;
                 $scope.yellowBar = percentageYellow;

                 //$scope.greenBar = Math.round(percentageGreen);
                 //$scope.redBar = Math.round(percentageRed);
                 //$scope.yellowBar = Math.round(percentageYellow);


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

    $http.get("api/risk")
    //$http.get("http://172.18.66.83:8080/api/risk")
              .success(function (response) {
                  $scope.riskValue = response;
                  $scope.riskCount = $scope.riskValue.length;

              })
              .error(function (execption, ab, er) {
              });

    $scope.OpenProjects = function (statusFlg, programId) {
        alert("Open Project = " + programId)
        if (statusFlg == 'Y') {
            var totalProjects = 0;
            idList = [];
            personList = [];
            issueList = [];
            riskList = [];

            $http.get("api/project/")
            //$http.get("http://172.18.66.83:8080/api/project/")
                     .success(function (response) {
                         $scope.projectValue = response;
                         //$scope.totalCount = $scope.projectValue.length;

                         response.forEach(function (row) {
                             if (row.Program_Id == programId) {
                                 totalProjects++;
                             }
                         })
                         $scope.totalCount = totalProjects;
                         $scope.name = 'Project';
                         changeName();
                         $scope.changeBrdScrName('Project');

                         response.forEach(function (row) {
                             if (row.Program_Id == programId) {
                                 idList.push({ "Project_Id": row.Project_Id });
                             }
                             //alert(item.Program_Name);
                         })
                         //angular.forEach($scope.programValue, function (value, key) {
                         //    $scope.totalCount = value.Program_Id + 1;
                         //});

                     })
                     .error(function (execption, ab, er) {
                     });

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

                         $scope.greenBar = percentageGreen;
                         $scope.redBar = percentageRed;
                         $scope.yellowBar = percentageYellow;

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

            $http.get("api/risk")
            $http.get("http://172.18.66.83:8080/api/risk")
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

            //var nameofProgram = document.getElementById('header').getElementsByTagName('h4')[0].innerText.toString().trim();
            var nameofProgram = $("#header").find('h4').html();
            angular.element(document.getElementById('idBrdScrProgName')).css('display', '');
            $scope.nameofprogram = nameofProgram;

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

        if (statusFlg == 'Y') {

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

                         $scope.greenBar = percentageGreen;
                         $scope.redBar = percentageRed;
                         $scope.yellowBar = percentageYellow;

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



        }
    };

    $scope.cngPrgrBarProject = function (list) {
        var idList = list;
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

                     $scope.greenBar = percentageGreen;
                     $scope.redBar = percentageRed;
                     $scope.yellowBar = percentageYellow;

                 })
                 .error(function (execption, ab, er) {
                 });
    }


});


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



app.controller('shareData', ['$scope', '$http', 'dataService', function ($scope, $http, dataService) {
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
