window.onload = function () {
    var chart = new CanvasJS.Chart("barchartContainer",
    {
        title: {
            text: "Top Oil Reserves"
        },
        axisY: {
            title: "Reserves(MMbbl)"
        },
        legend: {
            verticalAlign: "bottom",
            horizontalAlign: "center"
        },
        data: [


        {
            click: onClick,
            color: "#B0D0B0",
            type: "column",
            showInLegend: true,
            legendMarkerType: "none",
            legendText: "MMbbl = one million barrels",
            dataPoints: [
            { x: 10, y: 297571, label: "Venezuela" },
            { x: 20, y: 267017, label: "Saudi" },
            { x: 30, y: 175200, label: "Canada" },
            { x: 40, y: 154580, label: "Iran" },
            { x: 50, y: 116000, label: "Russia" },
            { x: 60, y: 97800, label: "UAE" },
            { x: 70, y: 20682, label: "US" },
            { x: 80, y: 20350, label: "China" }
            ]
        }
        ]
    });

    chart.render();
    function onClick(e) {
        //alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
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


}