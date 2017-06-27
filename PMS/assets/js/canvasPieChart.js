window.onload = function () {
    CanvasJS.addColorSet("greenShades",
                [//colorSet Array

                "#dd4b39",
                "#3d9970",
                "#01ff70",
                "#db8b0b",
"#39cccc"]);
    var chart = new CanvasJS.Chart("piechartContainer",
	{
	    colorSet: "greenShades",
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
    //    alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }


    var chart = new CanvasJS.Chart("barchartContainer",
    {
        axisX: {
            labelAngle: 135
        },

        axisY: {
            title: "No of Months"
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "vertical"
        },
        data: [

           
        {
            click: onClick,
            color: "#DCDCDC",
            type: "column",
            showInLegend: false,
            legendMarkerType: "none",
            dataPoints: [
            { x: 10, y: 15, label: "Ph.Data Warehouse" },
            { x: 20, y: 20, label: "Systems Integration" },
            { x: 30, y: 50, label: "Ph. Business Support" },
            { x: 40, y: 36, label: "Infrastructure stability" },
            { x: 50, y: 20, label: "Outpatient Ph. Repla" }
      
            ]
        },
        {
            click: onClick,
            color: "#009900",
            type: "column",
            showInLegend: false,
            legendMarkerType: "none",
            dataPoints: [
            { x: 10, y: 14, label: "Ph.Data Warehouse" },
             { x: 20, y: 12, label: "Systems Integration" },
             { x: 30, y: 8, label: "Ph. Business Support" },
             { x: 40, y: 15, label: "Infrastructure stability" },
             { x: 50, y: 30, label: "Outpatient Ph. Repla" }
            ]
        }
        ]
    });

    chart.render();
    function onClick(e) {
       // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }


    //................................................................
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
    function labelFormatter(label, series) {
        return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
                + label
                + "<br>"
                + Math.round(series.percent) + "%</div>";
    }

    //..................................
    CanvasJS.addColorSet("ResHistgreenShades",
               [//colorSet Array

               
               "#46BFBD",
               "#FDB45C"
]);
    var chart = new CanvasJS.Chart("chartContainer",
    {    colorSet:"ResHistgreenShades",
        
        data: [
      {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
          { y: 3, label: "Jan" },
          { y: 5, label: "Feb" },
          { y: 7, label: "Mar" },
          { y: 12, label: "Apr" },
          { y: 15, label: "May" },
          { y: 8, label: "Jun" },
           { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

          ]
      }, {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
         { y: 12, label: "Jan" },
          { y: 15, label: "Feb" },
          { y: 17, label: "Mar" },
          { y: 22, label: "Apr" },
          { y: 25, label: "May" },
          { y: 18, label: "Jun" },
          { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

          ]
      }
        ]
    });

    chart.render();
    function onClick(e) {
       // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }

    //.........................................................................................

    var chart = new CanvasJS.Chart("barchartContainerforresource",
    {
        axisX: {
            labelAngle: 135
        },

        axisY: {
            title: "No of Months"
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "vertical"
        },
        data: [


        {
            click: onClick,
            color: "#DCDCDC",
            type: "column",
            showInLegend: false,
            legendMarkerType: "none",
            dataPoints: [
            { x: 10, y: 15, label: "Ph.Data Warehouse" },
            { x: 20, y: 20, label: "Systems Integration" },
            { x: 30, y: 50, label: "Ph. Business Support" },
            { x: 40, y: 36, label: "Infrastructure stability" },
            { x: 50, y: 20, label: "Outpatient Ph. Repla" }

            ]
        },
        {
            click: onClick,
            color: "#009900",
            type: "column",
            showInLegend: false,
            legendMarkerType: "none",
            dataPoints: [
            { x: 10, y: 14, label: "Ph.Data Warehouse" },
             { x: 20, y: 12, label: "Systems Integration" },
             { x: 30, y: 8, label: "Ph. Business Support" },
             { x: 40, y: 15, label: "Infrastructure stability" },
             { x: 50, y: 30, label: "Outpatient Ph. Repla" }
            ]
        }
        ]
    });

    chart.render();
    function onClick(e) {
       // alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }
    ///....................RiskHisto

    CanvasJS.addColorSet("ResHistgreenShades",
               [//colorSet Array


               "#46BFBD",
               "#FDB45C"
               ]);
    var chart = new CanvasJS.Chart("RiskHistochartContainer",
    {
        colorSet: "ResHistgreenShades",

        data: [
      {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
          { y: 3, label: "Jan" },
          { y: 5, label: "Feb" },
          { y: 7, label: "Mar" },
          { y: 12, label: "Apr" },
          { y: 15, label: "May" },
          { y: 8, label: "Jun" },
           { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

          ]
      }, {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
         { y: 12, label: "Jan" },
          { y: 15, label: "Feb" },
          { y: 17, label: "Mar" },
          { y: 22, label: "Apr" },
          { y: 25, label: "May" },
          { y: 18, label: "Jun" },
          { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

          ]
      }
        ]
    });

    chart.render();
    function onClick(e) {
      //  alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }
    ///....................IssueHisto

    CanvasJS.addColorSet("IssueHistgreenShades",
               [//colorSet Array


               "#46BFBD",
               "#FDB45C"
               ]);
    var chart = new CanvasJS.Chart("IssueHistochartContainer",
    {
        colorSet: "IssueHistgreenShades",

        data: [
      {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
          { y: 3, label: "Jan" },
          { y: 5, label: "Feb" },
          { y: 7, label: "Mar" },
          { y: 12, label: "Apr" },
          { y: 15, label: "May" },
          { y: 8, label: "Jun" },
           { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

          ]
      }, {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
         { y: 12, label: "Jan" },
          { y: 15, label: "Feb" },
          { y: 17, label: "Mar" },
          { y: 22, label: "Apr" },
          { y: 25, label: "May" },
          { y: 18, label: "Jun" },
          { y: 7, label: "Jul" },
          { y: 12, label: "Aug" },
          { y: 15, label: "Sep" },
          { y: 8, label: "Oct" }

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

                "#dd4b39",
                "#3d9970",
                "#01ff70",
                "#db8b0b",
"#39cccc"]);
    var chart = new CanvasJS.Chart("IssuepiechartContainer",
	{
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
        //alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }
}
