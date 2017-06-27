
angular.module('myApp').controller('chemCtrl', ['$rootScope', '$scope', '$http', 'ProgrammeSrv', 'BreadCrumbSrv', 'MileStoneSrv', function ($rootScope, $scope, $http, ProgrammeSrv, BreadCrumbSrv, MileStoneSrv) {

    $scope.pageNumber = 0;
    $scope.counter = 0;

    var person = JSON.parse(localStorage.getItem('LoginUser'));
    if (person != null)
    {
        $("#guestName").html(person.UserName);
        if (person.RoleName == 'SuperAdmin') {
            $("#AdminBtn").show();
            document.getElementById("adminLinkView").style.display = "block";
        }
        else {
          
            $("#AdminBtn").hide();
            document.getElementById("adminLinkView").style.display = "none";
        }
    }

    var ID = $("#programid").val();

    $rootScope.GlobalId = ID;  // Mukesh 1
    
    var List = [];
    getEditPermissionList(person);

    $scope.models = {
        userid:undefined
    }

    $scope.uiEvents = {
        test: function () {
            //  alert("success !!");
        }
    }

    $scope.viewModel = {
        ListData:[],
    }

    $scope.methods = {

        doubleclick: function (programid, status) {
            $("#hdGlobalID").val(programid);
            $rootScope.SelectedProgram = programid;// $scope.viewModel.Listdata[$scope.pageNumber];
            $rootScope.EntityLevel = "1";
            $rootScope.GlobalId = programid;
            // $scope.helperMethods.BindLeftPanal(programid);
         
           
        },
        // end doubleclick
        setPageNumber: function (index, progOrProjectName, id, status, projectID, weeklystatusID) {
            //var deferred = $.Deferred();
            if ($("#hdGlobalID").val()==0) {
                document.getElementById("spanDashboard").innerHTML = "";
                document.getElementById("spanDashboard").innerHTML = "Portfolio DashBoard";
                angular.element(document.getElementById('headerBar')).scope().getProgramHeader($("#hdGlobalID").val());
            }
            else
            {
                document.getElementById("spanDashboard").innerHTML = "";
                document.getElementById("spanDashboard").innerHTML = document.getElementById('idBrdScrProgName').innerHTML + " Project DashBoard";
                angular.element(document.getElementById('headerBar')).scope().getProgramHeader($("#hdGlobalID").val());
            }
           
            document.getElementById('statusProgramOrProject').value = status;
            $scope.pageNumber = index;
           
            document.getElementById('programid').value = id;
            status = (status != "N") ? "Y" : "N";
			
            var EditPermission='';

            var PermissionList = $rootScope.EditPermissionList;
		
            $.each(PermissionList, function (i, item) {
                if(item.PID==id)
                {
                    EditPermission=item.EditPermission;
                }               
            });



            document.getElementById('hdSetpageindex').value = index + ',' + progOrProjectName + ',' + id + ',' + status + ',' + $("#hdGlobalID").val() + ',' + weeklystatusID + ',' + EditPermission;
            //toupdate finance header
            SetFinanceDataForHeader($("#hdGlobalID").val());
            if (projectID == "undefined") {
                projectID = '0';
            }
            document.getElementById('milestone').value = projectID;
            document.getElementById('weeklyStatusID').value = weeklystatusID;
            //  $("#programid").val();
            //deferred.resolve();
            //return deferred.promise();

            $scope.helperMethods.BindTimeLineData();
            var flag = false;
            $.each(PermissionList, function (i, item) {
                if (item.EditPermission == 'Y') {
                    flag = true;
                }
            });
            if (flag == false)
            { EditPermission = 'Z'; }

            MakeEditVisible(EditPermission);
        } // end set page number

    }// end method

  

    $scope.helperMethods = {
        test: function () {

        },
        BindLeftPanal: function (ParentId) {
            ProgrammeSrv.getProgramByUserID(ParentId).then(function (successResponse) {

                List = [];

                $.each(successResponse, function (i, item) {

                    if ($rootScope.GlobalId == "0") {
                        if ($rootScope.SelectedProgram == item.Program_Id) {
                            $scope.pageNumber = i;
                        }
                    }
                    else {
                        $scope.pageNumber = "0";
                    }
                    if ($rootScope.EntityLevel == 0) {
                        List.push({ "Id": item.Program_Id, "Name": item.Program_Name, "STATUS": "Y", "StatusOfProject": item.Program_Weekly_Status, "project_Id": "0", "WeeklyStatusId": item.WeeklyStatus_Id, "ResourceCount": item.ResourceCount, "IssueCount": item.IssueCount, "RiskCount": item.RiskCount });
                    }
                    else {
                      
                        List.push({ "Id": item.Program_Id, "Name": item.Program_Name, "STATUS": "N", "StatusOfProject": item.Program_Weekly_Status, "project_Id": item.Parent_Id, "WeeklyStatusId": item.WeeklyStatus_Id, "ResourceCount": item.ResourceCount, "IssueCount": item.IssueCount, "RiskCount": item.RiskCount });
                    }
                });

                if (successResponse.length > 0) {
                    $scope.viewModel.Listdata = [];
                    $scope.viewModel.Listdata = List;
                  

                }
                else {
                    alert("No Record Found !!");
                }

            },
            function (errorResponse) {
                console.error(errorResponse);
            }).then(function () {
                $scope.helperMethods.LazyLoadProramData();
            }); // end service call
        }, // end BindLeftPanal

        BindTimeLineData: function ()
        {
            var PID = $("#programid").val();
            var promiseChart = charttimeline('Y', PID);
            $scope.$emit('handleEmit', { 'GlobalId': PID });
        },
        ResetWatch: function () {
            // $rootScope.GlobalId = "01";
        },
        GetModulesPermissionList: function (UserName) {
            var oPromise = ProgrammeSrv.GetModulesPermissionByUserName(UserName).then(function (successResponse) {
                arrModPermission = [];  // Reference from Common js 
                var myIndx = 0;
                $.each(successResponse.data, function (myIndx, arritem) {

                    arrModPermission.push({ "ModuleID": arritem.PID, "UserName": arritem.PID });
                });
             
            }, function (failureResponse) {
                console.log("Error in LeftPanel.js >> function GetModulesPermissionList();");

            });
        },

        LazyLoadProramData: function () {

            setTimeout(function () {

                var SelectedObj = $scope.viewModel.Listdata[$scope.pageNumber];
                if ($rootScope.EntityLevel == 0) {
                    $scope.methods.setPageNumber($scope.pageNumber, SelectedObj.Name, SelectedObj.Id, SelectedObj.STATUS, SelectedObj.project_ID, SelectedObj.WeeklyStatusId);
                }
                else {
                    $scope.methods.setPageNumber($scope.pageNumber, SelectedObj.Name, SelectedObj.Id, 'N', $rootScope.GlobalId, SelectedObj.WeeklyStatusId);
                } 

				var objKey = angular.element(document.getElementById('dvKeyAccom')).scope();
				if (typeof objKey != 'undefined') {
						angular.element(document.getElementById('dvKeyAccom')).scope().helperMethods.BindKeyAccomplished(0);
				}

				$scope.helperMethods.GetModulesPermissionList(person.UserName);
				
            }, 300);

			 
        }
    }

    $scope.helperMethods.BindLeftPanal(ID);
    // - ------------------- Watch -------------------//
    var IdGeot = $rootScope.$watch(function () {
        return $rootScope.GlobalId
    }, function (newValue, oldValue) {

        if (newValue != oldValue) {
            $scope.helperMethods.BindLeftPanal(newValue);
            $scope.helperMethods.LazyLoadProramData();
            $scope.$emit('handleEmit', { 'GlobalId': $rootScope.GlobalId });
        }
    }
              , true);
    //--------------------Watch : End --------------------//

    $scope.changeBrdScrName = function (pro) {
    };

    $scope.getIndividualData = function () {
  
        };

    function Keytable(programid, status) {
        
    };

	function getEditPermissionList(person) {
        var list = [];
        ProgrammeSrv.GetLoginUserPermission(person.UserName).then(function (successResponse) {
            list = [];
            $.each(successResponse.data, function (i, item) {
                list.push({ "PID": item.PID, "EditPermission": item.EditPermission, "ParentID": item.ParentID });
            });

            if (person.RoleName == "Project Manager")
            {
                var TempPermissionList = [];
                var EditableProgramID = findProgramsWithEditableProjects(list);
                $.each(list, function (i, item) {
                    $.each(EditableProgramID, function (i, it) {
                        if (item.PID == it) { item.EditPermission = 'Y'; }
                    });
                });
                TempPermissionList = list;
                $rootScope.EditPermissionList = TempPermissionList;    
            }
            else
            {
                $rootScope.EditPermissionList = list;
            }
            EditPermissionListForLoginUser = $rootScope.EditPermissionList;
        },
       function (errorResponse) {
       });
    }
	
    function charttimeline(status, rogramid) {

        var deferred = $.Deferred();
        var newJsonData = [];
        var data = null;
        document.getElementById('programid').value = rogramid;

        MileStoneSrv.getMileStone().then(function (successResponse) {
            newJsonData = [];

            $.each(successResponse, function (i, item) {
                newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.CreatedDate });
            });

            document.getElementById('visualization').innerHTML = null;
            var container = document.getElementById('visualization');
            var items = new vis.DataSet(newJsonData);

            var options = { height: 327, border: null, selectable: false, showCurrentTime: false };
            var timeline = new vis.Timeline(container, items, options);
            deferred.resolve(true);
            return deferred.promise();

        }, function (errorResponse) {

           // alert("Mile Stone Error = " + errorResponse);
            deferred.resolve(false);
            return deferred.promise();
        });
    };

	
    function MakeEditVisible(EditPermission)
    {
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        var data = document.getElementById('hdSetpageindex').value.split(',');

        if (person.RoleName == "Program Manager") {

            var PermissionList = EditPermissionListForLoginUser;
            var ID = data[4];
            var Flag = false;
            $.each(PermissionList, function (i, item) {
                if (item.ParentID == ID && item.EditPermission == 'Y')
                { Flag = true; }
            });
            if (Flag == false) { EditPermission = 'Z'; }

            document.getElementById("edit").style.display = "block";
            document.getElementById("dvOpenKeymdl").style.display = "block";
            document.getElementById("btnEditFinance").style.display = "block";
            document.getElementById("editResource").style.display = "block";
            document.getElementById("editRisk").style.display = "block";
            document.getElementById("editIssue").style.display = "block";


            if (EditPermission == 'N') {

                document.getElementById("edit").style.visibility = "hidden";
                document.getElementById("dvOpenKeymdl").style.visibility = "hidden";

            }
            else if (EditPermission == 'Y') {
                document.getElementById("edit").style.visibility = "visible";
                document.getElementById("dvOpenKeymdl").style.visibility = "visible";

            }
            else if (EditPermission == 'Z') {

                document.getElementById("edit").style.display = "none";
                document.getElementById("dvOpenKeymdl").style.display = "none";
                document.getElementById("btnEditFinance").style.display = "none";
                document.getElementById("editResource").style.display = "none";
                document.getElementById("editRisk").style.display = "none";
                document.getElementById("editIssue").style.display = "none";

            }
        }

        if (person.RoleName == "Project Manager")
        {

            if (data[3] == "Y") {
                document.getElementById("edit").style.display = "none";
                document.getElementById("dvOpenKeymdl").style.display = "none";
                document.getElementById("btnEditFinance").style.display = "none";
                document.getElementById("editResource").style.display = "none";
                document.getElementById("editRisk").style.display = "none";
                document.getElementById("editIssue").style.display = "none";

            } else {

                var PermissionList = EditPermissionListForLoginUser;
                var ID = data[4];
                var Flag =false ;
                $.each(PermissionList,function (i, item)
                {
                    if (item.ParentID == ID && item.EditPermission == 'Y')
                    { Flag = true; }
                });
                if (Flag == false) { EditPermission = 'Z'; }


                document.getElementById("edit").style.display = "block";
                document.getElementById("dvOpenKeymdl").style.display = "block";
                document.getElementById("btnEditFinance").style.display = "block";
                document.getElementById("editResource").style.display = "block";
                document.getElementById("editRisk").style.display = "block";
                document.getElementById("editIssue").style.display = "block";

                if (EditPermission == 'N')
                {
                    document.getElementById("edit").style.visibility = "hidden";
                    document.getElementById("dvOpenKeymdl").style.visibility = "hidden";
                }
                else if (EditPermission == 'Y') {
                    document.getElementById("edit").style.visibility = "visible";
                    document.getElementById("dvOpenKeymdl").style.visibility = "visible";

                }
                else if (EditPermission == 'Z') {

                    document.getElementById("edit").style.display = "none";
                    document.getElementById("dvOpenKeymdl").style.display = "none";
                    document.getElementById("btnEditFinance").style.display = "none";
                    document.getElementById("editResource").style.display = "none";
                    document.getElementById("editRisk").style.display = "none";
                    document.getElementById("editIssue").style.display = "none";
                }
                
            };

        }

    };
	
    $scope.SaveprojectStatus = function (Status) {

        WeeklyStatusId = document.getElementById('weeklyStatusID').value;

        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            Status: Status
        };
        var stringData = JSON.stringify(Weeklystatus);
        var urlString = "api/WeeklyProjectStatus/";
        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                var data = document.getElementById('hdSetpageindex').value.split(',');

                if (data[3] != "Y") {
                    changeProjectName(data[4], "Y");
                } else {

                    changepROGRAMName();
                };
                changeProgressBar(status, programid);

                var PID = $("#hdGlobalID").val();
   
                //$scope.helperMethods.BindLeftPanal(PID);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
            }
        });
    };

}]);

