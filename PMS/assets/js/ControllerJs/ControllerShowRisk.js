

app.service('RiskService', ['$http', '$q', function ($http, $q) {


    var deferred = $q.defer();
    var id = document.getElementById('programid').value;
    //var Risks = {};

    this.getRisks = function () {

        return $http.get("api/risk/").then(function (response) {
         //   alert("Response = " + response)
            deferred.resolve(response);
            return deferred.promise;
        }, function (response) {
            deferred.reject(response);
            return deferred.promise;
        });
    } // end function
    //return Risks;                    

} // end parameter function
]);

app.controller('ControllerShowRisks', ['$scope', '$http', '$q', 'RiskService', function ($scope, $http, $q, RiskService) {

    RiskService.getRisks().then(function (result) {
        //  console.log(result);
      //  alert("Risk success = " + result);
        var arr = result.data;
        $scope.Riskdata = result.data;
        //$.each(arr, function (indx, val) {
        //    //     alert("index [" + indx + "] and Title = " + val.RiskTitle);
        //    $scope.Riskdata.push(arr[indx]);
        //});
        //  $scope.Riskdata = result.data;
        console.log($scope.Riskdata);
    }, function (error) {
       // alert("Risk error = " + result);
        console.log(error.statusText);
    });


}]);

//ControllerUpdateRiskData


app.controller('ControllerUpdateRiskData', ['$scope', '$http', '$q', 'RiskService', function ($scope, $http, $q, RiskService) {

    var Riskdata = [];

    RiskService.getRisks().then(function (result) {

        var arr = result.data;
        Riskdata = result.data;
    }, function (error) {
       // alert("Risk error = " + result);
        console.log(error.statusText);
    });

    $scope.editRisksData = function ()
    {
        alert('Calling Update risk');
        var newJsonData = [];

        $.each(Riskdata, function (i, item) {

            newJsonData.push({ "RiskID": item.RiskID, "RiskTitle": item.RiskTitle, "ProjectID": item.ProjectID, "Description": item.Description, "Path": item.Path });
        });

        var dyntable = "<div><table id='tblRiskDataControl' class='table table-bordered table-hover'><thead>" +
"<tr><th>Risk Title</th><th>ProjectID</th><th>Description</th><th>Path</th><th>Action</th></tr></thead><tbody>";

        $.each(newJsonData, function (i, item) {

            dyntable += "<td><div style='display:none' > " + item.RiskTitle + "</div>" + "<input type='hidden' value='" + item.RiskID + "' id='hidRiskId' />" + createDateTextbox(valueCheck(item.RiskTitle), i, "RiskTitle") + "</td>" +
                        "<td><div style='display:none' > " + item.ProjectID + "</div>" + createDateTextbox(valueCheck(item.ProjectID), i, "ProjectID") + "</td>" +
                             "<td><div style='display:none' > " + item.Description + "</div>" + createDateTextbox(valueCheck(item.Description), i, "Description") + "</td>" +
                             "<td><div style='display:none' > " + item.Path + "</div>" + createDateTextbox(valueCheck(item.Path), i, "Path") + "</td>" +
            "<td><button class='btn btn-sm btn-danger' onclick='alert(" + item.ProjectID + ")'><i class='fa fa-trash'></i> Delete</button></td></tr>";

        });

        dyntable += "</tbody></table>";
        dyntable += "<table><tr><td align='right' valign='top' style='width:1000px'>";
        dyntable += "<button type='button' class='btn btn-primary' onclick='addMilestoneData()'>Insert Row</button>&nbsp;&nbsp"
        dyntable += "<button type='button' class='btn btn-primary' onclick='updateRiskGridData();';>Save</button>";

        dyntable += "</td></tr></table></div>";
        document.getElementById('divEditRiskGrid').innerHTML = "";
        document.getElementById('divEditRiskGrid').innerHTML = dyntable;

    }

    createResponsiveGrid();

}]);


function createResponsiveGrid() {
    var bugTable = $('#tblDataControl').DataTable({
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 0
        }],
        "order": [],
        responsive: true
    });

    bugTable.on('order.dt search.dt', function () {
        bugTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}


function valueCheck(item) {
    if (item === null || item === undefined)
        return " ";
    else
        return item;
}


function updateRiskGridData() {

    alert("Grid Updated ");

    var rows = $('#tblRiskDataControl tbody >tr');
    
    $.each(rows,function(indx, currentRow){
      var  RiskId =   currentRow.find("#hidRiskId").val()
    //  alert(" indx [" + indx + "] = " + RiskId);
    });

}


