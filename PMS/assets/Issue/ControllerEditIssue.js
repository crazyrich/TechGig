var drilldownIssue = 0;
var drillDownIssueProgamId = 0;
app.service('IssueService', ['$http', '$q', function ($http, $q) {
    

    this.getissuebyuserid = function () {
        //var id = $("#programid").val();
        //var id = $("#hdGlobalID").val(); drillDownIssueProgamId
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var id = 0;
        if (drilldownIssue == 0 && hdnFieldValueForProject[3]=='Y') {
           id = $("#hdGlobalID").val();
        }
        else if (drilldownIssue == 1 && hdnFieldValueForProject[3] == 'Y') {
            id = drillDownIssueProgamId;
        }
        else {
            id = hdnFieldValueForProject[4];
        }
       
        var person = JSON.parse(localStorage.getItem('LoginUser'));

         var url_api = "api/Issue/GetIssueForUser?programid=" + id + "&userid=" + person.UserName;
    
         var deferred = $q.defer();
         return $http({
             method: 'GET',
             url: url_api

         }).success(function (data) {

             deferred.resolve();

         }).error(function () {
             //alert("error");
            // deferred.reject();
         })
         return deferred.promise;
    }

}]);


app.controller('IssueController', ['$scope', '$http', '$q', 'IssueService', 'ProgrammeSrv', function ($scope, $http, $q, IssueService, ProgrammeSrv) {
    $scope.titleList = [];

    $scope.issueCountForTile = function () {

        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

        var pid = $("#hdGlobalID").val();
        if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 0) {
            pid = $("#hdGlobalID").val();
        }

        IssueService.getissuebyuserid().then(function (successresponse) {

            $http.get(successresponse.config.url)
            .then(function (result) {
                $scope.titleList = [];
                $scope.IssueValue = result.data;
                $scope.IssueCount = $scope.IssueValue.length;
                var j = 0;
                $.each(result.data, function (i, item) {
                    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
                    if (hdnFieldValueForProject[3] == 'Y') {
                        if (j < 3 && hdnFieldValueForProject[2] == item.ProgramID)
                            $scope.titleList.push({ "IssueTitle": item.IssueTitle });
                    }
                    else {
                        if (j < 3 && hdnFieldValueForProject[2] == item.ProjectID)
                            $scope.titleList.push({ "IssueTitle": item.IssueTitle });
                        j++;
                    }
                })
            });



        });

    }
    $scope.issueDataForTable = function (program) {
        var list = [];
        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        var pid = 0;

        if (programOrProject[3] == 'Y' && drilldownIssue == 0) {
            pid = $("#hdGlobalID").val(0);;
        }
        else if ((programOrProject[3] == 'Y' && drilldownIssue == 1)) {
            pid = drillDownIssueProgamId;;
        }
        else {
            pid = programOrProject[4];
        }


        IssueService.getissuebyuserid(pid).then(function (successresponse) {

            $.each(successresponse.data, function (i, item) {
                if(item.Status == 1)
                    list.push({ "IssueID": item.IssueID, "IssueTitle": item.IssueTitle, "Severity": item.Severity, "ItemName": item.ItemName, "ProjectName": item.ProjectName, "ProgramName": item.ProgramName, "Aging": item.Aging });
            });

            var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
            if (programOrProject[3] == 'Y' && drilldownIssue == 0) {
                var issuedatafortableprogram = "<table class='table'>" +
                                    "<thead>" +
                                        "<tr>" +
                                           "<th>Program Name</th>" +
                                                "<th>Issue Title</th>" +
                                                "<th>Age</th>" +
                                                "<th>Issue Type</th>" +
                                        "</tr>" +
                                     "</thead>" +
                                    "<tbody >";

                if (Object.keys(list).length != 0) {

                    $.each(list, function (i, item) {
                        var months = ((item.Aging) / 30).toFixed(0);
                        var days = (item.Aging) % 30;
                        var monthsDays = "";
                        if (months == 0)
                        {
                            if (days == 0 || days == 1) {
                                monthsDays = (item.Aging) % 30 + " Day";
                            }
                            else {
                                monthsDays = (item.Aging) % 30 + " Days";
                            }
                        }
                        else
                        {
                            monthsDays=((item.Aging) / 30).toFixed(0) + " Month " +(item.Aging) % 30 + " Days";
                        }

                        issuedatafortableprogram += "<tr>" +
                                     "<td width='20%'>" + item.ProgramName + "</td>" +
                                     "<td width='40%'>" + item.IssueTitle + "</td>" +
                                     "<td width='20%'>" + monthsDays + "</td>" +
                                     "<td width='20%'>" + item.ItemName + "</td>" +
                                 "</tr>";
                    });
                } else {
                    issuedatafortableprogram += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available</td></tr>"

                }
            } else {
                var issuedatafortableprogram = "<table class='table'>" +
                                 "<thead>" +
                                     "<tr>" +
                                        "<th>Project Name</th>" +
                                             "<th>Issue Title</th>" +
                                             "<th>Age</th>" +
                                             "<th>Issue Type</th>" +
                                     "</tr>" +
                                  "</thead>" +
                                 "<tbody >";

                if (Object.keys(list).length != 0) {

                    $.each(list, function (i, item) {
                        if (item.ProgramName.trim() == program.trim()) {
                            var months = ((item.Aging) / 30).toFixed(0);
                            var days = (item.Aging) % 30;
                            var monthsDays = "";
                            if (months == 0) {
                                if (days == 0 || days == 1) {
                                    monthsDays = (item.Aging) % 30 + " Day";
                                }
                                else
                                {
                                    monthsDays = (item.Aging) % 30 + " Days";
                                }
                            }
                            else {
                                monthsDays = ((item.Aging) / 30).toFixed(0) + " Month " + (item.Aging) % 30 + " Days";
                            }
                            issuedatafortableprogram += "<tr>" +
                                     "<td width='20%'>" + item.ProjectName + "</td>" +
                                     "<td width='40%'>" + item.IssueTitle + "</td>" +
                                     "<td width='20%'>" + monthsDays + "</td>" +
                                     "<td width='20%'>" + item.ItemName + "</td>" +
                                 "</tr>";
                        }
                    });
                }
                else {
                    issuedatafortableprogram += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available</td></tr>"

                }
            }
            $("#DivIssueDataForTable").html(issuedatafortableprogram);
            var temp = $("#DivIssueDataForTable").html();

        }, function (error) {
            //alert("Error : " + error);
            console.log(error.statusText);

        });// end service call

    }
    $scope.editIssueGridData = function () {
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var list = [];
        var pid = 0;
        if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 0) {
            pid = $("#hdGlobalID").val();
        }
        else if ((hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 1)) {
            pid = drillDownIssueProgamId;;
        } else {
            pid = $("#hdGlobalID").val();
        }

        var PermissionList = EditPermissionListForLoginUser;

        IssueService.getissuebyuserid(pid).then(function (successresponse) {

            $.each(successresponse.data, function (k, item) {
                $.each(PermissionList, function (j, it) {

                    if (it.PID == item.ProjectID && it.EditPermission == 'Y')
                        list.push({ "IssueID": item.IssueID, "IssueTitle": item.IssueTitle, "Severity": item.Severity, "Status": item.Status, "ItemName": item.ItemName, "ItemType": item.ItemType, "ProgramName": item.ProgramName, "ProjectName": item.ProjectName, "Aging": item.Aging, "Description": item.Description, "CreatedDate": item.CreatedDate, "UpdatedDate": item.UpdatedDate });
                });
            });

            var dyntable = "<div><table  id='tblIssueDataControl' class='table table-bordered table-hover'><thead>" + "<tr><th></th><th  style='padding: 0px;width:0px;'></th><th>Program Name</th><th>Project Name</th><th>Issue Title</th><th>Description</th><th>Impact</th><th>Issue Type</th><th>Status</th><th>CreatedDate</th><th></th></tr></thead><tbody>";
            var i = 0;
            $.each(list, function (j, item) {
                var ID = "IssueID" + i;
                //var RID = "IssueID" + i;
                var program = "programIssue" + i;
                var project = "projectIssue" + i;
                var status = "statusIssue" + i;
                var description = "descriptionIssue" + i;
                var cDate = "CreatedDateIssue" + i;

                dyntable +=
                            "<tr id='IssueRow" + i + "'>" +
                            "<td><div> </div></td>" +
                            "<td><div id=" + ID + " style='display:none; padding: 0px;width:0px;'> " + item.IssueID + "</div></td>" +
                            "<td ><div style='display:none;'> " + item.ProgramName + "</div><div id=" + program + " style='display:none;'> " + item.ProgramName + "</div><lable style='font-weight: normal'>" + item.ProgramName + "</label></td>" +
                            "<td ><div style='display:none;'> " + item.ProjectName + "</div><div id=" + project + " style='display:none;'> " + item.ProjectName + "</div><label style='font-weight: normal'>" + item.ProjectName + "</label></td>" +
                            "<td ><div style='display:none;'> " + item.IssueTitle + "</div>" + createTextArea(valueCheck(item.IssueTitle), i, "IssueTitle", "AlphaNumeric") + "</td>" +
                            "<td ><div style='display:none;'> " + item.Description + "</div>" + createTextArea(valueCheck(item.Description), i, "descriptionIssue", "") + "</td>" +
                            "<td> <div style='display:none' > " + item.Severity + "</div>" + createImpactDropDown(item.Severity, i, "Issue") + "</td>" +
                            "<td> <div style='display:none' > " + item.ItemType + "</div>" + createItemTypeDropDown(item.ItemType, i, "Issue") + "</td>" +

                            "<td> <div style='display:none' > " + item.Status + "</div>" + createStatusDropDown(item.Status, i,"Issue") + "</td>" +
                     //  "<td><div style='display:none' > " + item.CreatedDate + "</div>" + createDateTextbox(valueCheck(item.CreatedDate), i, "CreatedDateIssue") + "</td>" +
                            "<td ><div style='display:none;'> " + item.CreatedDate + "</div><div id=" + cDate + " style='display:none;'> " + item.CreatedDate + "</div><lable style='font-weight: normal'>" + item.CreatedDate + "</label></td>" +
                            // "<td><div style='display:none' > " + item.CreatedDate + "</div>" + createDateTextbox(valueCheck(item.CreatedDate), i, "CreatedDateIssue") + "</td>" +
                             //"<td><div style='display:none' > " + item.UpdatedDate + "</div>" + createDateTextbox(valueCheck(item.UpdatedDate), i, "UpdatedDateIssue") + "</td>" +

                "<td><a  href='javascript:void(0)' onclick='getTrueFalseDeleteIssue(" + item.IssueID + ")'><i class='glyphicon glyphicon-trash'> </i>  </a><a  href='javascript:void(0)' onclick='addIssueData()'><i class='glyphicon glyphicon-plus'> </i>  </a></td></tr>";
                i = i + 1;

            });




            dyntable += "</tbody></table>";
            dyntable += "<table><tr><td align='right' valign='top' style='width:1100px;padding:4px;'>";
            dyntable += "<button type='button' onclick='cancelSaveIssue();' class='btn btn-secondary'>Cancel</button></td><td align='right' valign='top' style='padding:4px;'>";

            dyntable += "<button style='display:none;' id='InsertRowButtonForIssue' type='button' class='btn btn-primary' onclick='addIssueData()'>Insert Row</button>&nbsp;&nbsp</td>"

            dyntable += "<td align='right' valign='top' style='padding:4px;'><button type='button' class='btn btn-primary' onclick='updateIssueGridData()';>Save</button>";

            dyntable += "</td></tr></table></div>";
            document.getElementById('divEditIssueGrid').innerHTML = "";
            document.getElementById('divEditIssueGrid').innerHTML = dyntable;
            if (Object.keys(list).length <= 0)
                $('#InsertRowButtonForIssue').css("display", "block");
            //$('#divEditIssueGrid table tr').each(function () {
            //    $('td:nth-child(11)').find('input').datepick({


            //        format: "YYYY-MM-DD"

            //    });

            //});

            createResponsiveGrid("tblIssueDataControl");

        }, function (error) {
            //alert("Error : " + error);
            console.log(error.statusText);

        });// end service call
    }
    $scope.IssueGetPrograms = function IssuePrograms(i, isSelected, newOrExisting, cell) {

        // IssuePrg(list, i, isSelected, newOrExisting);
        var id = $("#hdGlobalID").val();
        var list = [];
        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

        var PermissionList = EditPermissionListForLoginUser;

        var askForPromise = ProgrammeSrv.getProgramByUserID(0);
        askForPromise.then(function (successresponse) {
            $.each(successresponse, function (i, item) {
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

            if (hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 0) {
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

            else if ((hdnFieldValueForProject[3] == 'Y' && drilldownIssue == 1)) {
                var program = drillDownIssueProgramName;
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

            //else if (hdnFieldValueForProject[3] == 'N' || drilldownIssue == 1) {

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

            var id = "programIssue" + i;
            //  drpDownProgram = "<select data-ctl='" + "projectIssue" + i + "' id='" + id + "'onchange='createIssueProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + data + "</select>"

            drpDownProgram = "<select data-ctl='" + "projectIssue" + i + "' id='" + id + "'onchange='createIssueProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:70px;'>" + data + "</select>";

            // drpDownProgram = "<select data-ng-options='s.text for  s  in  data' data-ctl='" + "projectIssue" + i + "' id='" + id + "'onchange='createIssueProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'></select>";


            cell.innerHTML = drpDownProgram;
            return drpDownProgram = "<select data-ctl='" + "projectIssue" + i + "' id='" + id + "'onchange='createIssueProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:70px;'>" + data + "</select>";

        });
    }
    $scope.createIssueProjectDropDown2 = function (ctl, rowid, flag, programID, projectName) {


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
        var id = "projectIssue" + rowid;
        var drpDownProgram = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px; width:70px;'>" + selProject + "</select>";
        return drpDownProgram;
    }

    $scope.$on('handleBroadcast', function (event, args) {

        $scope.titleList = [];
        $scope.issueCountForTile();

    });
  
    //$("#tblIssueDataControl tbody tr:last-child").css("background-color", "yellow");


}]);

function cancelSaveIssue() {

    $('#divEditIssue').css("display", "none");

}
function cancelNewRowIssue(rowID) {
    document.getElementById('InsertRowButtonForIssue').disabled = false;

    $(rowID).remove();

}
function createIssueProjectDropDown(ctl, rowid, flag, programID, projectName, module) {
    angular.element(document.getElementById('DivIssueDataForTable')).scope().createIssueProjectDropDown2(ctl, rowid, flag, programID, projectName, module);
}
function addIssueData()  {

    var program = 0;
    var table = document.getElementById('tblIssueDataControl').getElementsByTagName('tbody')[0];
    //  var row = table.insertRow(table.rows.length);
    //var row = table.insertRow(0);
    var rows = $('#tblIssueDataControl tbody >tr');
    var Ftd = $(rows[0]).find('td').first();


    var StrtIndx = parseInt($(Ftd).html()) - 1;

    var endIndx = StrtIndx + table.rows.length;

    var row1 = endIndx;
    var IID = "IssueID" + row1;

    var rowID = "IssueRow" + row1;

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
    var cell11 = row.insertCell(10);
    //var cell12 = row.insertCell(11);
    var rcID = "ID" + row1;
    var currentdate = new Date();

    cell1.innerHTML = "<border:0px;outline:0px;'>";
    cell2.innerHTML = "<div id=" + IID + " style='display:none;'></div>";
    cell5.innerHTML = "<textarea rows='2' data-type='AlphaNumeric' onblur='return validate(this)'  size='12' id='IssueTitle" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell3.innerHTML = angular.element(document.getElementById('DivIssueDataForTable')).scope().IssueGetPrograms(row1, 'random', 1, cell3);

    cell4.innerHTML = angular.element(document.getElementById('DivIssueDataForTable')).scope().createIssueProjectDropDown2(null, row1, 0, program,"");

    cell6.innerHTML = "<textarea rows='2' data-type='' onblur='return validate(this)'  size='12' id='descriptionIssue" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell7.innerHTML = createImpactDropDown("", row1,"Issue");
    cell8.innerHTML = createItemTypeDropDown("", row1,"Issue");
    cell9.innerHTML = createStatusDropDown("", row1, "Issue");
   // cell10.innerHTML ="<div style='display:none;'> " + item.CreatedDate + "</div><div id=" + cDate + " style='display:none;'> " + item.CreatedDate + "</div><lable style='font-weight: normal'>" + item.CreatedDate + "</label>" +


    cell10.innerHTML = "<div id='CreatedDateIssue" + row1 + "' style=''> " + currentdate.getFullYear() + "-" + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-" + ('0' + (currentdate.getDate())).slice(-2) + "</div> ";
   // cell10.innerHTML = "<input  type='text' size='12'  id='CreatedDateIssue" + row1 + "' onclick='datePickerControl(this)'  style=' border:0px;outline:0px;'>";
    //cell11.innerHTML = "<input  type='text' size='12'  id='UpdatedDateIssue" + row1 + "' onclick='datePickerControl(this)' style=' border:0px;outline:0px;'>";

    cell11.innerHTML = "<button type='button' class='btn btn-primary' onclick='cancelNewRowIssue(" + rowID + ")'>Cancel</button>"


    $('#InsertRowButtonForIssue').prop("disabled", "true");

    //$('#divEditIssueGrid table tr').each(function () {
    //    $('td:nth-child(11)').find('input').datepick({


    //        format: "YYYY-MM-DD"

    //    });

    //});
   
  //  document.getElementById('InsertRowButtonForIssue' + InsertDataRowNum).disabled = true;
};
function getTrueFalseDeleteIssue(Id) {
    bootbox.confirm("Are You Sure To Delete ?", function (e) {
        if (e == true) {
            DeleteIssue(Id);
        }
    });

}
function DeleteIssue(Id) {
  
    var Issue = {
        IssueID: Id
    };

    var stringData = JSON.stringify(Issue);

    var urlString = "api/Issue/DeleteIssue/";


    $.ajax({
        url: urlString,
        type: "DELETE",
        data: stringData,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            //Code to re update the time line on delete click

            var data = document.getElementById('hdSetpageindex').value.split(',');
            angular.element(document.getElementById('spanIssueCount')).scope().helperMethods.GetIssueCount();
            //$scope.$emit('handleEmit', { 'GlobalId': $rootScope.GlobalId });
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#txtResult").val(err.Message)
        }
    });
    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
    angular.element(document.getElementById('IssueHesto-chart')).scope().issueProgramChartData();
    angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();

    angular.element(document.getElementById('tblIssueDataControl')).scope().editIssueGridData();
    angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();

   




    if (programOrProject[3] == 'Y' && drilldownIssue == 0) {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable();
    }
    else if (programOrProject[3] == 'Y' && drilldownIssue == 1) {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(drillDownIssueProgramName);

    }
    else {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(document.getElementById('idBrdScrProgName').innerHTML);

    }
    
    angular.element(document.getElementById('divIssueTileData')).scope().issueCountForTile();

}
function updateIssueGridData() {

    //var input = confirm(" Are You Sure You Want To Save ?");

    //if (input == true) {

    var jsonData = "";

    var rows = $('#tblIssueDataControl tbody >tr');

    var columns;

    var temp = null;

    var id = null;

    var IssueID, rowid, Issuetitle, program, project, status, description, createdDateIssue, impact, updatedDateIssue;



    var Ftd = $(rows[0]).find('td').first();

    var StrtIndx = parseInt($(Ftd).html()) - 1;

    var endIndx = parseInt(StrtIndx + rows.length);



    var duplicateValueCheckFlag = 0;

    $.each(rows, function (indx, item) {

        columns = $(this).find('td');

        if (columns.length >= 4) {

            duplicateValueCheckFlag = 0;

            i = (StrtIndx + indx);

            id = "programIssue" + i;

            if (document.getElementById(id).tagName == "DIV") {

                program = (document.getElementById(id).innerHTML).trim();

            }

            else {

                program = (document.getElementById(id).value).trim();

            }



            id = "projectIssue" + i;

            if (document.getElementById(id).tagName == "DIV") {

                project = (document.getElementById(id).innerHTML).trim();

            }

            else {

                project = (document.getElementById(id).value).trim();

            }



            id = "descriptionIssue" + i;

            description = (document.getElementById(id).value).trim();



            //id = "IssueResponseActionPlan" + i;

            //actionPlan = (document.getElementById(id).value).trim();



            id = "ImpactIssue" + i;

            impact = (document.getElementById(id).value).trim();



            id = "itemTypeIssue" + i;

            itemType = (document.getElementById(id).value).trim();



            id = "statusIssue" + i;

            status = (document.getElementById(id).value).trim();



            id = "IssueTitle" + i;

            title = (document.getElementById(id).value).trim();

            id = "CreatedDateIssue" + i;
            //createdDateIssue = (document.getElementById(id).value).trim();
            
            // createdDateIssue = (document.getElementById(id).innerHTML).trim();
            if (document.getElementById(id).tagName == "DIV") {

                createdDateIssue = (document.getElementById(id).innerHTML).trim();

            }

            else {

                createdDateIssue = (document.getElementById(id).value).trim();

            }

            //id = "UpdatedDateIssue" + i;
            //updatedDateIssue = (document.getElementById(id).value).trim();

            id = "IssueID" + i;

            rowid = (document.getElementById(id).innerHTML).trim();

            //code to check no duplicate record is inserted

            if (rows.length > 1) {

                for (var k = StrtIndx; k < i; k++) {



                    var programData, projectData, IssueTitle;



                    id = "programIssue" + k;

                    if (document.getElementById(id).tagName == "DIV") {

                        programData = (document.getElementById(id).innerHTML).trim();

                    }

                    else {

                        programData = (document.getElementById(id).value).trim();

                    }



                    id = "projectIssue" + k;

                    if (document.getElementById(id).tagName == "DIV") {

                        projectData = (document.getElementById(id).innerHTML).trim();

                    }

                    else {

                        projectData = (document.getElementById(id).value).trim();

                    }



                    id = "IssueTitle" + k;

                    IssueTitle = (document.getElementById(id).value).trim();



                    if (programData == program && projectData == project && IssueTitle == title) {

                        duplicateValueCheckFlag = 1;

                    }

                }

            }





            if (duplicateValueCheckFlag == 0) {

                if (rowid == "" || rowid == 'undefined')

                    rowid = "0";



                var Issue_Master = {

                    IssueID: rowid,

                    ProgramID: program,

                    ProjectID: project,

                    Description: description,

                    Status: status,

                    IssueTitle: title,

                    //  IssueResponseActionPlan: actionPlan,

                    Severity: impact,

                    ItemType: itemType,
                    CreatedDate: createdDateIssue,
                    UpdatedDate: createdDateIssue
                };





                var stringData = JSON.stringify(Issue_Master);

                var urlString = "api/Issue/";

                $.ajax({

                    url: urlString,

                    type: "PUT",

                    data: stringData,

                    async: false,

                    dataType: 'json',

                    contentType: "application/json;charset=utf-8",

                    success: function (result) {

                        //Code to reload the time line again.
                        angular.element(document.getElementById('spanIssueCount')).scope().helperMethods.GetIssueCount();


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

        alert("Duplicate value for Program, Project and Issue Title is not allowed!");

    }

 //   document.getElementById('InsertRowButtonForIssue'+InsertDataRowNum).disabled = false;

    angular.element(document.getElementById('tblIssueDataControl')).scope().editIssueGridData();
    angular.element(document.getElementById('IssueHesto-chart')).scope().issueProgramChartData();
    angular.element(document.getElementById('IssuePieChartByType')).scope().getIssueItemTypePieChart();
    angular.element(document.getElementById('IssuePieChartAging')).scope().getIssueAgingData();

    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
   


    if (programOrProject[3] == 'Y' && drilldownIssue == 0) {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable();
    }
    else if (programOrProject[3] == 'Y' && drilldownIssue == 1) {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(drillDownIssueProgramName);

    }
    else {
        angular.element(document.getElementById('DivIssueDataForTable')).scope().issueDataForTable(document.getElementById('idBrdScrProgName').innerHTML);

    }

    angular.element(document.getElementById('divIssueTileData')).scope().issueCountForTile();
    document.getElementById('divEditIssue').style.display = "none";


};