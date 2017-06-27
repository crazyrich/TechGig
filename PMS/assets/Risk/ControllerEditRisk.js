var drilldownRisk = 0;
var riskPrgListDrpdwn = [];
var riskPrjListDrpdwn = [];
var distinctImpact = ["High", "Medium", "Low"];
app.service('RiskService', ['$http', '$q', function ($http, $q) {
    // alert("ALERTED");

    var deferred = $q.defer();

    this.getriskbyuserid = function () {
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var id=0;
        if (drilldownRisk == 0 && hdnFieldValueForProject[3] == 'Y') {
            id = $("#hdGlobalID").val();
        }
        else if (drilldownRisk == 1 && hdnFieldValueForProject[3] == 'Y') {
            id = drillDownRiskProgamId;
        }
        else {
            id = hdnFieldValueForProject[4];
        }
        //var id = $("#programid").val();
        //var id = $("#hdGlobalID").val();
        var person = JSON.parse(localStorage.getItem('LoginUser'));
       
        var url_api = "api/Risk/GetRiskForUser?programid=" + id + "&userid=" + person.UserName;
        var deferred = $q.defer();
        return $http({
            method: 'GET',
            url: url_api// 'api/Risk/GetRiskForUser?programid=" +id+"&userid="+person.userid'
            //params: 'programid: 0, userid: 1'

        }).success(function (data) {
            // With the data succesfully returned, call our callback


            deferred.resolve();
            //alert(List);
        }).error(function () {
            //alert("error");
            //return deferred.promise;
        });
        return deferred.promise;
    }
}
]);
app.controller('RiskController', ['$scope', '$http', '$q', 'RiskService', 'ProgrammeSrv', function ($scope, $http, $q, RiskService, ProgrammeSrv) {

    $scope.titleList = [];

    $scope.riskCountForTile = function () {

        RiskService.getriskbyuserid().then(function (successresponse) {

            
            $http.get(successresponse.config.url)
            .then(function (result) {
                $scope.riskValue = result.data;
                $scope.riskCount = $scope.riskValue.length;
                $scope.titleList = [];
                var j = 0;
                $.each(result.data, function (i, item) {
                    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
                    if (hdnFieldValueForProject[3] == 'Y') {
                        if (j < 3 && hdnFieldValueForProject[2] == item.Program_ID) {
                            $scope.titleList.push({ "RiskTitle": item.RiskTitle });
                            j++;
                        }
                    }
                    else
                    {
                        if (j < 3 && hdnFieldValueForProject[2] == item.ProjectID) {
                            $scope.titleList.push({ "RiskTitle": item.RiskTitle });
                            j++;
                        }
                    }
                })
            });

        });

    }
    $scope.riskDataForTable = function RiskDataTable(program) {
        var list = [];
        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        var pid = 0;

        if (programOrProject[3] == 'Y' && drilldownRisk == 0) {
            pid = $("#hdGlobalID").val(0);
        }
        else if ((programOrProject[3] == 'Y' && drilldownRisk == 1)) {
            pid = drillDownRiskProgamId;;
        }
        else {
            pid = programOrProject[4];
        }


        RiskService.getriskbyuserid().then(function (successresponse) {


            $.each(successresponse.data, function (i, item) {

                if (item.Status == 1)
                    list.push({ "riskid": item.RiskID, "risktitle": item.RiskTitle, "ProjectName": item.ProjectName, "programName": item.ProgramName, "projectid": item.ProjectID, "Impact": item.Impact, "status": item.Status, "description": item.Description, "itemType": item.ItemType, "ItemName": item.ItemName });
            });

            if (programOrProject[3] == 'Y' && drilldownRisk == 0) {
                var riskdatafortableprogram = "<table class='table'>" +
                                "<thead>" +
                                    "<tr>" +
                                       "<th>Program Name</th>" +
                                            "<th>Risk Title</th>" +
                                            "<th>Impact</th>" +
                                            "<th>Risk Type</th>" +
                                    "</tr>" +
                                 "</thead>" +
                                "<tbody >";

                if (Object.keys(list).length != 0) {

                    $.each(list, function (i, item) {
                        riskdatafortableprogram += "<tr>" +
                                     "<td width='20%'>" + item.programName + "</td>" +
                                     "<td width='45%'>" + item.risktitle + "</td>" +
                                     "<td width='10%'>" + item.Impact + "</td>" +
                                     "<td width='25%'>" + item.ItemName + "</td>" +
                                 "</tr>";
                    });
                } else {
                    riskdatafortableprogram += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available</td></tr>"

                }

            } else {
                var riskdatafortableprogram = "<table class='table'>" +
                                 "<thead>" +
                                     "<tr>" +
                                        "<th>Project Name</th>" +
                                             "<th>Risk Title</th>" +
                                             "<th>Impact</th>" +
                                             "<th>Risk Type</th>" +
                                     "</tr>" +
                                  "</thead>" +
                                 "<tbody >";

                if (Object.keys(list).length != 0) {

                    $.each(list, function (i, item) {
                        if (item.programName.trim() == program.trim()) {

                            riskdatafortableprogram += "<tr>" +
                                     "<td width='20%'>" + item.ProjectName + "</td>" +
                                     "<td width='45%'>" + item.risktitle + "</td>" +
                                     "<td width='10%'>" + item.Impact + "</td>" +
                                     "<td width='25%'>" + item.ItemName + "</td>" +
                                 "</tr>";
                        }
                    });
                }
                else {
                    riskdatafortableprogram += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available</td></tr>"

                }
            }

            $("#DivRiskDataForTable").html(riskdatafortableprogram);


            //
        }, function (error) {
            //alert("Error : " + error);
            console.log(error.statusText);

        });// end service call

        // var id = $("#programid").val();
        //    getItemTypeDetails();
    }
    $scope.editRiskGridData = function editGrid(chartId) {

        var id = 0;
        //var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

        //if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 0) {
        //    id = 0;
        //    ////if (chartId == "" || chartId == 'undefined' || chartId == null) {
        //    ////    id = $("#hdGlobalID").val();
        //    ////} else {
        //    ////    id = chartId;

        //    ////}
        //} else if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 1) {
        //    id = drilldownProgramClick;

        //}
        //else if (hdnFieldValueForProject[3] == 'N')
        //{
        id = $("#hdGlobalID").val();
        // }

        ProgrammeSrv.getProgramByUserID(id).then(function (successresponse) {
            //   riskPrgListDrpdwn = "";

            $.each(successresponse, function (i, item) {
                riskPrgListDrpdwn.push({ "PID": item.Program_Id, "PName": item.Program_Name });
            });

            //  var fxn = riskGetPrg(null, 'random', 0,list);
            //riskPrg(list);

        });

        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var list = [];
        var pid = 0;
        if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 0) {
            pid = $("#hdGlobalID").val();
        }
        else if ((hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 1)) {
            pid = drillDownRiskProgamId;;
        } else {
            pid = $("#hdGlobalID").val();
        }   

        var PermissionList = EditPermissionListForLoginUser;

        RiskService.getriskbyuserid(pid).then(function (successresponse) {

            $.each(successresponse.data, function (i, item) {

                $.each(PermissionList, function (j, it) {

                    if (it.PID == item.ProjectID && it.EditPermission == 'Y')

                        list.push({ "riskid": item.RiskID, "risktitle": item.RiskTitle, "projectid": item.ProjectID, "ProjectName": item.ProjectName, "programName": item.ProgramName, "Impact": item.Impact, "status": item.Status, "RiskResponseActionPlan": item.RiskResponseActionPlan, "description": item.Description, "itemType": item.ItemType });
                });
            });



            //RiskService.getriskbyuserid().then(function (successresponse) {
            //    $.each(successresponse.data, function (k, item) {
            //        //alert(i);
            //        riskList.push({ "riskID": item.RiskID, "riskTitle": item.RiskTitle, "projectID": item.ProjectID, "programName": item.ProgramName, "status": item.Status, "description": item.Description });  <th>Project ID</th>
            //    });

            var dyntable = "<div><table  id='tblRiskDataControl' class='table table-bordered table-hover'><thead>" + "<tr><th></th><th  style='padding: 0px;width:0px;'></th><th>Program Name</th><th>Project Name</th><th>Risk Title</th><th>Description</th><th>Impact</th><th>Risk Type</th><th>Status</th><th></th></tr></thead><tbody>";
            var i = 0;
            $.each(list, function (j, item) {

                var ID = "RiskID" + i;
                //var RID = "RiskID" + i;
                var program = "programRisk" + i;
                var project = "projectRisk" + i;
                var status = "statusRisk" + i;
                var description = "descriptionRisk" + i;

                dyntable +=
                            "<tr id='RiskRow" + i + "'>" +
                            "<td><div> </div></td>" +
                            "<td><div id=" + ID + " style='display:none; padding: 0px;width:0px;'> " + item.riskid + "</div></td>" +

                             "<td ><div style='display:none;'> " + item.programName + "</div><div id=" + program + " style='display:none;'> " + item.programName + "</div><lable style='font-weight: normal'>" + item.programName + "</label></td>" +
                             "<td ><div style='display:none;'> " + item.ProjectName + "</div><div id=" + project + " style='display:none;'> " + item.ProjectName + "</div><label style='font-weight: normal'>" + item.ProjectName + "</label></td>" +
                            "<td ><div style='display:none;'> " + item.risktitle + "</div>" + createTextArea(valueCheck(item.risktitle), i, "RiskTitle", "AlphaNumeric") + "</td>" +

                           "<td ><div style='display:none;'> " + item.description + "</div>" + createTextArea(valueCheck(item.description), i, "descriptionRisk", "") + "</td>" +
                            "<td> <div style='display:none' > " + item.Impact + "</div>" + createImpactDropDown(item.Impact, i, "Risk") + "</td>" +
                            "<td> <div style='display:none' > " + item.itemType + "</div>" + createItemTypeDropDown(item.itemType, i, "Risk") + "</td>" +

                            "<td> <div style='display:none' > " + item.status + "</div>" + createStatusDropDown(item.status, i, "Risk") + "</td>" +

                //"<td><a  onclick='getTrueFalseDeleteRisk(" + item.riskid + ")'><i class='glyphicon glyphicon-trash' style='color:red;'> </i></a></td></tr>";
                "<td><a  href='javascript:void(0)' onclick='getTrueFalseDeleteRisk(" + item.riskid + ")'><i class='glyphicon glyphicon-trash'> </i>  </a><a  href='javascript:void(0)' onclick='addRiskData()'><i class='glyphicon glyphicon-plus'> </i>  </a></td></tr>";

                i = i + 1;

            });
            dyntable += "</tbody></table>";
            dyntable += "<table><tr><td align='right' valign='top' style='width:1000px;padding:4px;'>";
            dyntable += "<button type='button' onclick='cancelSaveRisk();' class='btn btn-secondary'>Cancel</button></td><td align='right' valign='top' style='padding:4px;'>";

            dyntable += "<button style='display:none;' id='InsertRowButtonForRisk' type='button' class='btn btn-primary' onclick='addRiskData()'>Insert Row</button>&nbsp;&nbsp</td>"

            dyntable += "<td align='right' valign='top' style='padding:4px;'><button type='button' class='btn btn-primary' onclick='updateRiskGridData();';>Save</button>";

            dyntable += "</td></tr></table></div>";
            document.getElementById('divEditRiskGrid').innerHTML = "";
            document.getElementById('divEditRiskGrid').innerHTML = dyntable;

            if (Object.keys(list).length <= 0)
                $('#InsertRowButtonForRisk').css("display", "block");

            createResponsiveGrid("tblRiskDataControl");

        }, function (error) {
            //alert("Error : " + error);
            console.log(error.statusText);

        });// end service call

        //  list = "";

    }
    $scope.riskGetPrograms = function riskPrograms(i, isSelected, newOrExisting, cell) {

        // riskPrg(list, i, isSelected, newOrExisting);
        var id = $("#hdGlobalID").val();
        var list = [];
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

        var PermissionList = EditPermissionListForLoginUser;

        var askForPromise = ProgrammeSrv.getProgramByUserID(0);
        askForPromise.then(function (successresponse) {
            $.each(successresponse, function (i, item) {
                //alert(i);
                
                $.each(PermissionList, function (j, it) {

                    if (it.PID == item.Program_Id && it.EditPermission == 'Y')

                        list.push({ "PID": item.Program_Id, "PName": item.Program_Name });
                });

            });

            var jsonData = list;
            var newJsonData = list;
            var data = [];
            if (newOrExisting == 0) { var data = ""; }
            else {

                var data = "<option value='0'> Please select </option>";
            }

            if (hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 0) {
                $.each(newJsonData, function (i, item) {
                    if (item.PName.trim() == isSelected.trim()) {
                        // data.push({ text: item.PName, value: item.PID });
                        data += "<option value=" + item.PID + " selected='selected'>" + item.PName + "</option>";
                    }
                    else {
                        //data.push({ text: item.PName, value: item.PID });
                        data += "<option value=" + item.PID + ">" + item.PName + "</option>";
                    }
                });
            }

            else if ((hdnFieldValueForProject[3] == 'Y' && drilldownRisk == 1)) {
                var program = drillDownRiskProgramName;
                $.each(newJsonData, function (i, item) {

                    if (program.trim() == item.PName.trim()) {


                        // data.push({ text: item.PName, value: item.PID });
                        data += "<option value=" + item.PID + ">" + item.PName + "</option>";


                    }
                });

            }
            else {
                var program = document.getElementById('idBrdScrProgName').innerHTML;
                $.each(newJsonData, function (i, item) {

                    if (program.trim() == item.PName.trim()) {


                        // data.push({ text: item.PName, value: item.PID });
                        data += "<option value=" + item.PID + ">" + item.PName + "</option>";


                    }
                });

            }

            //else if (hdnFieldValueForProject[3] == 'N' || drilldownRisk == 1) {

            //    $.each(newJsonData, function (i, item) {
            //        if (item.PName.trim() == isSelected.trim()) {
            //            // data.push({ text: item.PName, value: item.PID });
            //            data += "<option value=" + item.PID + " selected='selected'>" + item.PName + "</option>";
            //        }
            //        else {
            //            if (item.PName.trim() == document.getElementById('idBrdScrProgName').innerHTML ) {
            //                //data.push({ text: item.PName, value: item.PID });
            //            data += "<option value=" + item.PID + ">" + item.PName + "</option>";

            //            }

            //        }
            //    });


            // }

            var id = "programRisk" + i;
            //  drpDownProgram = "<select data-ctl='" + "projectRisk" + i + "' id='" + id + "'onchange='createRiskProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + data + "</select>"

            drpDownProgram = "<select data-ctl='" + "projectRisk" + i + "' id='" + id + "'onchange='createRiskProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + data + "</select>";

            // drpDownProgram = "<select data-ng-options='s.text for  s  in  data' data-ctl='" + "projectRisk" + i + "' id='" + id + "'onchange='createRiskProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'></select>";


            cell.innerHTML = drpDownProgram;
            return drpDownProgram = "<select data-ctl='" + "projectRisk" + i + "' id='" + id + "'onchange='createRiskProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + data + "</select>";

        });
    }
    $scope.createRiskProjectDropDown2 = function (ctl, rowid, flag, programID, projectName) {


        var data = "";
        var selProject = "";

        if ((projectName == '' && ctl == null)) {
            selProject += "<option value='0'> Please select </option>";
        }
        else {

            var SelectedProgram = $(ctl).val();
            var list = [];
            var PermissionList = EditPermissionListForLoginUser;
            ProgrammeSrv.getProgramByUserID(SelectedProgram).then(function (successresponse) {

                $.each(successresponse, function (i, item) {
                    $.each(PermissionList, function (j, it) {

                        if (it.PID == item.Program_Id && it.EditPermission == 'Y')

                            list.push({ "PID": item.Program_Id, "PName": item.Program_Name });
                    });
                });
                var newJsonData = list;

                if (ctl == 'undefined' || ctl == null) {

                    data = "<option value='0'> Please select </option>";
                    $.each(jsonData, function (i, item) {

                        if (item.ParentID == programID) {
                            newJsonData.push({ "Program_Id": item.PID, "Parent_Id": item.ParentID, "Program_Name": item.PName });
                        }
                    });
                    $.each(newJsonData, function (i, item) {
                        if (item.Parent_Id == programID && item.Program_Name == projectName) {
                            selProject += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                        }
                    });

                    $.each(newJsonData, function (i, item) {
                        if (item.Parent_Id == programID && item.Program_Name != projectName) {
                            selProject += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                        }
                    });
                }
                else {
                    var newCtlId = $(ctl).attr('data-ctl');
                    var selProject = $("#" + newCtlId);
                    $(selProject).empty();
                    var SelectedProgram = $(ctl).val();
                    if (SelectedProgram == "0") { selProject.append("<option value='0'> Please select </option>"); }
                    else {

                        var JsonData = [];
                        $.each(newJsonData, function (i, item) {
                            selProject.append("<option value=" + item.PID + ">" + item.PName + "</option>");
                        });
                    }
                }

            });

        }
        //e
        var id = "projectRisk" + rowid;
        var drpDownProgram = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px; width:160px;'>" + selProject + "</select>";
        return drpDownProgram;
    }

    $scope.$on('handleBroadcast', function (event, args) {

        $scope.titleList = [];
        $scope.riskCountForTile();

    });
   


}]);


function cancelSaveRisk() {

    $('#divEditRisk').css("display", "none");

}

function createRiskProjectDropDown(ctl, rowid, flag, programID, projectName, module) {
    angular.element(document.getElementById('DivRiskDataForTable')).scope().createRiskProjectDropDown2(ctl, rowid, flag, programID, projectName, module);
}
function addRiskData() {

    var program = 0;
    var table = document.getElementById('tblRiskDataControl').getElementsByTagName('tbody')[0];
    //  var row = table.insertRow(table.rows.length);
    //var row = table.insertRow(0);
    var rows = $('#tblRiskDataControl tbody >tr');
    var Ftd = $(rows[0]).find('td').first();


    var StrtIndx = parseInt($(Ftd).html()) - 1;

    var endIndx = StrtIndx + table.rows.length;

    var row1 = endIndx;
    var RID = "RiskID" + row1;

    var rowID = "RiskRow" + row1;

    var row = table.insertRow(table.rows.length);
    row.id = rowID;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    //$(cell2).css("padding", "0px");
    //$(cell2).css("width", "0px");
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    //var cell11 = row.insertCell(10);
    var rcID = "ID" + row1;

    cell1.innerHTML = "<border:0px;outline:0px;'>";
    cell2.innerHTML = "<div id=" + RID + " style='display:none;'></div>";

    cell3.innerHTML = angular.element(document.getElementById('DivRiskDataForTable')).scope().riskGetPrograms(row1, 'random', 1, cell3);


    //cell4.innerHTML = riskGetPrg(row1, 'random', 1,cell4);
    cell4.innerHTML = angular.element(document.getElementById('DivRiskDataForTable')).scope().createRiskProjectDropDown2(null, row1, 0, program, "");
    cell5.innerHTML = "<textarea rows='2' data-type='AlphaNumeric' onblur='return validate(this)'  size='12' id='RiskTitle" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";

    //cell5.innerHTML = createResourceProjectDropDown(null, row1, 0, program, "");
    cell6.innerHTML = "<textarea rows='2' data-type='' onblur='return validate(this)'  size='12' id='descriptionRisk" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell7.innerHTML = createImpactDropDown("", row1, "Risk");
    cell8.innerHTML = createItemTypeDropDown("", row1, "Risk");
    //cell7.innerHTML = "<input  type='text' size='12' data-type='AlphaNumeric' onblur='return validate(this)' id='Impact" + row1 + "' style=' border:0px;outline:0px;'>";
    //  cell9.innerHTML = "<input  type='text' size='12' data-type='AlphaNumeric' onblur='return validate(this)' id='RiskResponseActionPlan" + row1 + "' style=' border:0px;outline:0px;'>";
    cell9.innerHTML = createStatusDropDown("", row1, "Risk");
    //cell9.innerHTML = "<input  type='text' size='12' data-type='Number' onblur='return validate(this)' id='statusRisk" + row1 + "' style=' border:0px;outline:0px;'>";
    cell10.innerHTML = "<button type='button' class='btn btn-primary' onclick='cancelNewRowRisk(" + rowID + ")'>Cancel</button>"

    $('#InsertRowButtonForRisk').prop("disabled", "true");

};
function cancelNewRowRisk(rowID) {

    $(rowID).remove();
    document.getElementById('InsertRowButtonForRisk').disabled = false;

}

function getTrueFalseDeleteRisk(Id) {
    bootbox.confirm("Are You Sure To Delete ?", function (e) {
        if (e == true) {
            DeleteRisk(Id);
        }
    });

}
function DeleteRisk(Id) {
  
    var Risk = {
        RiskID: Id
    };

    var stringData = JSON.stringify(Risk);

    var urlString = "api/Risk/DeleteRisk/";


    $.ajax({
        url: urlString,
        type: "DELETE",
        data: stringData,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            //Code to re update the time line on delete click

            var data = document.getElementById('hdSetpageindex').value.split(',');
            angular.element(document.getElementById('spanRiskCount')).scope().helperMethods.GetRiskCount();

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#txtResult").val(err.Message)
        }
    });
    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');

    // document.getElementById('InsertRowButtonForRisk').disabled = false;
    angular.element(document.getElementById('tblRiskDataControl')).scope().editRiskGridData();
    angular.element(document.getElementById('RiskHesto-chart')).scope().riskProgramChartData();
    angular.element(document.getElementById('RiskItem-chart')).scope().getRiskItemTypeChart();
    if (programOrProject[3] == 'Y' && drilldownRisk == 0) {
        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable();
    }
    else if (programOrProject[3] == 'Y' && drilldownRisk == 1) {
        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(drillDownRiskProgramName);

    }
    else {
        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(document.getElementById('idBrdScrProgName').innerHTML);

    }
    angular.element(document.getElementById('divRiskTileData')).scope().riskCountForTile();

    
}
function updateRiskGridData() {

    //var input = confirm(" Are You Sure You Want To Save ?");

    //if (input == true) {

    var jsonData = "";

    var rows = $('#tblRiskDataControl tbody >tr');

    var columns;

    var temp = null;

    var id = null;

    var riskID, rowid, risktitle, program, project, status, description, actionPlan, impact;



    var Ftd = $(rows[0]).find('td').first();

    var StrtIndx = parseInt($(Ftd).html()) - 1;

    var endIndx = parseInt(StrtIndx + rows.length);



    var duplicateValueCheckFlag = 0;

    $.each(rows, function (indx, item) {

        columns = $(this).find('td');

        if (columns.length >= 4) {

            duplicateValueCheckFlag = 0;

            i = (StrtIndx + indx);

            id = "programRisk" + i;

            if (document.getElementById(id).tagName == "DIV") {

                program = (document.getElementById(id).innerHTML).trim();

            }

            else {

                program = (document.getElementById(id).value).trim();

            }



            id = "projectRisk" + i;

            if (document.getElementById(id).tagName == "DIV") {

                project = (document.getElementById(id).innerHTML).trim();

            }

            else {

                project = (document.getElementById(id).value).trim();

            }



            id = "descriptionRisk" + i;

            description = (document.getElementById(id).value).trim();



            //id = "RiskResponseActionPlan" + i;

            //actionPlan = (document.getElementById(id).value).trim();



            id = "ImpactRisk" + i;

            impact = (document.getElementById(id).value).trim();



            id = "itemTypeRisk" + i;

            itemType = (document.getElementById(id).value).trim();



            id = "statusRisk" + i;

            status = (document.getElementById(id).value).trim();



            id = "RiskTitle" + i;

            title = (document.getElementById(id).value).trim();



            id = "RiskID" + i;

            rowid = (document.getElementById(id).innerHTML).trim();

            //code to check no duplicate record is inserted

            if (rows.length > 1) {

                for (var k = StrtIndx; k < i; k++) {



                    var programData, projectData, RiskTitle;



                    id = "programRisk" + k;

                    if (document.getElementById(id).tagName == "DIV") {

                        programData = (document.getElementById(id).innerHTML).trim();

                    }

                    else {

                        programData = (document.getElementById(id).value).trim();

                    }



                    id = "projectRisk" + k;

                    if (document.getElementById(id).tagName == "DIV") {

                        projectData = (document.getElementById(id).innerHTML).trim();

                    }

                    else {

                        projectData = (document.getElementById(id).value).trim();

                    }



                    id = "RiskTitle" + k;

                    RiskTitle = (document.getElementById(id).value).trim();



                    if (programData == program && projectData == project && RiskTitle == title) {

                        duplicateValueCheckFlag = 1;

                    }

                }

            }





            if (duplicateValueCheckFlag == 0) {

                if (rowid == "" || rowid == 'undefined')

                    rowid = "0";



                var Risk_Master = {

                    RiskID: rowid,

                    ProgramID: program,

                    ProjectID: project,

                    Description: description,

                    Status: status,

                    RiskTitle: title,

                    //  RiskResponseActionPlan: actionPlan,

                    Impact: impact,

                    ItemType: itemType

                };





                var stringData = JSON.stringify(Risk_Master);

                var urlString = "api/risk/";

                $.ajax({

                    url: urlString,

                    type: "PUT",

                    data: stringData,

                    async: false,

                    dataType: 'json',

                    contentType: "application/json;charset=utf-8",

                    success: function (result) {

                        //Code to reload the time line again.

                        angular.element(document.getElementById('spanRiskCount')).scope().helperMethods.GetRiskCount();

                    },

                    error: function (xhr, status, error) {

                        var err = eval("(" + xhr.responseText + ")");

                        //$("#txtResult").val(err.Message)

                    }



                });

            }



            jsonData = "";

        }

    });

    if (duplicateValueCheckFlag == 1) {

        alert("Duplicate value for Program, Project and Risk Title is not allowed!");

    }

    document.getElementById('InsertRowButtonForRisk').disabled = false;

    angular.element(document.getElementById('tblRiskDataControl')).scope().editRiskGridData();

    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');



    //if (programOrProject[3] == 'Y') {

    //    if (drilldownRisk == 0) {



    angular.element(document.getElementById('RiskHesto-chart')).scope().riskProgramChartData();

    angular.element(document.getElementById('RiskItem-chart')).scope().getRiskItemTypeChart();


    if (programOrProject[3] == 'Y' && drilldownRisk == 0) {

        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable();

    }

    else if (programOrProject[3] == 'Y' && drilldownRisk == 1) {
        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(drillDownRiskProgramName);

    }
    else {
        angular.element(document.getElementById('DivRiskDataForTable')).scope().riskDataForTable(document.getElementById('idBrdScrProgName').innerHTML);

    }
    // angular.element(document.getElementById('divGetRiskCount')).scope().riskCountForTile();
    angular.element(document.getElementById('divRiskTileData')).scope().riskCountForTile();







    document.getElementById('divEditRisk').style.display = "none";



    // } else { }//Cancel

};
function createStatusDropDown(stat, i, module) {
    var data;
    if (stat === 1) {
        data = "";
        //data = "Open,Closed";
        data = "<option value='1'>Open</option>" +
"<option value='0'>Closed</option>";
    }
    else if (stat === 0) {
        data = "";
        //data = "Closed,Open";
        data = "<option value='0'>Closed</option>" +
"<option value='1'>Open</option>";
    }
    else {
        data = "";
        // data = "Open,Closed";
        data = "<option value='1'>Open</option>" +
"<option value='0'>Closed</option>";
    }
    if (module == "Risk")
        var id = "statusRisk" + i;
    else if (module == "Issue")
        var id = "statusIssue" + i;

    var temp = data.split(',');
    var drpDownstatus = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
data +
"</select>"
    return drpDownstatus;
}
function getRiskPrograms(Id) {
    Id = 1;
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Risk/GetRiskPrograms/" + Id,
        type: "get",
        async: false,
        success: function (data) {
            jsonDataResponse = data;
        },
        error: function () {
            connectionError();
        }
    });
    // alert(jsonDataResponse);
    return jsonDataResponse;

}
function getRiskProjects(userId) {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Risk/GetRiskProjects/" + userId,
        type: "get",
        async: false,
        success: function (data) {
            jsonDataResponse = data;
        },
        error: function () {
            connectionError();
        }
    });
    // alert(jsonDataResponse);
    return jsonDataResponse;

}
function createImpactDropDown(priority, i, module) {
    var data;
    if (priority == "Low") {
        data = "";
        data = "Low,Medium,High";
    }
    else if (priority == "High") {
        data = "";
        data = "High,Low,Medium";
    }
    else if (priority == "Medium") {
        data = "";
        data = "Medium,Low,High";
    }
    else {
        data = "";
        data = "Low,Medium,High";
    }
    if (module == "Risk") {
        var id = "ImpactRisk" + i;
    }
    else if (module == "Issue")
    { var id = "ImpactIssue" + i; }

    var temp = data.split(',');
    var drpDownPriority = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
"<option value = '" + temp[0] + "'>" + temp[0] + "</option>" +
"<option value = '" + temp[1] + "'>" + temp[1] + "</option>" +
"<option value = '" + temp[2] + "'>" + temp[2] + "</option>" +
"</select>"
    return drpDownPriority;
}
function createItemTypeDropDown(priority, ip, module) {

    var fxnItemType = getItemTypeDetails();
    var getTypes = [];
    $.each(fxnItemType, function (i, item) {
        getTypes.push({ "text": item.ItemName, "id": item.ItemID });
    });

    var value = [];
    var data = [];
    var playData = [];
    $.each(getTypes, function (i, item) {

        if (priority == item.id) {
            value = "";
            data = "";
            playData = "";

            value += item.id;
            data += item.text.trim();
            playData += item.text.trim();
        }


        //$.each(getTypes,function(i,item){

        //    if (playData.trim() != item.text.trim()) {
        //        data += ","+item.text.trim();
        //    }

        //});
    });

    if (playData == "") {

        $.each(getTypes, function (i, item) {
            if (i == 0) {
                value += item.id;
                data += item.text.trim();
            }
            else {
                value += "," + item.id;
                data += "," + item.text.trim();
            }
        });

    } else {

        for (var i = 0; i < getTypes.length; i++) {
            if (playData != getTypes[i].text.trim()) {
                value += "," + getTypes[i].id;

                data += "," + getTypes[i].text.trim();
            }
        }
    }

    if (module == "Risk")
        var id = "itemTypeRisk" + ip;

    else if (module == "Issue")
        var id = "itemTypeIssue" + ip;

    var temp = data.split(',');
    var tempID = value.split(',');
    var drpDownPriority = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
"<option value = '" + tempID[0] + "'>" + temp[0] + "</option>" +
"<option value = '" + tempID[1] + "'>" + temp[1] + "</option>" +
"<option value = '" + tempID[2] + "'>" + temp[2] + "</option>" +
"</select>"
    return drpDownPriority;
}
function getItemTypeDetails() {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Risk/",
        type: "get",
        async: false,
        success: function (data) {
            jsonDataResponse = data;
        },
        error: function () {
            connectionError();
        }
    });
    //alert(jsonDataResponse);
    return jsonDataResponse;

}
