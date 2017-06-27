app.controller('Hover', function ($scope) {
    $scope.DoIt = function (tileNumber) {
        /*
        if (tileNumber == '1') {
            document.getElementById("myBtn").style.backgroundColor = 'gray';
            document.getElementById("myBtn").style.padding = '5px';
        }
        if (tileNumber == '2') {
            document.getElementById("myBtn2").style.backgroundColor = 'gray';
            document.getElementById("myBtn2").style.padding = '5px';
        }
        if (tileNumber == '3') {
            document.getElementById("myBtn3").style.backgroundColor = 'gray';
            document.getElementById("myBtn3").style.padding = '5px';
        }*/

    };

    $scope.UnDoIt = function (tileNumber) {
        /*
        if (tileNumber == '1') {
            document.getElementById("myBtn").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn").style.padding = '0px';
        }
        if (tileNumber == '2') {
            document.getElementById("myBtn2").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn3").style.padding = '0px';
        }
        if (tileNumber == '3') {
            document.getElementById("myBtn3").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn3").style.padding = '0px';
        }*/
    };


});

app.controller('tilesData', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $scope.getElementID = function () {
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var prgid = hdnFieldValueForProject[2];
        var wid = document.getElementById('weeklyStatusID').value;
        var stsFlg = document.getElementById('statusProgramOrProject').value;
        $scope.ViewModels.listComments = "";
        $scope.value = [];
        $scope.comments = "";
        $scope.ViewModels.listComments = "";
        $scope.comments = "";
        if (stsFlg == 'Y') {
            $http.get("api/weeklystatus/GetWeeklystatus/" + wid)
            //$http.get("http://172.18.66.83:8080/api/weeklystatus/" + id)
            //$http.get("http://172.18.66.83:8080/api/weeklystatus")
             .success(function (response) {
                 $scope.keyIssues = "";
                 $scope.comments = "";
                 $scope.keyIssues = response;
                 $scope.comments = response;
                 $scope.ViewModels.listComments = response.Comments;
             })
             .error(function (execption, ab, er) {
             });
            var person = JSON.parse(localStorage.getItem('LoginUser'));
            $http.get("api/risk/GetRiskForUser?programid=0&userid=" + person.UserName)
            //$http.get("http://172.18.66.83:8080/api/risk/" + id)
            //$http.get("http://172.18.66.83:8080/api/risk")
                     .success(function (response) {
                         $scope.riskValue = response;

                         //angular.forEach($scope.riskValue, function (value, key)
                         //{
                         //    if (value.RiskStatus.toString().trim() == 'Active') {
                         //        $scope.value.data.push(value);
                         //    }
                         //});

                         //$scope.value;
                         var newJsonData = [];
                         //response.forEach(function (row) {
                         //    if (row.RiskStatus.toString().trim() == 'Active') {

                         //        newJsonData.push(row);
                         //    }
                         //})

                         angular.forEach($scope.riskValue, function (value, key) {
                             //if (value.RiskStatus.toString().trim() == 'Active') {
                             //newJsonData.push(value);
                             //}
                         });

                         //$scope.value = newJsonData;
                         var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
                         $.each(response, function (indx, item) {
                             if (hdnFieldValueForProject[2] == item.Program_ID)
                                 $scope.value.push({ "RiskTitle": item.RiskTitle,"Description":item.Description });
                         });
                     })
                     .error(function (execption, ab, er) {
                     });

        }
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var id = 0;
        if (hdnFieldValueForProject[3] == 'Y') {
            id = 0;
        }
        else {
            id = hdnFieldValueForProject[4];
        }

        var url_api = "api/Issue/GetIssueForUser?programid=" + id + "&userid=" + person.UserName;
        $http.get(url_api)

         .success(function (response) {
             $scope.IssuesForTile = [];
             $.each(response, function (indx, item) {
                 if (hdnFieldValueForProject[3] == 'Y') {
                     if (item.ProgramID == hdnFieldValueForProject[2])
                         $scope.IssuesForTile.push({ "IssueTitle": item.IssueTitle });
                 }
                 else {
                     if (item.ProjectID == hdnFieldValueForProject[2])
                         $scope.IssuesForTile.push({ "IssueTitle": item.IssueTitle });
                 }


             });

         })
         .error(function (execption, ab, er) {
         });


        if (stsFlg == 'N') {
            idList = [];
            personList = [];
            issueList = [];
            riskList = [];

            // $http.get("api/project/")
            //$http.get("http://172.18.66.83:8080/api/project/")
            var ID = $("#programid").val();

            $http.get("api/program/GetAllProgram/" + ID)
                     .success(function (response) {
                         //$scope.projectValue = response;
                         //$scope.totalCount = $scope.projectValue.length;
                         //response.forEach(function (row) {
                         //    if (row.Program_Id == programId) {
                         //        totalProjects++;
                         //    }
                         //})
                         //$scope.totalCount = totalProjects;
                         //$scope.name = 'Projects';

                         response.forEach(function (row) {
                             if (row.Program_Id == programId) {
                                 idList.push({ "Project_Id": row.Project_Id });
                             }
                         })
                         //angular.forEach($scope.programValue, function (value, key) {
                         //    $scope.totalCount = value.Program_Id + 1;
                         //});

                     })
                     .error(function (execption, ab, er) {
                     });


            $http.get("api/weeklystatus/GetWeeklystatus/" + wid)
            //$http.get("http://172.18.66.83:8080/api/weeklystatus/" + id)
            //$http.get("http://172.18.66.83:8080/api/weeklystatus")
                     .success(function (response) {
                         $scope.keyIssues = "";
                         $scope.comments = "";
                         $scope.ViewModels.listComments = "";
                         $scope.keyIssues = response;
                         $scope.comments = response;
                         $scope.ViewModels.listComments = response.Comments;
                     })
                     .error(function (execption, ab, er) {
                     });

            var person = JSON.parse(localStorage.getItem('LoginUser'));
            $http.get("api/risk/GetRiskForUser?programid=0&userid=" + person.UserName)
            //$http.get("http://172.18.66.83:8080/api/risk/" + id)
            //$http.get("http://172.18.66.83:8080/api/risk")
                     .success(function (response) {
                         $scope.riskValue = response;

                         //angular.forEach($scope.riskValue, function (value, key)
                         //{
                         //    if (value.RiskStatus.toString().trim() == 'Active') {
                         //        $scope.value.data.push(value);
                         //    }
                         //});

                         //$scope.value;
                         var newJsonData = [];
                         //response.forEach(function (row) {
                         //    if (row.RiskStatus.toString().trim() == 'Active') {

                         //        newJsonData.push(row);
                         //    }
                         //})

                         angular.forEach($scope.riskValue, function (value, key) {
                             //if (value.RiskStatus.toString().trim() == 'Active') {
                             //newJsonData.push(value);
                             //}
                         });

                         //$scope.value = newJsonData;
                         //$scope.value = response;
                         var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
                         $.each(response, function (indx, item) {
                             if (hdnFieldValueForProject[2] == item.ProjectID)
                                 $scope.value.push({ "RiskTitle": item.RiskTitle, "Description": item.Description });
                         });

                     })
                     .error(function (execption, ab, er) {
                     });
        }


    };

    $scope.ViewModels = {

        listComments: ""

    }
    $scope.SaveComments = function (myAry) {
        var WeeklyStatusId = document.getElementById('weeklyStatusID').value;
        var programId = 0;
        var projectId = 0;
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var id = 0;
        if (hdnFieldValueForProject[3] == 'Y') {
            programId = document.getElementById('programid').value;;
        }
        else {
            projectId = document.getElementById('programid').value;;
        }
        var temp = null;
        for (i = 0; i < myAry.length; i++) {
            //temp = temp + myAry[i];
            //}
            var Weeklystatus = {
                WeeklyStatus_Id: WeeklyStatusId,
                Comments: myAry[i],
                Program_Id: programId,
                project_id: projectId

            };
            var stringData = JSON.stringify(Weeklystatus);
            //var urlString = "http://172.18.66.83:8080/api/WeeklyComments/";
            var urlString = "api/WeeklyComments/";

            $.ajax({
                url: urlString,
                type: "PUT",
                data: stringData,
                dataType: 'json',
                contentType: "application/json;charset=utf-8",
                success: function (result) {
                    //change the comment name on tile dynamically on save.
                    //  $scope.getIndividualData();
                    document.getElementById('weeklyStatusID').value = result;
                    angular.element(document.getElementById('dvBtmComments')).scope().HelperMethods.GetComments(result);

                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    //$("#txtResult").val(err.Message)
                }
            });
            $scope.ViewModels.listComments = "";
        }


    };

    $scope.getCommnets = function () {

        var person = JSON.parse(localStorage.getItem('LoginUser'));
        //var id = document.getElementById('programid').value;
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var id = 0;
        if (hdnFieldValueForProject[3] == 'Y') {
            id = 0;
        }
        else {
            id = hdnFieldValueForProject[4];
        }
        var url_api = "api/weeklystatus/GetAllWeeklystatus?PID=" + id + "&userid=" + person.UserName;

        $http.get(url_api)
                    .success(function (response) {
                        // $scope.keyIssues = response;
                        $scope.comments = "";
                        $scope.comments = response;

                        $.each(response, function (indx, item) {
                            if (item.Program_Id == id && $rootScope.EntityLevel == "0") {
                                $scope.ViewModels.listComments = "";
                                $scope.ViewModels.listComments = item.Comments;
                            }

                            if (item.Project_Id == id && $rootScope.EntityLevel == "1") {
                                $scope.ViewModels.listComments = "";
                                $scope.ViewModels.listComments = item.Comments;
                            }
                        });

                    })
                    .error(function (execption, ab, er) {
                        //alert("Error in comments ");
                    });


    }


    $scope.$on('handleBroadcast', function (event, args) {

        $scope.getCommnets();

    });

}]);


app.controller('BottomCommentsController', ['$scope', '$http', 'ProgrammeSrv', function ($scope, $http, ProgrammeSrv) {

    $scope.HelperMethods = {

        GetComments: function (PID) {

            {
                ProgrammeSrv.getKeyAccomplishment(PID).then(function (successResponse) {
                    $scope.ViewModels.Comments = "";
                    $scope.ViewModels.Comments = successResponse.Comments;
                }, function (failureResponse) {
                    alert("Unexcpected error occured in BottomCommentsController => GetComments();  !!")
                });

            }

        }



    }



    $scope.ViewModels = {

        Comments: ""
    }

    $scope.$on('handleBroadcast', function (event, args) {

        $scope.HelperMethods.GetComments(document.getElementById('weeklyStatusID').value);


    });

}]);