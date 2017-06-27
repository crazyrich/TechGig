var drilldownIssue = 0;
var moveBackChartIssue = 'Y';
var drillDownIssueProgramName = "";
app.controller('IssueChartController', ['$scope', '$http', '$q', 'IssueService', function ($scope, $http, $q, IssueService) {

    $scope.issueProgramChartData = function IssueChart() {
        var programId = 0;
        var jsonData = [];
        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        var pid = $("#hdGlobalID").val();

        

        IssueService.getissuebyuserid(pid).then(function (successresponse) {
            $.each(successresponse.data, function (i, item) {
                if (item.Status == 1)
                    jsonData.push({ "IssueID": item.IssueID, "IssueTitle": item.IssueTitle, "projectid": item.ProjectID, "ProjectName": item.ProjectName, "programId": item.ProgramID, "programName": item.ProgramName, "Impact": item.Severity, "status": item.Status, "description": item.Description, "CreatedDate": item.CreatedDate, "UpdatedDate": item.UpdatedDate });
            });

           
            var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

            var getStackDataForIssue = jsonData;
            var count;
            var allProgramID = [];
            var distinctProgramID = [];

            var allProjectId = [];
            var distinctProjectID = [];
            //var allDesignation = [];
            var distinctImpact = ["High", "Medium", "Low"];
            var value = [];
            //ProgramIDs
            for (var i in getStackDataForIssue) {
                allProgramID.push(getStackDataForIssue[i].programName);
            }
            distinctProgramID = allProgramID.filter(function (item, i, allProgramID) {
                return i == allProgramID.indexOf(item);
            });

            //get distinct project name available
            for (var i in getStackDataForIssue) {
                allProjectId.push(getStackDataForIssue[i].ProjectName);
            }
            distinctProjectID = allProjectId.filter(function (item, i, allProjectId) {
                return i == allProjectId.indexOf(item);
            });

            if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue==0) {
                for (var j = 0; j < distinctProgramID.length; j++) {

                    for (var i = 0; i < distinctImpact.length; i++) {

                        count = 0;
                        for (var k = 0; k < getStackDataForIssue.length; k++) {
                            if (getStackDataForIssue[k].programName.trim() == distinctProgramID[j].trim() && getStackDataForIssue[k].Impact.trim() == distinctImpact[i].trim()) {
                                count++;
                                programId = getStackDataForIssue[k].programId;
                            }
                        }

                        value.push({ y: count, label: distinctProgramID[j], programid: programId, impact: distinctImpact[i].trim() });
                        programId = 0;
                    }
                }
                bindOpenIssuesByTrack(value, 0);
            }
            else {
                var flag1 = false;
                //project level or drill down case
                if (drilldownIssue == 1) {
                    programName = drillDownIssueProgramName.trim();
                }
                else {
                    programName = (document.getElementById('idBrdScrProgName').innerHTML.trim()).trim();
                }
                value = [];
                for (var j = 0; j < distinctProjectID.length; j++) {

                    for (var i = 0; i < distinctImpact.length; i++) {
                        flag1 = false;
                        count = 0;
                        programId = "";
                        for (var k = 0; k < getStackDataForIssue.length; k++) {
                            if (getStackDataForIssue[k].Impact.trim() == distinctImpact[i].trim() && programName == getStackDataForIssue[k].programName.trim() && distinctProjectID[j].trim() == getStackDataForIssue[k].ProjectName.trim()) {
                                count++;
                                flag1 = true;
                                programId = getStackDataForIssue[k].programId;
                            }
                        }
                        if(flag1 == true)
                            value.push({ y: count, label: distinctProjectID[j], programid: programId, impact: distinctImpact[i].trim() });
                       
                    }
                }
                bindOpenIssuesByTrack(value, 1);

            }

 
        });
    }
    $scope.getIssueItemTypePieChart = function itemChart() {

        var jsonData = [];
        var pid = $("#hdGlobalID").val();

       

        IssueService.getissuebyuserid(pid).then(function (successresponse) {
            $.each(successresponse.data, function (i, item) {
                //alert(i);
                if (item.Status == 1)
                    jsonData.push({ "IssueID": item.IssueID, "IssueTitle": item.IssueTitle, "projectid": item.ProjectID, "ProjectName": item.ProjectName, "programId": item.ProgramID, "programName": item.ProgramName, "Impact": item.Severity, "status": item.Status,  "description": item.Description, "ItemName": item.ItemName });

            });


            var getStackDataForIssue = jsonData;
            var distinctItemType = getItemTypeDetails();
            var distinctImpact = ["High", "Medium", "Low"];
            var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
            var value = [];
            var count = 0;

            var programName = "";


            if (drilldownIssue == 1) {
                programName = drillDownIssueProgramName.trim();
            }
            else {
                programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
            }

            if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 0) {
                var flag = 0;
                // for getting data of resource type at program level
                for (var i = 0; i < distinctItemType.length; i++) {

                    for (var k = 0; k < distinctImpact.length; k++) {
                        count = 0;
                        for (var j = 0; j < getStackDataForIssue.length; j++) {
                            if (distinctItemType[i].ItemName.trim() == getStackDataForIssue[j].ItemName.trim() && distinctImpact[k].trim() == getStackDataForIssue[j].Impact.trim()) {
                                count++;
                                flag = 1;
                            }

                        }
                        if (flag == 1) {
                            value.push({ impact: distinctImpact[k].trim(), totalCount: count, label: distinctItemType[i].ItemName.trim() });
                            flag = 0;
                        }
                    }
                }
            }
            else {
                // for getting data of resource type at project/drilldown level
                for (var i = 0; i < distinctItemType.length; i++) {

                    for (var k = 0; k < distinctImpact.length; k++) {
                        count = 0;
                        for (var j = 0; j < getStackDataForIssue.length; j++) {
                            if (distinctItemType[i].ItemName.trim() == getStackDataForIssue[j].ItemName.trim() && distinctImpact[k].trim() == getStackDataForIssue[j].Impact.trim() && getStackDataForIssue[j].programName.trim() == programName) {
                                count++;
                            }
                        }
                        value.push({ impact: distinctImpact[k].trim(), totalCount: count, label: distinctItemType[i].ItemName.trim() });
                    }
                }
            }

            getIssuePieChart(value);

        });
    }
    $scope.getIssueAgingData = function () {
        var list = [];
        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        var pid = $("#hdGlobalID").val();

        


        IssueService.getissuebyuserid(pid).then(function (successresponse) {

            $.each(successresponse.data, function (i, item) {
                if(item.Status == 1)
                    list.push({ "IssueID": item.IssueID, "IssueTitle": item.IssueTitle, "Severity": item.Severity, "ItemName": item.ItemName, "ProjectName": item.ProjectName, "ProgramName": item.ProgramName, "Aging": item.Aging });
            });
            var getData = list;
            var lessThanTwoWeeks = 0;
            var btwTwoOne = 0;
            var btwOneThree =0;
            var grtThanThree = 0;

            if (programOrProject[3] == 'Y' && drilldownIssue == 0) {

                for (var j = 0; j < getData.length; j++) {
                    if ((getData[j].Aging) / 7 < 2) {
                        lessThanTwoWeeks++;
                    } else if ((getData[j].Aging) / 7 >= 2 && (getData[j].Aging) / 30 <= 1) {
                        btwTwoOne++;
                    } else if ((getData[j].Aging) / 30 >= 1 && (getData[j].Aging) / 30 <= 3) {
                        btwOneThree++;
                    } else if ((getData[j].Aging) / 30 > 3) {
                        grtThanThree++;
                    }

                }
                var pieChartAgingData = [];
                var label = [{ name: "<2 weeks" }, { name: "2 weeks-month" }, { name: "1-3 months" }, { name: ">3 months" }];
                var count = [{ value: lessThanTwoWeeks }, { value: btwTwoOne }, { value: btwOneThree }, { value: grtThanThree }]
                for (var i = 0; i < 4; i++) {

                    pieChartAgingData[i] = { x: count[i].value, y: count[i].value, indexLabel: label[i].name.trim() };
                }

            } else if (programOrProject[3] == 'Y' && drilldownIssue == 1) {
                for (var j = 0; j < getData.length; j++) {
                    if(getData[j].ProgramName.trim() == drillDownIssueProgramName.trim())
                    if ((getData[j].Aging) / 7 < 2) {
                        lessThanTwoWeeks++;
                    } else if ((getData[j].Aging) / 7 >= 2 && (getData[j].Aging) / 30 <= 1) {
                        btwTwoOne++;
                    } else if ((getData[j].Aging) / 30 >= 1 && (getData[j].Aging) / 30 <= 3) {
                        btwOneThree++;
                    } else if ((getData[j].Aging) / 30 > 3) {
                        grtThanThree++;
                    }
                }

                
                var pieChartAgingData = [];
                var label = [{ name: "<2 weeks" }, { name: "2 weeks-month" }, { name: "1-3 months" }, { name: ">3 months" }];
                var count = [{ value: lessThanTwoWeeks }, { value: btwTwoOne }, { value: btwOneThree }, { value: grtThanThree }]
                for (var i = 0; i < 4; i++) {

                    pieChartAgingData[i] = { x: count[i].value, y: count[i].value, indexLabel: label[i].name.trim() };
                }
            }
            else  {
                for (var j = 0; j < getData.length; j++) {
                    if (getData[j].ProgramName.trim() == document.getElementById('idBrdScrProgName').innerHTML.trim())
                        if ((getData[j].Aging) / 7 < 2) {
                            lessThanTwoWeeks++;
                        } else if ((getData[j].Aging) / 7 >= 2 && (getData[j].Aging) / 30 <= 1) {
                            btwTwoOne++;
                        } else if ((getData[j].Aging) / 30 >= 1 && (getData[j].Aging) / 30 <= 3) {
                            btwOneThree++;
                        } else if ((getData[j].Aging) / 30 > 3) {
                            grtThanThree++;
                        }
                }


                var pieChartAgingData = [];
                var label = [{ name: "<2 weeks" }, { name: "2 weeks-month" }, { name: "1-3 months" }, { name: ">3 months" }];
                var count = [{ value: lessThanTwoWeeks }, { value: btwTwoOne }, { value: btwOneThree }, { value: grtThanThree }]
                for (var i = 0; i < 4; i++) {

                    pieChartAgingData[i] = { x: count[i].value, y: count[i].value, indexLabel: label[i].name.trim() };
                }
            }
            getPieDataIssueAging(pieChartAgingData);

        }, function (error) {
            
            console.log(error.statusText);

        });// end service call
    }
}]);

function getPieDataIssueAging(piChartDataIssue) {
    var piChartDataIssueAging = [];
    $.each(piChartDataIssue, function (i, item) {
        if (item.x != 0)
            piChartDataIssueAging.push({ x: item.x, y: item.y, indexLabel: item.indexLabel });

    });


    var titleOpenIssueAgingByType = "Open Issues By Aging";
    //code for Finance Pie Chart
    CanvasJS.addColorSet("IssueAgingPieChartColor",
                [//colorSet Array
               
                "#0d31ff",
                "#668b8b",
                "#00cdcd",
                "#a2cd5a",
                "#39cccc", "#f04f2d"
                ]);

    //Pie Chart Financial
    var chart = new CanvasJS.Chart("piechartContainerIssueAging",
    {
        height: 320,
        toolTip: {
            enabled: false,
        },
        title: {
            text: "IssueAgings By Type",
            fontSize: 20,
            verticalAlign: "bottom"
        },
        colorSet: "IssueAgingPieChartColor",
        title: {

            text: titleOpenIssueAgingByType,

            fontSize: 20,

            verticalAlign: "bottom"

        },
        legend: {
            maxWidth: 350,
            itemWidth: 120
        },
        toolTip: {

            enabled: false,

        },
        data: [
        {
            cursor: "default",
            type: "pie",
            showInLegend: false,
            legendText: "{indexLabel}",

            fillOpacity: 4,
            click: onIssueAgingPieChartClick,

            dataPoints: piChartDataIssueAging
        }
        ]
    });

    chart.render();

    function onIssueAgingPieChartClick(e) {
        e.dataPoint.exploded = false;
    }

}
function getIssuePieChart(jsonData) {


    // var jsonData = [];
    var piChartDataIssue = [];
    var distinctImpact = ["High", "Medium", "Low"];
    var IssueCount = 0;
    var distinctItemType = getItemTypeDetails();
    var temp = [];
    var tempCount = 0;
    for (var j = 0; j < distinctItemType.length; j++) {
        tempCount = 0;
        for (var k = 0; k < jsonData.length; k++) {
            if (jsonData[k].totalCount > 0 && jsonData[k].label.trim() == distinctItemType[j].ItemName.trim()) {
                tempCount++;
            }
        }
        if (tempCount > 0) {
            temp.push({ ItemName: distinctItemType[j].ItemName.trim() });
        }
    }


    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    //if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 0) {
    var a = "";
    for (var i = 0; i < temp.length; i++) {
        IssueCount = 0;
        a = "";
        for (var j = 0; j < jsonData.length; j++) {
            if (jsonData[j].label == temp[i].ItemName) {
                IssueCount = IssueCount + jsonData[j].totalCount;
                a = temp[i].ItemName;
            }

        }
        if (a != null)
            piChartDataIssue[i] = { y: IssueCount, indexLabel: a };
    }
   
    getPieDataIssue(piChartDataIssue);
}
function getPieDataIssue(piChartDataIssue) {
    var titleOpenIssueByType = "Open Issues By Type";
    //code for Finance Pie Chart
    CanvasJS.addColorSet("IssuePieChartColor",
                [//colorSet Array
                "#f04f2d",
                "#0d31ff",
                "#668b8b",
                "#00cdcd",
                "#a2cd5a",
                "#39cccc"
                ]);

    //Pie Chart Financial
    var chart = new CanvasJS.Chart("piechartContainerIssueByType",
    {
        height: 320,
        toolTip: {
            enabled: false,
        },
        title: {
            text: "Issues By Type",
            fontSize: 20,
            verticalAlign: "bottom"
        },
        colorSet: "IssuePieChartColor",
        title: {

            text: titleOpenIssueByType,

            fontSize: 20,

            verticalAlign: "bottom"

        },
        legend: {
            maxWidth: 350,
            itemWidth: 120
        },
        toolTip: {

            enabled: false,

        },
        data: [
        {
            cursor: "default",
            type: "pie",
            showInLegend: false,
            legendText: "{indexLabel}",

            fillOpacity: 3,
            click: onIssuePieChartClick,

            dataPoints: piChartDataIssue
        }
        ]
    });

    chart.render();

    function onIssuePieChartClick(e) {
        e.dataPoint.exploded = false;
    }

}
function bindOpenIssuesByTrack(value, flagValue) {
    var flag = flagValue;
    var allProgramProject = [];
    var distinctProgramProject = [];

    var temp = [];
    var data = [];
    var count = 0;
    for (var i in value) {
        allProgramProject.push(value[i].label);
    }

    distinctProgramProject = allProgramProject.filter(function (item, i, allProgramProject) {
        return i == allProgramProject.indexOf(item);
    });


    var tmpProgramId = 0;
    for (var i = 0; i < distinctProgramProject.length; i++) {
        for (var j = 0; j < value.length; j++) {
            if (value[j].label.trim() == distinctProgramProject[i].trim() && value[j].y > 0) {
                count++;
                tmpProgramId = value[j].programid
            }
        }

        if (count > 0) {
            temp.push({ distinctProgramProject: distinctProgramProject[i].trim(), programid: tmpProgramId });
            count = 0;
        }
    }

    var flag = flagValue;
    var mousePointer = "pointer";
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if ((hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 1) || hdnFieldValueForProject[3] == 'N')
        mousePointer = "default";

    var record = [];

    var typeDetails = [];
    var flagForData = 0;

    for (var j = 0; j < distinctImpact.length; j++) {

        for (var i = 0; i < temp.length; i++) {
            flagForData = 0;
            for (var k = 0; k < value.length; k++) {

                if (temp[i].distinctProgramProject.trim() == value[k].label.trim() && distinctImpact[j].trim() == value[k].impact.trim()) {

                    data.push({ y: value[k].y, label: value[k].label, programId: value[k].programid });
                    flagForData = 1;
                }
            }
            if (flagForData == 0)
                data.push({ y: 0, label: temp[i].distinctProgramProject, programId: temp[i].programid });

        }

        typeDetails.push({
            //indexLabel: "{y}",

            //indexLabelFontColor: "white",

            // indexLabelPlacement: "inside",
            highlightEnabled: false,
            cursor: mousePointer,
            type: "stackedColumn",

            legendText: distinctImpact[j].trim(),

            showInLegend: true,

            click: onIssueBarClick,

            dataPoints: data
        });

        data = [];

    }
    var titleOpenIssuesByTrack = "Open Issues By Track";
    CanvasJS.addColorSet("ResHistgreenShades",
               [//colorSet Array

                "#4661EE",
                "#4DB6AC",
                "#3c8dbc",
                "#00c0ef",
                "#1BCDD1",
                "#F65353",
                "#A92424",
                "#00ACC1",
                "#CF3838",
                "#0000FF",
                "#81D4FA"
               //"#E14747",

               ]);
    var chart = new CanvasJS.Chart("IssueHistochartContainer",
    {
        //interactivityEnabled: false,

        height: 320,
        colorSet: "ResHistgreenShades",
        title: {

            text: titleOpenIssuesByTrack,

            fontSize: 20,

            verticalAlign: "bottom"

        },
        axisX: {
            labelFontSize: 12,
            gridThickness: 0
        },

        axisY: {
            labelFontSize: 12,
            gridThickness: 0
        },
        toolTip: {

            enabled: false,

        },
        data: typeDetails
    });

    chart.render();

    function onIssueBarClick(e) {
        if (flag == 0) {
            drilldownIssue = 1;
            drillDownIssueProgamId = e.dataPoint.programId;
            drillDownIssueProgramName = e.dataPoint.label;

            document.getElementById('PortfolioBreadcrumbForIssue').onclick = RestoreIssueChart;
            document.getElementById('PortfolioBreadcrumbForIssue').style.cursor = "pointer";

            var PermissionList = EditPermissionListForLoginUser;
            $.each(PermissionList, function (j, it) {
                if (it.PID == drillDownIssueProgamId && it.EditPermission == 'N')
                    document.getElementById("editIssue").style.visibility = "hidden";
                else if (it.PID == drillDownIssueProgamId && it.EditPermission == 'Y')
                { document.getElementById("editIssue").style.display = "block"; }

            });

            angular.element(document.getElementById('IssueHesto-chart')).scope().issueProgramChartData();
            flag = 1;
            drillDownIssueProgamId = e.dataPoint.programId;
            angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();

            SetBreadCrumbForIssue(e.dataPoint.label);
            angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(e.dataPoint.label);
            angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();

        }
    }
}
function RestoreIssueChart() {
    drilldownIssue = 0;
    moveBackChartIssue = 'Y';
    clickBarChartImpact = 'N';
    document.getElementById('A3').innerHTML = "";
    ////$("#hdGlobalID").val(0);
    //var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');

    //changeResourceToProjectLevel('Y', programOrProject[2]);
    document.getElementById("editIssue").style.visibility = "visible";
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    if (person.RoleName == "Project Manager")
    { document.getElementById("editIssue").style.display = "none"; }
    angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable('random');
    angular.element(document.getElementById('IssueHesto-chart')).scope().issueProgramChartData();
    angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();
    angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();

    document.getElementById('PortfolioBreadcrumbForIssue').onclick = "";
    document.getElementById('PortfolioBreadcrumbForIssue').style.cursor = "default";


}
function SetBreadCrumbForIssue(PName) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    if (PName != null) {
        if (hdnFieldValueForProject[3] == 'Y') {
            document.getElementById('A3').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program";
        }
        else if (hdnFieldValueForProject[3] == 'N') {
            document.getElementById('A3').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program"
        }
    }

}