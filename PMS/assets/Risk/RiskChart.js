
var moveBackChartRisk = 'N';
var clickBarChartImpact = 'N';
var drilldownProgramClick = "";
var drillDownRiskProgramName = "";
var drillDownRiskProgamId = 0;

app.controller('RiskChartController', ['$scope', '$http', '$q', 'RiskService', function ($scope, $http, $q, RiskService) {

    $scope.riskProgramChartData = function riskChart() {
        var programId = 0;
        var jsonData = [];
        var pid = $("#hdGlobalID").val();       

        RiskService.getriskbyuserid(pid).then(function (successresponse) {
            $.each(successresponse.data, function (i, item) {
                //alert(i);
                if (item.Status == 1)
                jsonData.push({ "riskid": item.RiskID, "risktitle": item.RiskTitle, "projectid": item.ProjectID, "ProjectName": item.ProjectName, "programId": item.Program_ID, "programName": item.ProgramName, "Impact": item.Impact, "status": item.Status, "RiskResponseActionPlan": item.RiskResponseActionPlan, "description": item.Description });
            });

           
            var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

            var getStackDataForRisk = jsonData;
            var count;
                var allProgramID = [];
                var distinctProgramID = [];

                var allProjectId = [];
                var distinctProjectID = [];
            //var allDesignation = [];
            var distinctImpact = ["High", "Medium", "Low"];
            var value = [];
            //ProgramIDs
            for (var i in getStackDataForRisk) {
                allProgramID.push(getStackDataForRisk[i].programName);
            }
            distinctProgramID = allProgramID.filter(function (item, i, allProgramID) {
                return i == allProgramID.indexOf(item);
            });

            //get distinct project name available
            for (var i in getStackDataForRisk) {
                allProjectId.push(getStackDataForRisk[i].ProjectName);
            }
            distinctProjectID = allProjectId.filter(function (item, i, allProjectId) {
                return i == allProjectId.indexOf(item);
            });

            if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk==0) {
                for (var j = 0; j < distinctProgramID.length; j++) {

                    for (var i = 0; i < distinctImpact.length; i++) {

                        count = 0;
                        for (var k = 0; k < getStackDataForRisk.length; k++) {
                            if (getStackDataForRisk[k].programName.trim() == distinctProgramID[j].trim() && getStackDataForRisk[k].Impact.trim() == distinctImpact[i].trim()) {
                                count++;
                                programId = getStackDataForRisk[k].programId;
                            }
                        }

                        value.push({ y: count, label: distinctProgramID[j], programid: programId, impact: distinctImpact[i].trim() });
                        programId = 0;
                    }
                }
                bindOpenRisksByTrack(value, 0);
            }
            else {
                var flag1 = false;
                //project level or drill down case
                if (drilldownRisk == 1) {
                    programName = drillDownRiskProgramName.trim();
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
                        for (var k = 0; k < getStackDataForRisk.length; k++) {
                            if (getStackDataForRisk[k].Impact.trim() == distinctImpact[i].trim() && programName == getStackDataForRisk[k].programName.trim() && distinctProjectID[j].trim() == getStackDataForRisk[k].ProjectName.trim()) {
                                count++;
                                flag1 = true;
                                programId = getStackDataForRisk[k].programId;
                            }
                        }
                        if(flag1 == true)
                        value.push({ y: count, label: distinctProjectID[j], programid: programId, impact: distinctImpact[i].trim() });
                       
                    }
                }
                bindOpenRisksByTrack(value, 1);

            }

 
        });
    }
    $scope.getRiskItemTypeChart = function itemChart() {
    
        var jsonData = [];
        var pid = 0;
        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        if (programOrProject[3] == 'Y' && drillDownRiskProgamId == 0) {
            pid = 0;
        }
        else if ((programOrProject[3] == 'Y' && drillDownRiskProgamId >0)) {
            pid = drillDownRiskProgamId;;
        }
        else {
            pid = programOrProject[4];
        }

        RiskService.getriskbyuserid(pid).then(function (successresponse) {
            $.each(successresponse.data, function (i, item) {
                //alert(i);
                if (item.Status == 1)
                jsonData.push({ "riskid": item.RiskID, "risktitle": item.RiskTitle, "projectid": item.ProjectID, "ProjectName": item.ProjectName, "programId": item.Program_ID, "programName": item.ProgramName, "Impact": item.Impact, "status": item.Status, "RiskResponseActionPlan": item.RiskResponseActionPlan, "description": item.Description, "ItemName": item.ItemName });
            });

           
            var getStackDataForRisk = jsonData;
            var distinctItemType = getItemTypeDetails();
            var distinctImpact = ["High", "Medium", "Low"];
            var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
            var value = [];
            var count = 0;
           
            var programName = "";

            
            if (drilldownRisk == 1) {
                programName = drillDownRiskProgramName.trim();
            }
            else {
                programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
            }

            if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 0) {
                var flag = 0;
                // for getting data of resource type at program level
                for (var i = 0; i < distinctItemType.length; i++) {

                    for (var k = 0; k < distinctImpact.length; k++) {
                        count = 0;
                        for (var j = 0; j < getStackDataForRisk.length; j++) {
                            if (distinctItemType[i].ItemName.trim() == getStackDataForRisk[j].ItemName.trim() && distinctImpact[k].trim() == getStackDataForRisk[j].Impact.trim()) {
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
                        for (var j = 0; j < getStackDataForRisk.length; j++) {
                            if (distinctItemType[i].ItemName.trim() == getStackDataForRisk[j].ItemName.trim() && distinctImpact[k].trim() == getStackDataForRisk[j].Impact.trim() && getStackDataForRisk[j].programName.trim() == programName) {
                                count++;
                            }
                        }
                        value.push({ impact: distinctImpact[k].trim(), totalCount: count, label: distinctItemType[i].ItemName.trim() });
                    }
                }
            }

            //getResourceDetailsChart(value, distinctDesignation, distinctResourceType);
            bindOpenRisksByImpact(value, distinctItemType, distinctImpact);
            getRiskPieChart(value);

        });
    }
    
}]);

function getRiskPieChart(jsonData) {


   // var jsonData = [];
    var piChartDataRisk = [];
    var distinctImpact = ["High", "Medium", "Low"];
    var riskCount = 0;
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
        //if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 0) {
            var a = "";
            for (var i = 0; i < temp.length; i++) {
                riskCount = 0;
                a = "";
                for (var j = 0; j < jsonData.length; j++) {
                    if (jsonData[j].label == temp[i].ItemName) {
                        riskCount = riskCount + jsonData[j].totalCount;
                        a = temp[i].ItemName;
                    }

                }
                if (a != null)
                    piChartDataRisk[i] = { y: riskCount, indexLabel: a};
            }

        //}
        //else {
        //    var a = "";
        //    for (var i = 0; i < distinctItemType.length; i++) {
        //        riskCount = 0;
        //        a = "";
        //        for (var j = 0; j < jsonData.length; j++) {
        //            if (jsonData[j].ItemType == distinctItemType[i].ItemID) {
        //                riskCount++;
        //                a = distinctItemType[i].ItemName;
        //            }
        //        }
        //        piChartDataRisk[i] = { y: riskCount, indexLabel: a };
        //    }
        //}

   // });
    getPieDataRisk(piChartDataRisk);
}

function bindOpenRisksByTrack(value, flagValue) {
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
    if ((hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 1) || hdnFieldValueForProject[3] == 'N')
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

            click: onRiskBarClick,

            dataPoints: data
        });

        data = [];

    }
    var titleOpenRisksByTrack = "Open Risks By Track";
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
    var chart = new CanvasJS.Chart("RiskHistochartContainer",
    {
        //interactivityEnabled: false,

        height: 320,
        colorSet: "ResHistgreenShades",
        title: {

            text: titleOpenRisksByTrack,

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

    function onRiskBarClick(e) {
        if (flag == 0) {
            flag = 1;
            drillDownRiskProgamId = e.dataPoint.programId;
            drilldownRisk = 1;
            drillDownRiskProgramName = e.dataPoint.label;

            var PermissionList = EditPermissionListForLoginUser;
            $.each(PermissionList, function (j, it) {
                if (it.PID == drillDownRiskProgamId && it.EditPermission == 'N')
                    document.getElementById("editRisk").style.visibility = "hidden";
                else if (it.PID == drillDownRiskProgamId && it.EditPermission == 'Y')
                { document.getElementById("editRisk").style.display = "block"; }
            });


            angular.element(document.getElementById('RiskHesto-chart')).scope().riskProgramChartData();
            angular.element(document.getElementById('RiskItem-chart')).scope().getRiskItemTypeChart();
            SetBreadCrumbForRisk(e.dataPoint.label);
            angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(e.dataPoint.label);

            document.getElementById('PortfolioBreadcrumbForRisk').onclick = RestoreRiskChart;
            document.getElementById('PortfolioBreadcrumbForRisk').style.cursor = "pointer";
        }
    }
}

function RestoreRiskChart() {
    drilldownRisk = 0;
    moveBackChartRisk = 'Y';
    clickBarChartImpact = 'N';
    document.getElementById('A2').innerHTML = "";

    document.getElementById('PortfolioBreadcrumbForRisk').onclick = "";
    document.getElementById('PortfolioBreadcrumbForRisk').style.cursor = "default";
    document.getElementById("editRisk").style.visibility = "visible";
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    if (person.RoleName == "Project Manager")
    { document.getElementById("editRisk").style.display = "none"; }
    ////$("#hdGlobalID").val(0);
    //var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');

    //changeResourceToProjectLevel('Y', programOrProject[2]);
    angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable('random');
    angular.element(document.getElementById('RiskHesto-chart')).scope().riskProgramChartData();
    angular.element(document.getElementById('RiskItem-chart')).scope().getRiskItemTypeChart();

   

}
function SetBreadCrumbForRisk(PName) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    if (PName != null) {
        if (hdnFieldValueForProject[3] == 'Y') {
            document.getElementById('A2').innerHTML ="<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>"+ PName + " Program";
        }
        else if (hdnFieldValueForProject[3] == 'N') {
            document.getElementById('A2').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program"
        }
    }

}

function bindOpenRisksByImpact(value, distinctItemType, distinctImpact) {


    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');



    var typeDetails = [];

    var temp = [];

    var record = [];

    var temp = [];
    var tempCount = 0;
    for (var j = 0; j < distinctItemType.length; j++) {
        tempCount = 0;
        for (var k = 0; k < value.length; k++) {
            if (value[k].totalCount > 0 && value[k].label.trim() == distinctItemType[j].ItemName.trim()) {
                tempCount++;
            }
        }
        if (tempCount > 0) {
            temp.push({ ItemName: distinctItemType[j].ItemName.trim() });
        }
    }
    var flag = 0;
        for (var i = 0; i < distinctImpact.length; i++) {

            for (var j = 0; j < temp.length; j++) {
                flag = 0;
                for (var k = 0; k < value.length; k++) {

                    if (value[k].label.trim() == temp[j].ItemName.trim() && value[k].impact.trim() == distinctImpact[i].trim() && value[k].totalCount != 0) {
                        record.push({ y: value[k].totalCount, label: temp[j].ItemName.trim() });
                        flag = 1;
                    }

                }
                if(flag==0)
                    record.push({ y: 0, label: temp[j].ItemName.trim() });
                
            }
        typeDetails.push({

            highlightEnabled: false,
            type: "stackedColumn",
            legendText: distinctImpact[i].trim(),
            cursor: "default",

            showInLegend: true,

            click: onRiskItemBarClick,

            dataPoints: record

        });

        record = [];

    }
        var titleOpenRisksByImpact = "Open Risks By Impact";
    CanvasJS.addColorSet("RiskHistgreenShades",
               [//colorSet Array
              "#0000FF",

               "#3c8dbc",

               "#00c0ef"
               ]);
    var chart = new CanvasJS.Chart("RiskItemChartContainer",
    {
        //interactivityEnabled: false,

        height: 320,
        colorSet: "RiskHistgreenShades",
        title: {

            text: titleOpenRisksByImpact,

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

    function onRiskItemBarClick(e) {
        
    }
}

function getPieDataRisk(piChartDataRisk) {
    var titleOpenRiskByType = "Open Risks By Type";
    //code for Finance Pie Chart
    CanvasJS.addColorSet("riskPieChartColor",
                [//colorSet Array
                "#f04f2d",
                "#0d31ff",
                "#668b8b",
                "#00cdcd",
                "#a2cd5a",
                "#39cccc"
                ]);

    //Pie Chart Financial
    var chart = new CanvasJS.Chart("piechartContainerRisk",
    {
        height: 320,
        toolTip: {
            enabled: false,
        },
        title: {
            text: "Risks By Type",
            fontSize: 20,
            verticalAlign: "bottom"
        },
        colorSet: "riskPieChartColor",
        title: {

            text: titleOpenRiskByType,

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
            click: onRiskPieChartClick,

            dataPoints: piChartDataRisk
        }
        ]
    });

    chart.render();

    function onRiskPieChartClick(e) {
        e.dataPoint.exploded = false;
    }

}