

app.service('RiskService', ['$http', '$q', function ($http, $q) {


    var deferred = $q.defer();
    var id = document.getElementById('programid').value;
    //var Risks = {};

    this.getRisks = function () {

        //--------------------------------------
        var encoded = EncodeMe("mukesh" + ':' + "12345");
        var config = {
            headers: { 'Authorization': 'Basic ' + encoded }
        };
        //--------------------------------------


        return $http.get("api/risk/", config).then(function (response) {
            //alert("Response = " + response)
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



function EncodeMe(input) {

    var keyStr = 'ABCDEFGHIJKLMNOP' +
                 'QRSTUVWXYZabcdef' +
                 'ghijklmnopqrstuv' +
                 'wxyz0123456789+/' +
                 '=';
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}
app.controller('ControllerShowRisks', ['$scope', '$http', '$q', 'RiskService', function ($scope, $http, $q, RiskService) {


    RiskService.getRisks().then(function (result) {
        //  console.log(result);
       // alert("Risk success = " + result);
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
        console.log(Riskdata);
    }, function (error) {
        //alert("Risk error = " + result);
        console.log(error.statusText);
    });

    $scope.editRisksData = function () {
        //alert('Calling Update risk');
        var newJsonData = [];

        $.each(Riskdata, function (i, item) {

            newJsonData.push({ "RiskID": item.RiskID, "RiskTitle": item.RiskTitle, "ProjectID": item.ProjectID, "Description": item.Description, "Path": item.Path });
        });

        var dyntable = "<div><table id='tblRiskDataControl' class='table table-bordered table-hover'><thead>" +
"<tr><th>#</th><th>Risk Title</th><th>ProjectID</th><th>Description</th><th>Path</th><th>Action</th></tr></thead><tbody>";

        $.each(newJsonData, function (i, item) {

            dyntable += "<td><div></div></td><td><div style='display:none' >&nbsp;</div><div style='display:none' > " + item.RiskTitle + "</div>" + "<input type='hidden' value='" + item.RiskID + "' id='hidRiskId_" + i + "' />" + createDateTextbox(valueCheck(item.RiskTitle), i, "RiskTitle") + " </td>" +
                        "<td><div style='display:none' > " + item.ProjectID + "</div>" + createDateTextbox(valueCheck(item.ProjectID), i, "ProjectID") + "</td>" +
                             "<td><div style='display:none' > " + item.Description + "</div>" + createDateTextbox(valueCheck(item.Description), i, "Description") + "</td>" +
                             "<td><div style='display:none' > " + item.Path + "</div>" + createDateTextbox(valueCheck(item.Path), i, "Path") + "</td>" +
            "<td><button class='btn btn-sm btn-danger' onclick='DeleteRisk();'><i class='fa fa-trash'></i> Delete</button></td></tr>";

        });

        dyntable += "</tbody></table>";
        dyntable += "<table><tr><td align='right' valign='top' style='width:1000px'>";
        dyntable += "<button type='button' class='btn btn-primary' onclick='addMilestoneData()'>Insert Row</button>&nbsp;&nbsp"
        dyntable += "<button type='button' class='btn btn-primary' onclick='updateRiskGridData();';>Save</button>";

        dyntable += "</td></tr></table></div>";
        document.getElementById('divEditRiskGrid').innerHTML = "";
        document.getElementById('divEditRiskGrid').innerHTML = dyntable;

        createEditableRiskGrid();
    }



}]);


function createEditableRiskGrid() {


    var bugTable = $('#tblRiskDataControl').DataTable({
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

    var rows = $('#tblRiskDataControl tbody >tr');
    var arr = [];
    $.each(rows, function (indx, currentRow) {
        console.log("hee = " + currentRow);
        var ProjId = $(currentRow.innerHTML).find("#ProjectID" + indx + "").val();//hidRiskId_0
        var RiskId = $(currentRow.innerHTML).find("#hidRiskId_" + indx + "").val();
        var Desc = $(currentRow.innerHTML).find("#Description" + indx + "").val();
        var Path = $(currentRow.innerHTML).find("#Path" + indx + "").val();
        alert(" indx [" + indx + "] = " + RiskId);
        item = { "RiskID": RiskId, "ProjectID": ProjId, "Description": Desc, "Path": Path }
        arr.push(item);
    });

    $.each(arr, function (indx, currentItem) {

        alert("Path " + currentItem.Path);
    })

}


function DeleteRisk() {
    alert("btn = 1");
    //var arrTDs = $(btn).parents().siblings();
    //$.each(arrTDs, function (x, myVal) {

    //   alert("final = " +  arrTDs.find('input [type=text]').val());
    //});

}




app.controller('RiskController', ['$scope', '$http', '$q', function ($scope, $http, $q) {

    //alert("Inside Risk Controller ");


}]);



