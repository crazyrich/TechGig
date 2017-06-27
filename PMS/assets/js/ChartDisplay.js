$(document).ready(function () {
    var Bardata = {
        labels: ["Ph.Data Warehouse", "Systems Integration", "Ph. Business Support", "Infrastructure stability", "Outpatient Ph. Repla"],
        datasets: [
            {
                label: "My First dataset",
                borderWidth: 1,
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
                barWidth: 3.5,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [5, 15, 20, 2, 1]
            },
            {
                label: "My Second dataset",
                borderWidth: 1,
                barWidth: 3.5,
                multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
                fillColor: "rgba(0,153,0,0.5)",
                strokeColor: "rgba(0,153,0,0.8)",
                highlightFill: "rgba(0,153,0,0.75)",
                highlightStroke: "rgba(0,153,0,1)",
                data: [5, 56, 30, 19, 16]
            }
        ]
    };
   
    var cbx = $("#mybarChart").get(0).getContext("2d");
    new Chart(cbx).Bar(Bardata);
  

    var data = [
          {
              value: 300,
              color: "#dd4b39",
              highlight: "#dd4b39",
              label: "Red"
          },
          {
              value: 50,
              color: "#00a65a",
              highlight: "#00a65a",
              label: "Green"
          },
          {
              value: 100,
              color: "#db8b0b",
              highlight: "#db8b0b",
              label: "Yellow"
          }
    ];

    $(document).ready(
        function () {
            var ctx = $("#myChart").get(0).getContext("2d");
            var myNewChart = new Chart(ctx).Pie(data);

            $("#myChart").click(
                function (evt) {
                    var activePoints = myNewChart.getSegmentsAtEvent(evt);
                    var url = "http://example.com/?label=" + activePoints[0].label + "&value=" + activePoints[0].value;
                   // alert(url);
                }
            );
        }
    );

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


    var PieFoptions = {
        segmentShowStroke: false,
        animateRotate: true,
        animateScale: false,
        percentageInnerCutout: 50,
        tooltipTemplate: "<%= value %>%"

    };
    var PieFdata = [
{
    value: 300,
    color: "#F7464A",
    highlight: "#FF5A5E",
    label: "Red",
    labelColor: "black",
    labelFontSize: 12
},
{
    value: 50,
    color: "#46BFBD",
    highlight: "#5AD3D1",
    label: "Green",
    labelColor: "black",
    labelFontSize: '16px'
},
{
    value: 100,
    color: "#FDB45C",
    highlight: "#FFC870",
    label: "Yellow",
    labelColor: "black",
    labelFontSize: '16px'
}
    ];
    // Get the context of the canvas element we want to select
    var MyPiaChart = $("#MyPie").get(0).getContext("2d");//document.getElementById("countries").getContext("2d");

    //new Chart(countries).Doughnut(data, {animateScale: true});
    // new Chart(countries).Pie(data,options);
    new Chart(MyPiaChart).Pie(PieFdata, PieFoptions);



    $('btnbar').click(function () {
       // alert('hi');
        
    });
    $('button').click(function () {
       // alert('hello, world');
    });
    $('button').click(function () {
       // alert('hello, world');
    });
    $('button').click(function () {
     //   alert('hello, world');
    });

    function labelFormatter(label, series) {
        return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
                + label
                + "<br>"
                + Math.round(series.percent) + "%</div>";
    }
});