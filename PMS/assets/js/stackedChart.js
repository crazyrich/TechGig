window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer",
    {
        title: {
            text: "Coal Reserves of Countries"
        },
        data: [
      {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
          { y: 111338, label: "USA" },
          { y: 49088, label: "Russia" },
          { y: 62200, label: "China" },
          { y: 90085, label: "India" },
          { y: 38600, label: "Australia" },
          { y: 48750, label: "SA" }

          ]
      }, {
          type: "stackedColumn",
          click: onClick,
          dataPoints: [
         { y: 135305, label: "USA" },
         { y: 107922, label: "Russia" },
         { y: 52300, label: "China" },
         { y: 3360, label: "India" },
         { y: 39900, label: "Australia" },
         { y: 0, label: "SA" }

          ]
      }
        ]
    });

    chart.render();
    function onClick(e) {
        //alert(e.dataSeries.type + ", dataPoint { x:" + e.dataPoint.x + ", y: " + e.dataPoint.y + " }");
    }
}