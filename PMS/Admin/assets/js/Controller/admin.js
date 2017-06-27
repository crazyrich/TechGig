
adminApp.controller("ControllerAdminGridListing", ['$scope', '$compile', function ($scope, $compile) {

    $scope.SelectedID = $scope.PID;
    $scope.DefaultValue = "Program";
    $scope.ProgramList = getProgramProjectData(0);

    $scope.RadioChange = function (s) {

        var jsonDataResponse;
        var value = 0;
        var selected;
        if (s == "Program")
        { selected = 0; }
        else if (s == "Project")
            selected = -1;
        else {
            { SelectedID = s; }
        }

        if (selected == 0) {
            var ProgramDataForTable = "<table class='table table-striped' style='margin-bottom:0px;'>" +
                               "<thead>" +
                                   "<tr>" +
                                      "<th>S.No.</th>" +
                                       "<th>Program Name</th>" +
                                       "<th></th>" +
                                       "<th></th>" +
                                   "</tr>" +
                                "</thead>" +
                               "<tbody>";
            jsonDataResponse = getProgramProjectData(0);
            $.each(jsonDataResponse, function (indx, item) {
                var sno = parseInt(indx) + 1;
                ProgramDataForTable += "<tr>" +
                         "<td>" + sno + "</td>" +
                         "<td>" + item.Program_Name + "</td>" +
                         "<td><a class='btnEditProgram' data-pname=" + item.Program_Name + " data-id=" + item.Program_Id + " data-toggle='modal' data-target='#divUpdateProgram'><i class='glyphicon glyphicon-edit'> </i></a></td>" +
                         "<td><a  onclick='GetResponseForDeleteAdmin(" + item.Program_Id + ")'><i class='glyphicon glyphicon-trash'> </i></a></td>" +
                     "</tr>";


            });

            $('select').val(''); $scope.PID = 0;
            document.getElementById('btnAddNew').disabled = "";
            document.getElementById('TextBoxForEnterName').innerHTML = "Enter Name For New Program: ";
            document.getElementById('ProgramDropDown').style.visibility = "hidden";



        }
        else if (selected == -1) {
            document.getElementById('ProgramDropDown').style.visibility = "visible";
            document.getElementById('btnAddNew').disabled = "true";
            ProgramDataForTable = "<table class='table'>" +
                        "<thead>" +
                            "<tr><td colspan='4'>" + "No Program Selected" + "</td></tr>" +
                         "</thead>" +
                        "<tbody>";
            document.getElementById('TextBoxForEnterName').innerHTML = "Enter Name For New Project: ";

        }
        else {

            value = SelectedID;
            var ProgramDataForTable = "<table class='table' style='margin-bottom:0px;'>" +
                        "<thead>" +
                            "<tr>" +
                               "<th>S.No.</th>" +
                                "<th>Project Name</th>" +
                                "<th></th>" +
                                "<th></th>" +
                            "</tr>" +
                         "</thead>" +
                        "<tbody>";

            jsonDataResponse = getProgramProjectData(value);

            $.each(jsonDataResponse, function (indx, item) {
                var sno = parseInt(indx) + 1;
                ProgramDataForTable += "<tr>" +
                   "<td>" + sno + "</td>" +
                   "<td>" + item.Program_Name + "</td>" +
                   "<td><a class='btnEditProgram' data-pname=" + item.Program_Name + " data-id=" + item.Program_Id + " data-toggle='modal' data-target='#divUpdateProgram'><i class='glyphicon glyphicon-edit'> </i></a></td>" +
                   "<td><a onclick='GetResponseForDeleteAdmin(" + item.Program_Id + ")'><i class='glyphicon glyphicon-trash'> </i></a></td>" +
                   "</tr>";

            });

            document.getElementById('btnAddNew').disabled = "";
        }
        ProgramDataForTable += "</tbody>" +
                       "</table>"



        var tempProgramDataForTable = $compile(ProgramDataForTable)($scope);


        document.getElementById('divProgramDetails').innerHTML = "";

        angular.element(document.getElementById('divProgramDetails')).append(tempProgramDataForTable);



    }

    $(document).on("click", ".btnEditProgram", function () {
        $scope.PIDToUpdate = $(this).data('id');
        $scope.oldProgName = $(this).data('pname');
        document.getElementById("NewNameForProg").placeholder= $scope.oldProgName;
    });
    $scope.addNewProgram = function () {
      // alert($scope.PID);
        var Prog = { "Program_Name": $scope.ProgName, "Parent_Id": $scope.PID };
        $.ajax({
            url: "../api/program/CreateNewProgram/",
            type: "POST",
            data: Prog,
            async: false,
            success: function (data) {
                if (data == 1)
                {
                    alert('New Program Added'); $scope.RadioChange('Program');
                    $('#divAddNew').modal('toggle');
                   

                }
                else if (data == 2) {
                    alert('New Project Added'); $scope.GetSelectedProgram();
                    $('#divAddNew').modal('toggle');


                }
                else if (data == -1) {
                    alert('A Program With Same Name Already Exists');

                }
                else if (data == -2) {
                    alert('A Project With Same Name Already Exists In This Program');

                }

                document.getElementById("NameForNewProg").value = "";
                $scope.ProgramList = getProgramProjectData(0);
            },
            error: function () {
                //alert("Error value  = ");
                //connectionError("api/program/GetAllProgram/" + id);
            }
        });

    }
 
    $scope.DeleteProgram= function(ProgId) {
        var Prog = { "Program_Id": ProgId, "Parent_Id": $scope.PID };
        $.ajax({
            url: "../api/program/DeleteProgramProject/",
            type: "Delete",
            data: Prog,
            async: false,
            success: function (data) {
                if (data == 1)
                { alert('Program Deleted'); $scope.RadioChange('Program'); $scope.ProgramList = getProgramProjectData(0); }
                else if (data == 2) { alert('Project Deleted'); $scope.GetSelectedProgram(); }
                else if (data == -1) { alert('Cannot be deleted'); }
                $scope.ProgramList = getProgramProjectData(0);
             
              
            },
            error: function () {
                //alert("Error");

            }
        });
    }

    $scope.UpdateProgram = function ()
    {
        var Prog = { "Program_Id": $scope.PIDToUpdate, "Program_Name": $scope.UpdatedProgName, "Parent_Id": $scope.PID };
        $.ajax({
            url: "../api/program/UpdateProgramProject/",
            type: "PUT",
            data: Prog,
            async: false,
            success: function (data) {
                if (data == 1)
                {
                    alert('Program Updated'); $scope.RadioChange('Program');
                    

                }
                else if (data == 2) {
                    alert('Project Updated'); $scope.GetSelectedProgram();

                }
                else if (data == -1) { alert('Cannot be Updated'); }
                $('#divUpdateProgram').modal('toggle');
                document.getElementById("NewNameForProg").value = "";
                $scope.ProgramList = getProgramProjectData(0);
            },
            error: function () {
                //alert("Error");
                
            }
        });

    }

    $scope.GetSelectedProgram = function ()
    {
        var PID = $scope.PID;
        $scope.RadioChange(PID);
    }

    $(document).ready(function () { $scope.RadioChange('Program'); });

}]);

function getProgramProjectData(ID) {

    var jsonDataResponse = "";
    $.ajax({
        url: "../api/program/GetAllProgram/" + ID,
       
        type: "GET",
        async: false,
        //data: {
        //    ID: id
        //},
        success: function (data) {
            // alert("Changed value  = ");
            jsonDataResponse = data;
        },
        error: function () {
       
            connectionError("");
        }
    });
    return jsonDataResponse;
}

function GetResponseForDeleteAdmin(ProgId) {
    bootbox.confirm("Are You Sure To Delete ?", function (e) {
        if (e == true) {
           // $scope.DeleteProgram(ProgId);
            angular.element(document.getElementById('adminGridListingID')).scope().DeleteProgram(ProgId);

        }
    });
}
