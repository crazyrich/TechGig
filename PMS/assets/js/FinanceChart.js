
function financeChart()
{
  
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    var gId = $("#hdGlobalID").val();
    //  GetFinanceDataForTable(0);


    var getChartDataForFinance = "";
    // ------------Start : Calling for finance Data
    var promiseData = GetFinanceDataForTable(gId);

    promiseData.then(function () {


        var promisMyData = getFinanceData(gId);
        promisMyData.then(function (SuccessResponse) {
            getChartDataForFinance = SuccessResponse;


        }, function () {
           // alert("Got Error for chart data");

        });

        // ------------End : Calling for finance Data

    }, function () {

       // alert("Finance Moduel Finace Chart ");
    })
    //editFinanceDataModal(0);
  ;// getFinanceData(0);
    var piChartDataFinance = [];
    var barChartDataFinanceAllocated = [];
    var barChartDataFinanceUsed = [];
    var barChartDataFinanceRevised = [];

    var TotalAllocatedBudget = 0;
    $.each(getChartDataForFinance, function (i, item) {
        TotalAllocatedBudget = TotalAllocatedBudget + item.AllocatedBudget;
    });


    if (hdnFieldValueForProject[3] == 'N') {
        var PID = hdnFieldValueForProject[4];
      
     //   getChartDataForFinance = getFinanceData(gId); //getFinanceData(PID);
        var j = 0;

        $.each(getChartDataForFinance, function (i, item) {
            var PercentageAllocatedBudget = ((item.AllocatedBudget * 100) / TotalAllocatedBudget).toPrecision(3);

            var indexLabelContent = item.ProgramName.trim() + '($' + item.AllocatedBudget + ' mn,' + PercentageAllocatedBudget + '%)';
            var labelContent = item.ProgramName.substr(0,20);

            piChartDataFinance[j] = { x: item.ProgramID, y: item.AllocatedBudget, indexLabel: indexLabelContent,Pname:item.ProgramName.trim() };
            barChartDataFinanceAllocated[j] = { id: item.ProgramID, y: item.AllocatedBudget, label: labelContent };
            barChartDataFinanceUsed[j] = { id: item.ProgramID, y: item.UsedBudget, label: labelContent };
            barChartDataFinanceRevised[j] = { id: item.ProgramID, y: item.RevisedBudget, label: labelContent };
                j++;
    
            
        });
    }
    else {

        $.each(getChartDataForFinance, function (i, item) {
            var PercentageAllocatedBudget = ((item.AllocatedBudget * 100) / TotalAllocatedBudget).toPrecision(3);

            var indexLabelContent = item.ProgramName.trim() + '($' + item.AllocatedBudget + ' mn,' + PercentageAllocatedBudget + '%)';
            var labelContent = item.ProgramName.substr(0, 20);

            piChartDataFinance[i] = { x: item.ProgramID, y: item.AllocatedBudget, indexLabel: indexLabelContent, Pname: item.ProgramName.trim() };
            barChartDataFinanceAllocated[i] = { id: item.ProgramID, y: item.AllocatedBudget, label: labelContent };
            barChartDataFinanceUsed[i] = { id: item.ProgramID, y: item.UsedBudget, label: labelContent };
            barChartDataFinanceRevised[i] = { id: item.ProgramID, y: item.RevisedBudget, label: labelContent };
        });
    }

    var TitleForBarGraphFinance="";
    if (hdnFieldValueForProject[3] == 'Y') {
        if (gId == 0) {
            TitleForBarGraphFinance = 'Program-wise Financial Details';
        }
        else {
            TitleForBarGraphFinance = "Project-wise Financial Details";
        }
    }   
    else {
        TitleForBarGraphFinance = "Project-wise Financial Details";
    }








    getData(piChartDataFinance, barChartDataFinanceAllocated, barChartDataFinanceUsed, barChartDataFinanceRevised, TitleForBarGraphFinance,0);
   // editFinanceDataModal(0);
}

function getData(piChartDataFinance, barChartDataFinanceAllocated, barChartDataFinanceUsed, barChartDataFinanceRevised, TitleForBarGraphFinance,flagValue)
{

    var mousePointer = "pointer";
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (flagValue==1||hdnFieldValueForProject[3] == 'N')
        mousePointer = "default";
    //code for Finance Pie Chart
    CanvasJS.addColorSet("financePiChartColor",
                [//colorSet Array
                "#f04f2d",
                "#0d31ff",
                "#668b8b",
                "#00cdcd",
                "#a2cd5a",
                "#39cccc"
                ]);

    //Pie Chart Financial
    var chart = new CanvasJS.Chart("piechartContainer",
    {
        height: 320,
        toolTip: {
            enabled: false,
        },
        title: {
            text: "Planned Budget Distribution",
            fontSize: 20,
        verticalAlign:"bottom"},
        colorSet: "financePiChartColor",
        legend: {
            maxWidth: 350,
            itemWidth: 120
        },
        data: [
        {
            cursor: mousePointer,
            type: "pie",
            showInLegend: false,
            legendText: "{indexLabel}",
            click: onPieClick,
            fillOpacity: 3,

            dataPoints: piChartDataFinance
        }
        ]
    });

    function onPieClick(e) {
       // alert(e.dataPoint.x);
        var parentId; var ProgramNameForBreadCrumb;
        var gId = $("#hdGlobalID").val();
        ProgramNameForBreadCrumb = e.dataPoint.Pname.trim();
        /*
        var getDataOnClick = getFinanceData(gId);// getFinanceData(0);
      
        $.each(getDataOnClick, function (i, item) {
            if (item.ProgramID == e.dataPoint.x) {
                //parentId = item.ProgramID;
              ProgramNameForBreadCrumb = item.ProgramName;
            }
        });
        */
        parentId = e.dataPoint.x;
        FinanceParentID = parentId;

        var PermissionList = EditPermissionListForLoginUser;
        $.each(PermissionList, function (j, it) {
            if (it.PID == parentId && it.EditPermission == 'N')
                document.getElementById("btnEditFinance").style.visibility = "hidden";
            else if (it.PID == parentId && it.EditPermission == 'Y')
            { document.getElementById("btnEditFinance").style.display = "block"; }
               
        });




        if (typeof parentId == 'undefined' || parentId === null)
        {
           // alert(" Return from chart");
            return;
        }

        //var newJsonData = getFinanceData(parentId);

        var PromisePiChart = getFinanceData(parentId);
        PromisePiChart.then(function (successResponse) {
            newJsonData = successResponse;

            //-------------------------Start: Sucess Data ------------------
            if (Object.keys(newJsonData).length != 0) {

                var piChartDataFinance = [];
                var barChartDataFinanceAllocated = [];
                var barChartDataFinanceUsed = [];
                var barChartDataFinanceRevised = [];


                var TotalAllocatedBudget = 0;
                $.each(newJsonData, function (i, item) {
                    TotalAllocatedBudget = TotalAllocatedBudget + item.AllocatedBudget;
                });

                var TitleForBarGraphFinance = "Project-wise Financial Details";

                $.each(newJsonData, function (i, item) {
                    var PercentageAllocatedBudget = ((item.AllocatedBudget * 100) / TotalAllocatedBudget).toPrecision(3);

                    var indexLabelContent = item.ProgramName.trim() + '($' + item.AllocatedBudget + ' mn,' + PercentageAllocatedBudget + '%)';
                    var labelContent = item.ProgramName.substr(0, 20);

                    piChartDataFinance[i] = { x: item.ProgramID, y: item.AllocatedBudget, indexLabel: indexLabelContent };
                    barChartDataFinanceAllocated[i] = { id: item.ProgramID, y: item.AllocatedBudget, label: labelContent };
                    barChartDataFinanceUsed[i] = { id: item.ProgramID, y: item.UsedBudget, label: labelContent };
                    barChartDataFinanceRevised[i] = { id: item.ProgramID, y: item.RevisedBudget, label: labelContent };
                });

                getData(piChartDataFinance, barChartDataFinanceAllocated, barChartDataFinanceUsed, barChartDataFinanceRevised, TitleForBarGraphFinance, 1);

                SetBreadCrumbForFinance(ProgramNameForBreadCrumb);
                SetGlobalID(parentId);
                GetFinanceDataForTable(parentId);
                SetFinanceDataForHeader(parentId);
                setDrillDownValue(1, parentId);
                document.getElementById("PNameForGrid").innerHTML = "Project Name";
                document.getElementById("NameForFinanceGrid").innerText = "Project wise Details";
                editFinanceDataModal(parentId);
                document.getElementById('PortfolioBreadCrumbForFinance').onclick = RestoreFinanceChart;
                document.getElementById('PortfolioBreadCrumbForFinance').style.cursor = "pointer";
            }
            else {
                //alert("No More Projects found!! ");
            }

            //-------------------------Error: Sucess Data ------------------
        }, function () {

          //  alert("Function error for bind PI chart Finance: Error 202");
        })
        //alert("Length  = " + Object.keys(newJsonData).length);
       
      //  chart.render();
    }
   chart.render(); // Puted above
    //End of Code for Finance Pie Chart


    // Code for Bar Chart Finance
    var chart = new CanvasJS.Chart("barchartContainer",
    {
        height: 320,
        title: {
            text: TitleForBarGraphFinance,
            fontSize: 20,
            verticalAlign: "bottom"
        },
        toolTip: {
            enabled: false,
        },
        axisX: {
            labelFontSize: 12,
            labelAutoFit: true,
            gridThickness:0,
            labelMaxWidth: 70,
            
        },

        axisY: {
            title: "Amount",
            titleFontSize: 12,
            labelFontSize: 12,
            labelAutoFit: true,
            gridThickness: 0
        },
        
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "vertical"
        },
        data: [
        {
            indexLabelPlacement: "outside",
            indexLabel: "{y}",
            indexLabelOrientation: "vertical",
            cursor: mousePointer,
            click: function (e) {
                onBarClick(e);
            } ,
            color: "#DCDCDC",
            type: "column",
            legendText: "Planned Budget",
            showInLegend: true,

            dataPoints: barChartDataFinanceAllocated
        },
        {
            indexLabelPlacement: "outside",
            indexLabel: "{y}",
            indexLabelOrientation: "vertical",
            cursor: mousePointer,
            click: function (e) {
                onBarClick(e);
            },
            color: "#66cdaa",
            type: "column",
            legendText: "Revised Budget",
            showInLegend: true,

            dataPoints: barChartDataFinanceRevised
        },
        {
            indexLabelPlacement: "outside",
            indexLabel: "{y}",
            indexLabelOrientation: "vertical",
            cursor: mousePointer,
            click: function (e) {
                onBarClick(e);
            },
            color: "#668b8b",
            type: "column",
            legendText: "Actual Spent",
            showInLegend: true,

            dataPoints: barChartDataFinanceUsed
        }
        ]
    });

    chart.render();

    function onBarClick(e) {

       // var chart = new CanvasJS.Chart("barchartContainer", {});
        //chart.options.title.text = "Project Wise Financial Details";

        var parentId = e.dataPoint.id;
        var ProgramNameForBreadCrumb = e.dataPoint.label.trim();
    
        if (typeof parentId == 'undefined' || parentId === null) {

            return;
        }

        var PermissionList = EditPermissionListForLoginUser;
        $.each(PermissionList, function (j, it) {
            if (it.PID == parentId && it.EditPermission == 'N')
                document.getElementById("btnEditFinance").style.visibility = "hidden";
            else if (it.PID == parentId && it.EditPermission == 'Y')
            { document.getElementById("btnEditFinance").style.display = "block"; }
        });




        var PromiseChar =  getFinanceData(parentId);
        PromiseChar.then(function(successResponse){
            newJsonData = successResponse;

     //---------- Success ----Response-------------------------------------------//
            // Start :: Show Chart Drill Down //
            if (Object.keys(newJsonData).length != 0) {
                var piChartDataFinance = [];
                var barChartDataFinanceAllocated = [];
                var barChartDataFinanceUsed = [];
                var barChartDataFinanceRevised = [];

                var TitleForBarGraphFinance = "Project-wise Financial Details";

                var TotalAllocatedBudget = 0;
                $.each(newJsonData, function (i, item) {
                    TotalAllocatedBudget = TotalAllocatedBudget + item.AllocatedBudget;
                });

                $.each(newJsonData, function (i, item) {
                    var PercentageAllocatedBudget = ((item.AllocatedBudget * 100) / TotalAllocatedBudget).toPrecision(3);

                    var indexLabelContent = item.ProgramName.trim() + '($' + item.AllocatedBudget + ' mn,' + PercentageAllocatedBudget + '%)';
                    var labelContent = item.ProgramName.substr(0, 20);

                    piChartDataFinance[i] = { x: item.ProgramID, y: item.AllocatedBudget, indexLabel: indexLabelContent };
                    barChartDataFinanceAllocated[i] = { id: item.ProgramID, y: item.AllocatedBudget, label: labelContent };
                    barChartDataFinanceUsed[i] = { id: item.ProgramID, y: item.UsedBudget, label: labelContent };
                    barChartDataFinanceRevised[i] = { id: item.ProgramID, y: item.RevisedBudget, label: labelContent };

                });
                getData(piChartDataFinance, barChartDataFinanceAllocated, barChartDataFinanceUsed, barChartDataFinanceRevised, TitleForBarGraphFinance, 1);




                SetBreadCrumbForFinance(ProgramNameForBreadCrumb);
                SetGlobalID(parentId);
                GetFinanceDataForTable(parentId);
                SetFinanceDataForHeader(parentId);
                setDrillDownValue(1, parentId);
                document.getElementById("PNameForGrid").innerHTML = "Project Name";
                document.getElementById("NameForFinanceGrid").innerText = "Project wise Details";

                editFinanceDataModal(parentId);



            }
            document.getElementById('PortfolioBreadCrumbForFinance').onclick = RestoreFinanceChart;
            document.getElementById('PortfolioBreadCrumbForFinance').style.cursor = "pointer";

            // End :: Show Chart Drill Down //
      //---------- Success ----Response-------------------------------------------//

        },function(){
        
            //alert("Error inFinac eChart : drill down");
        });



        

    }
}

function RestoreFinanceChart()
{
 
    document.getElementById('PortfolioBreadCrumbForFinance').onclick = "";
    document.getElementById('PortfolioBreadCrumbForFinance').style.cursor = "default";
    document.getElementById("btnEditFinance").style.visibility = "visible";
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    if (person.RoleName == "Project Manager")
    { document.getElementById("btnEditFinance").style.display = "none"; }
    document.getElementById("ProgramBreadCrumbForFinance").innerHTML = "";
     $("#hdGlobalID").val(0);
    SetFinanceDataForHeader(0);
    document.getElementById("NameForFinanceGrid").innerText = "Program wise Details";
    financeChart();
    setDrillDownValue(0, "");
}
function SetGlobalID(gID)
{
    $("#hdGlobalID").val(gID);
}


