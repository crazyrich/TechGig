window.onload = function () {

    //................................................................

    Array.max = function (array) {

        return Math.max.apply(Math, array);

    };

 

    //divBlue

    //$('#divBlue').on('click','a', function (event) {

    //    //alert(event.target);

    //    //// if (event.target == './index.html#ReBar-chart' || event.target == './index.html#Resource-Histogram-chart' || event.target == './index.html#ReBar-ChartType' || event.target == './index.html#ReBar-ChartLocation')

    //    //if(event.target.type=='a')

    //    //{

    //        RestoreResourceChart();

    //    //}

    

    //});

 

    // get all values

    var counts = $('#heat-map-3 tbody td').not('.stats-title').map(function () {

        return parseInt($(this).text());

    }).get();

 

    // return max value

    var max = Array.max(counts);

    yr = 251;

    yg = 121;

    yb = 105;

 

    xr = 138;

    xg = 251;

    xb = 107;

 

    n = 100;

 

    // add classes to cells based on nearest 10 value

    $('#heat-map-3 tbody td').not('.stats-title').each(function () {

        var val = parseInt($(this).text());

        var pos = parseInt((Math.round((val / max) * 100)).toFixed(0));

        if (val < 6) {

            red = 0;

            green = 166;

            blue = 90;

 

        }

        if (val > 5 && val < 13) {

            red = 243;

            green = 156;

            blue = 18;

 

        }

        if (val > 12) {

            red = 221;

            green = 75;

            blue = 57;

        }

        //red = parseInt((xr + ((pos * (yr - xr)) / (n - 1))).toFixed(0));

        //green = parseInt((xg + ((pos * (yg - xg)) / (n - 1))).toFixed(0));

        //blue = parseInt((xb + ((pos * (yb - xb)) / (n - 1))).toFixed(0));

        clr = 'rgb(' + red + ',' + green + ',' + blue + ')';

        $(this).css({ backgroundColor: clr });

    });

    function labelFormatter(label, series) {

        return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'

                + label

                + "<br>"

                + Math.round(series.percent) + "%</div>";

    }

 

 

   

 

    CanvasJS.addColorSet("ResHistgreenShades",

               [//colorSet Array

                "#A92424",

               "#CF3838",

               //"#E14747",

               "#F65353"

               ]);

    var chart = new CanvasJS.Chart("A",

    {

        height: 320,

        colorSet: "ResHistgreenShades",

        axisX: {

            labelFontSize: 12,

            gridThickness: 0,

            labelMaxWidth: 70,

        },

 

        axisY: {

            labelFontSize: 12,

            gridThickness: 0

        },

        data: [

      {

          indexLabel: "{y}",

          indexLabelFontColor: "grey",

          indexLabelPlacement: "outside",

          type: "stackedColumn",

          click: onClick,

          legendText: "High Impact",

          showInLegend: true,

          dataPoints: [

          { y: 3, label: "Ph.Data" },

          { y: 5, label: "Systems" },

          { y: 7, label: "Ph. Business" },

          { y: 12, label: "Infrastructure" },

          { y: 15, label: "Outpatient" }//,

          //{ y: 8, label: "Jun" }

 

          ]

      },

      {

          type: "stackedColumn",

          click: onClick,

          legendText: "Medium Impact",

          showInLegend: true,

          dataPoints: [

         { y: 12, label: "Ph.Data" },

          { y: 15, label: "Systems" },

          { y: 17, label: "Ph. Business" },

          { y: 22, label: "Infrastructure" },

          { y: 25, label: "Outpatient" }//,

          //{ y: 18, label: "Jun" }

 

          ]

      },

      {

          type: "stackedColumn",

          click: onClick,

          legendText: "Low Impact",

          showInLegend: true,

          dataPoints: [

         { y: 8, label: "Ph.Data" },

          { y: 5, label: "Systems" },

          { y: 12, label: "Ph. Business" },

          { y: 2, label: "Infrastructure" },

          { y: 9, label: "Outpatient" }//,

          //{ y: 11, label: "Jun" }

 

          ]

      }

        ]

    });

 

    chart.render();

    function onClick(e) {

        //alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");

    }

    ///....................IssueHisto

 

    CanvasJS.addColorSet("IssueHistgreenShades",

               [//colorSet Array

 

               "#0000FF",

               "#3c8dbc",

               "#00c0ef"

               ]);

    var chart = new CanvasJS.Chart("IssueHistochartContainer",

    {

        height: 320,

        colorSet: "IssueHistgreenShades",

        axisX: {

            labelFontSize: 12,

            gridThickness: 0,

            labelMaxWidth: 70

        },

 

        axisY: {

            labelFontSize: 12,

            gridThickness: 0

        },

        data: [

      {

          type: "stackedColumn",

          click: onClick,

          legendText: "Critical",

          showInLegend: true,

          dataPoints: [

          { y: 3, label: "Ph.Data" },

          { y: 5, label: "Systems" },

          { y: 7, label: "Ph. Business" },

          { y: 12, label: "Infrastructure" },

          { y: 15, label: "Outpatient" }//,

          //{ y: 8, label: "Jun" }

 

          ]

      }, {

          type: "stackedColumn",

          click: onClick,

          legendText: "Major",

          showInLegend: true,

          dataPoints: [

         { y: 12, label: "Ph.Data" },

          { y: 15, label: "Systems" },

          { y: 17, label: "Ph. Business" },

          { y: 22, label: "Infrastructure" },

          { y: 25, label: "Outpatient" }//,

          //{ y: 18, label: "Jun" }

 

          ]

      },

      {

          type: "stackedColumn",

          click: onClick,

          legendText: "Minor",

          showInLegend: true,

          dataPoints: [

         { y: 8, label: "Ph.Data" },

          { y: 5, label: "Systems" },

          { y: 12, label: "Ph. Business" },

          { y: 2, label: "Infrastructure" },

          { y: 9, label: "Outpatient" }//,

         // { y: 11, label: "Jun" }

 

 

          ]

      }

        ]

    });

 

    chart.render();

    function onClick(e) {

        // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");

    }

    //..........issue PieChart

    CanvasJS.addColorSet("IssuegreenShades",

                [//colorSet Array

                "#f04f2d",

                "#0d31ff",

                "#668b8b",

                "#00cdcd",

                "#a2cd5a",

"#39cccc"]);

    var chart = new CanvasJS.Chart("IssuepiechartContainer",

       {

           height: 320,

           colorSet: "IssuegreenShades",

 

           legend: {

               maxWidth: 350,

               itemWidth: 120

           },

           data: [

              {

                  type: "pie",

                  showInLegend: false,

                  legendText: "{indexLabel}",

                  click: onClick,

                  fillOpacity: 1,

                  dataPoints: [

                           { y: 15, indexLabel: "PDW" },

                           { y: 30, indexLabel: "SI" },

                           { y: 40, indexLabel: "PBS" },

                           { y: 25, indexLabel: "IS" },

                           { y: 30, indexLabel: "OPR" }

 

                  ]

              }

           ]

       });

    chart.render();

    function onClick(e) {

       // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");

    }

    Array.max = function (array) {

        return Math.max.apply(Math, array);

    };

 

    // get all values

    var counts = $('#heat-map-3 tbody td').not('.stats-title').map(function () {

        return parseInt($(this).text());

    }).get();

 

    // return max value

    var max = Array.max(counts);

    yr = 251;

    yg = 121;

    yb = 105;

 

    xr = 138;

    xg = 251;

    xb = 107;

 

    n = 100;

 

    // add classes to cells based on nearest 10 value

    $('#heat-map-3 tbody td').not('.stats-title').each(function () {

        var val = parseInt($(this).text());

        var pos = parseInt((Math.round((val / max) * 100)).toFixed(0));

        if (val < 6) {

            red = 0;

            green = 166;

            blue = 90;

 

        }

        if (val > 5 && val < 13) {

            red = 243;

            green = 156;

            blue = 18;

 

        }

        if (val > 12) {

            red = 221;

            green = 75;

            blue = 57;

        }

        //red = parseInt((xr + ((pos * (yr - xr)) / (n - 1))).toFixed(0));

        //green = parseInt((xg + ((pos * (yg - xg)) / (n - 1))).toFixed(0));

        //blue = parseInt((xb + ((pos * (yb - xb)) / (n - 1))).toFixed(0));

        clr = 'rgb(' + red + ',' + green + ',' + blue + ')';

        $(this).css({ backgroundColor: clr });

    });

    function onClick(e) {

        // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");

    }

}

 

function bindResourceRoleChart(value, flagValue) {

    var allProgramProject = [];

    var distinctProgramProject = [];

    var temp = [];

    var data=[];

    var count = 0;

    for (var i in value) {

        allProgramProject.push(value[i].label);

    }

    distinctProgramProject = allProgramProject.filter(function (item, i, allProgramProject) {

        return i == allProgramProject.indexOf(item);

    });

    for (var i = 0; i < distinctProgramProject.length; i++)

    {

        for(var j=0;j<value.length;j++)

        {

            if(value[j].label.trim()==distinctProgramProject[i].trim() && value[j].y>0)

            {

                count++;

            }

        }

        if(count>0)

        {

            temp.push({ distinctProgramProject: distinctProgramProject[i].trim() });

            count = 0;

        }

    }

 

 

    var flag = flagValue;
    var mousePointer = "pointer";
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (flagValue == 1 || hdnFieldValueForProject[3]=='N')
        mousePointer = "default";

    var record = [];

    var typeDetails = [];

    for (var i = 0; i < distinctDesignation.length; i++) {

        for (var k = 0; k < value.length; k++) {

            if (distinctDesignation[i].trim() == value[k].designation.trim()) {

                record.push({ y: value[k].y, label: value[k].label, programId: value[k].programid });

            }

        }



    }

    for (var j = 0; j < distinctDesignation.length; j++) {

        for (var i = 0; i < temp.length; i++) {

            for (var k = 0; k < value.length; k++) {

                if (temp[i].distinctProgramProject.trim() == value[k].label.trim() && distinctDesignation[j].trim() == value[k].designation.trim()) {

                    data.push({ y: value[k].y, label: value[k].label, programId: value[k].programid });

                }

            }

 

        }

        typeDetails.push({

 

            indexLabel: "{y}",

            indexLabelFontColor: "white",

            indexLabelPlacement: "inside",

            indexLabelFormatter: function (e) {

                if (e.dataPoint.y > 0)

                { return e.dataPoint.y }

                else {

                    return ''

                }

            },

            cursor: mousePointer,

            type: "stackedColumn",

            legendText: distinctDesignation[j].trim(),

            showInLegend: true,

            click: onResourceBarClick,

            dataPoints: data

 

        });

        data = [];

    }

 

    CanvasJS.addColorSet("ResHistgreenShades1",

              [//colorSet Array

                   "#9575CD",

                   "#7986CB",

                   "#5E35B1",

                   "#0277BD",

                   "#BA68C8",

                   "#00ACC1",

                   "#03A9F4",

                   "#4DB6AC"

 

              ]);

 

    var yearMonth = getYearAndMonth();

    var Title = "Resource Role Distribution For " + yearMonth.month + ',' + yearMonth.year;

 

    var chartResource = new CanvasJS.Chart("chartContainer",

   {

 

       height: 320,

       colorSet: "ResHistgreenShades1",

       title: {

           text: Title,

           fontSize: 20,

           verticalAlign: "bottom"

       },

       axisX: {

           labelFontSize: 12,

           gridThickness: 0,

           labelMaxWidth: 70

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

    chartResource.render();

    function onResourceBarClick(e) {

        if (flag == 0) {

            resourceDrillToProjectLevel = 1;

            drillDownProgramName = e.dataPoint.label.trim();

            SetBreadCrumbForResource(drillDownProgramName);

            drillDownProgramID = e.dataPoint.programId;

            BindDataToResourceGrid(drillDownProgramID);

            var PermissionList = EditPermissionListForLoginUser;
            $.each(PermissionList, function (j, it) {
                if (it.PID == drillDownProgramID && it.EditPermission == 'N')
                    document.getElementById("editResource").style.visibility = "hidden";
                else if (it.PID == drillDownProgramID && it.EditPermission == 'Y')
                { document.getElementById("editResource").style.display = "block"; }
            });

            getResourceRoleChart();

            getResourceUtilizationChart();

            getResourceTypeChart();

            getResourceLocationChart();

            flag = 1;

            document.getElementById('PortfolioBreadcrumbForResource').onclick = RestoreResourceChart;
            document.getElementById('PortfolioBreadcrumbForResource').style.cursor = "pointer";


        }

 

    }

}

 

function bindResourceUtilzationChart(data, flagValue, getStackDataForResource, distinctProjectID) {

    var flag = flagValue;

 

    var plannedHours = [];

 

    var utilizedHours = [];

    var flag = flagValue;
    var mousePointer = "pointer";
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (flagValue == 1 || hdnFieldValueForProject[3] == 'N')
        mousePointer = "default";

    for (var i = 0; i < data.length; i++) {

        plannedHours[i] = { y: data[i].plannedhours, label: data[i].label, programid: data[i].programid };

 

        utilizedHours[i] = { y: data[i].utilizedhours, label: data[i].label, programid: data[i].programid };

 

    }

 

    var yearMonth = getYearAndMonth();

    var Title = "Resource Utilization For " + yearMonth.month + ',' + yearMonth.year;

 

 

    var chartResource = new CanvasJS.Chart("barchartContainerforresource",

 

   {

       title: {

           text: Title,

           fontSize: 20,

           verticalAlign: "bottom"

       },

       height: 320,

 

       axisX: {

 

           //labelAngle: 45,

 

           labelFontSize: 12,

 

           labelAutoFit: true,

 

           gridThickness: 0,

           labelMaxWidth: 70

 

       },

 

       axisY: {

 

           titleFontSize: 12,

 

           labelFontSize: 12,

 

           labelAutoFit: true,

 

           gridThickness: 0

 

       },

 

       legend: {

 

           verticalAlign: "bottom",

 

           horizontalAlign: "vertical"

 

       },

       toolTip: {

           enabled: false,

       },

 

       data: [

        {

            indexLabel: "{y}",

            indexLabelFontColor: "grey",

            indexLabelPlacement: "outside",

            indexLabelOrientation: "vertical",

            click: onResourceUtilizationBarClick,

 

            color: "#80CBC4",

 

            type: "column",

 

            legendText: "Planned Hours",

 

            showInLegend: true,

            cursor: mousePointer,

            dataPoints: plannedHours

 

        },

 

        {

            indexLabel: "{y}",

            indexLabelFontColor: "grey",

            indexLabelPlacement: "outside",

            indexLabelOrientation: "vertical",

            click: onResourceUtilizationBarClick,

 

            color: "#8BC34A",

 

            type: "column",

 

            legendText: "Utilized Hours",

 

            showInLegend: true,

            cursor: mousePointer,

            dataPoints: utilizedHours

 

        }

 

       ]

 

   });

 

    chartResource.render();

 

    function onResourceUtilizationBarClick(e) {

        if (flag == 0) {

            resourceDrillToProjectLevel = 1;

            drillDownProgramName = e.dataPoint.label.trim();

            SetBreadCrumbForResource(drillDownProgramName);

            drillDownProgramID = e.dataPoint.programid;

            BindDataToResourceGrid(drillDownProgramID);

            var PermissionList = EditPermissionListForLoginUser;
            $.each(PermissionList, function (j, it) {
                if (it.PID == drillDownProgramID && it.EditPermission == 'N')
                    document.getElementById("editResource").style.visibility = "hidden";
                else if (it.PID == drillDownProgramID && it.EditPermission == 'Y')
                { document.getElementById("editResource").style.display = "block"; }
            });


            getResourceUtilizationChart();

            getResourceRoleChart();

            getResourceTypeChart();

            getResourceLocationChart();

            flag = 1;

            document.getElementById('PortfolioBreadcrumbForResource').onclick = RestoreResourceChart;
            document.getElementById('PortfolioBreadcrumbForResource').style.cursor = "pointer";

        }

    }

 

}

 

function bindResourceTypeChart(value, distinctDesignation, distinctResourceType)

{

    var distinctDesignation = [];
    var designation = [];

    $.each(value, function (k, item) {
        if (item.totalCount > 0 ) {
            designation.push(value[k].label);
        }
    });
    //for (var i in value) {
    //    designation.push(value[i].label);
    //}
    distinctDesignation = designation.filter(function (item, i, designation) {
        return i == designation.indexOf(item);
    });



    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

 

    var typeDetails = [];

    var temp = [];

    var record = [];
    var flag = 0;
    var count=0;


            for (var i = 0; i < distinctResourceType.length; i++) {

                for (var j = 0; j < distinctDesignation.length; j++) {
                    var flag = 0;
                    $.each(value, function (k, item) {
                        if (item.resourceType.trim() == distinctResourceType[i].trim() && item.totalCount > 0 && distinctDesignation[j].trim() == item.label.trim()) {
                            record.push({ y: item.totalCount, label: item.label.trim() });
                        }
                    });


                    $.each(record, function (l, temp) {
                        if (distinctDesignation[j].trim() == temp.label.trim())
                            flag = 1;
                    });
                    if (flag == 0) {
                        record.push({ y: 0, label: distinctDesignation[j].trim() });
                    }

                }

 

        typeDetails.push({

            indexLabel: "{y}",

            indexLabelFontColor: "white",

            indexLabelPlacement: "inside",

 

            type: "stackedColumn",

            legendText: distinctResourceType[i].trim(),

            showInLegend: true,

            click: onResourceBarClick,

            dataPoints: record

        });

        record = [];

    }

 

 

    CanvasJS.addColorSet("RessourceChartColors",

              [//colorSet Array

 

              "#4661EE",

              "#1BCDD1",

              "#81D4FA",

              "#4DB6AC",

              "#00ACC1"

 

              ]);

    var yearMonth = getYearAndMonth();

    var Title = "Resource Type Distribution For " + yearMonth.month + ',' + yearMonth.year;

 

    var chartResource = new CanvasJS.Chart("barchartContainerForResourceType",

   {

 

       height: 320,

       colorSet: "RessourceChartColors",

       title: {

           text: Title,

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

       }, toolTip: {

           enabled: false,

       },

       data: typeDetails

   });

    chartResource.render();

    function onResourceBarClick(e) {

 

    }

}

 

function bindResourceLocationChart(value, distinctDesignation, distinctResourceLocation)

{

    var locationDetails = [];

    var record = [];

    var distinctDesignation = [];
    var designation = [];


    var data = [];
    $.each(value, function (i, item) {
        if (item.totalCount > 0) {
            data.push({ label: item.label, resourceLocation: item.resourceLocation.trim(), totalCount: item.totalCount });
        }
    });


    for (var i in data) {
        designation.push(data[i].label);
    }
    distinctDesignation = designation.filter(function (item, i, designation) {
        return i == designation.indexOf(item);
    });



    for (var i = 0; i < distinctResourceLocation.length; i++) {

        for (var j = 0; j < distinctDesignation.length; j++) {
            var flag = 0;
            $.each(data, function (k, item) {
                if (item.resourceLocation.trim() == distinctResourceLocation[i].trim() && item.totalCount > 0 && distinctDesignation[j].trim() == item.label.trim()) {
                    record.push({ y: item.totalCount, label: item.label.trim() });
                }
            });


                $.each(record, function (l, temp) {
                    if (distinctDesignation[j].trim() == temp.label.trim())
                        flag = 1;
                });
                if (flag == 0) {
                    record.push({ y: 0, label: distinctDesignation[j].trim() });
                }

        }


        locationDetails.push({

            indexLabel: "{y}",

            indexLabelFontColor: "white",

            indexLabelPlacement: "inside",

 

            type: "stackedColumn",

            legendText: distinctResourceLocation[i].trim(),

            showInLegend: true,

            click: onResourceLocationBarClick,

            dataPoints: record

        });

        record = [];

    }

 

    CanvasJS.addColorSet("RessourceChartColors",

              [//colorSet Array

 

                "#1565C0",

                "#03A9F4",

                "#9FA8DA",

                "#B39DDB",

                "#1E88E5"

              ]);

 

    var yearMonth = getYearAndMonth();

    var Title = "Resource Location Distribution For " + yearMonth.month + ',' + yearMonth.year;

 

    var chartResource = new CanvasJS.Chart("barchartContainerForResourceLocation",

   {

 

       height: 320,

       colorSet: "RessourceChartColors",

       title: {

           text: Title,

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

       }, toolTip: {

           enabled: false,

       },

       data: locationDetails

   });

    chartResource.render();

    function onResourceLocationBarClick(e) {

 

    }

}

 

function getYearAndMonth() {

    var yearId = "yearforgrid0";

    var year = (document.getElementById(yearId).value).trim();

 

    var monthId = "monthforgrid0";

    monthNum = (document.getElementById(monthId).value).trim();

 

    var mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (i = 0; i < mth.length; i++) {

        if (i + 1 == monthNum)

        { month = mth[i]; }

    }

 

    var yearMonth = { "year": year, "month": month };

    return yearMonth;

}

 

 

 

 

 
 
