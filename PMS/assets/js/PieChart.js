$(document).ready(function () {
    var Bardata = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                borderWidth: 1,
                barWidth: 1.5,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [28, 48, 80, 81, 56, 55, 50]
            },
            {
                label: "My Second dataset",
                borderWidth: 1,
                barWidth: 1.5,
                fillColor: "rgba(0,153,0,0.5)",
                strokeColor: "rgba(0,153,0,0.8)",
                highlightFill: "rgba(0,153,0,0.75)",
                highlightStroke: "rgba(0,153,0,1)",
                data: [28, 48, 40, 19, 50, 27, 50]
            }
        ]
    };

    var cbx1 = $("#mybarChart1").get(0).getContext("2d");
    new Chart(cbx1).Bar(Bardata);

   
 
    var PieFoptions = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: true,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    };
    var PieFdata = [
{
    value: 200,
    color: "#dd4b39",
    highlight: "#dd4b39",
    label: "Red",
    labelColor: "black",
    labelFontSize: 12
},
{
    value: 150,
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


    var MyPiaChart1 = $("#MyPie1").get(0).getContext("2d");//document.getElementById("countries").getContext("2d");
    new Chart(MyPiaChart1).Pie(PieFdata, PieFoptions);


    function labelFormatter(label, series) {
        return '<div style="font-size:13px; text-align:center; padding:2px; color: #fff; font-weight: 600;">'
                + label
                + "<br>"
                + Math.round(series.percent) + "%</div>";
    }
});