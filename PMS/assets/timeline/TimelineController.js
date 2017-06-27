app.controller('viewTimeline', function ($scope, $http) {
    $scope.timeline = function abcd() {
        var newJsonData = [];
        var data = null;
        data = getmilestonedata();
        document.getElementById('divGrid').innerHTML = null;
        $.each(data, function (i, item) {
            if (document.getElementById('statusProgramOrProject').value == "Y") {
                if (item.Parent_Id == document.getElementById('programid').value && item.Major_Minor == "Major") {
                    newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.CreatedDate });

                }
            }
            else {
                if (item.Project_Id == document.getElementById('programid').value) {
                    newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.CreatedDate });

                }
            }
        });

        var container = document.getElementById('divGrid');
        var items = new vis.DataSet(newJsonData);
        var options = { height: 330, border: null };
        var timeline = new vis.Timeline(container, items, options);
    }
});

app.controller('editTimelineData', function ($scope) {
    $scope.value = getmilestonedata();
    $scope.editData = function timelineData() {
        $scope.value = getmilestonedata();
        var newJsonData = [];
        $.each($scope.value, function (i, item) {
            if (document.getElementById('statusProgramOrProject').value == "Y") {
                if (item.Parent_Id == document.getElementById('programid').value && item.Major_Minor == "Major") {
                    newJsonData.push({ "MileStoneId": item.MileStoneId, "Parent_Id": item.Parent_Id ,"Project_Name": item.Project_Name, "Release": item.Release, "Milestone_Description": item.Milestone_Description, "M_Date": item.CreatedDate, "Revised_Date": item.RevisedDate, "Priority": item.Priority, "Major_Minor": item.Major_Minor, "Dependency": item.Dependency, "Notes": item.Notes });
                }
            }
            else {
                if (item.Project_Id == document.getElementById('programid').value) {
                    newJsonData.push({ "MileStoneId": item.MileStoneId, "Parent_Id": item.Parent_Id, "Project_Name": item.Project_Name, "Release": item.Release, "Milestone_Description": item.Milestone_Description, "M_Date": item.CreatedDate, "Revised_Date": item.RevisedDate, "Priority": item.Priority, "Major_Minor": item.Major_Minor, "Dependency": item.Dependency, "Notes": item.Notes });

                }
            }
            
        });
        var tableID = 'tblDataControl';
        var dyntable = "<div><table id='tblDataControl' class='table table-bordered table-hover'><thead>" +
        "<tr><th ></th><th style='padding: 0px;width:0px;'></th><th>Project</th><th>Release</th><th>Milestone Description</th><th>Milestone Date</th><th>Priority</th><th>Level</th><th>Dependency</th><th>Notes</th><th></th></tr></thead><tbody>"
        $.each(newJsonData, function (i, item) {
            var dt = item.M_Date.split(" ");
            dyntable += "<tr id='TimelineRow" + i + "'>" +
                "<td > <div style='display:none' >&nbsp;</div></td><td style='padding: 0px;width:0px;'> <div style='display:none' > " + item.MileStoneId + "</div></td>" +
                                               "<td ><div style='display:none;'> " + item.ProjectName + "</div>" + createResourceProjectDropDown(null, i, 0, item.Parent_Id, item.Project_Name) + "</td>" +
                "<td><div style='display:none' > " + item.Release + "</div>" + createTextArea(valueCheck(item.Release), i, "Release") + "</td>" +

                        "<td><div style='display:none' > " + item.Milestone_Description + "</div>" + createTextArea(valueCheck(item.Milestone_Description), i, "Description") + "</td>" +
                             "<td><div style='display:none' > " + item.M_Date + "</div>" + createDateTextbox(valueCheck(item.M_Date), i, "mdate") + "</td>" +
                        //"<td> <div style='display:none' > " + item.Revised_Date + "</div>" + createDateTextbox(valueCheck(item.Revised_Date), i, "revised") + "</td>" +
                        
            "<td> <div style='display:none' > " + item.Priority + "</div>" + createDropDown(item.Priority, i) + "</td>" +
                        "<td> <div style='display:none' > " + item.Major_Minor + "</div>" + createMajorMinorDropDown(item.Major_Minor, i) + "</td>" +
                       "<td><div style='display:none' > " + item.Dependency + "</div>" + createTextArea(valueCheck(item.Dependency), i, "Dependency") + "</td>" +

                        "<td> <div style='display:none' > " + item.Notes + "</div>" + createTextArea(valueCheck(item.Notes), i, "Notes") + "</td>" +
           // "<td><button class='btn btn-sm btn-danger' onclick='DeleteMilestone(" + item.MileStoneId + ")'><i class='fa fa-trash'></i> Delete</button></td></tr>";

            "<td><a  href='javascript:void(0)' onclick='getTrueFalseDeleteMilestone(" + item.MileStoneId + ")'><i class='glyphicon glyphicon-trash'> </i>  </a><a  href='javascript:void(0)' onclick='addMilestoneData()'><i class='glyphicon glyphicon-plus'> </i>  </a></td></tr>";

        });
        dyntable += "</tbody></table>";
        dyntable += "<table><tr><td align='right' valign='top' style='width:1100px;padding:4px;'>";
       // dyntable += "<button type='button' id='InsertRowButtonForTimeline' class='btn btn-primary' onclick='addMilestoneData()'>Insert Row</button>&nbsp;&nbsp"

        dyntable += "<button type='button' onclick='cancelSaveTimeline();' class='btn btn-secondary'>Cancel</button></td>";
        dyntable += "<td align='right' valign='top' style='padding:4px;'><button style='display:none;' id='InsertRowButtonForTimeline' type='button' class='btn btn-primary' onclick='addMilestoneData()'>Insert Row</button>&nbsp;&nbsp</td>"

        dyntable += "<td align='right' valign='top' style='padding:4px;'><button type='button' class='btn btn-primary' onclick='updateTimelineData();';>Save</button>";

        dyntable += "</td></tr></table></div>";
        document.getElementById('divEditGrid').innerHTML = "";
        document.getElementById('divEditGrid').innerHTML = dyntable;

        $('#divEditGrid table tr').each(function () {
            $('td:nth-child(6)').find('input').datepick({


                format: "YYYY-MM-DD"

            });
            //$('td:nth-child(7)').find('input').datepick({


            //    format: "YYYY-MM-DD"

            //});
        });

        //function valueCheck(item) {
        //    if (item === null || item === undefined)
        //        return " ";
        //    else
        //        return item;
        //}
        if (Object.keys(newJsonData).length <= 0)
            $('#InsertRowButtonForTimeline').css("display", "block");

        createResponsiveGrid(tableID);

    }
});


function cancelSaveTimeline() {

    $('#divEditTimeline').css("display", "none");

}
function getTrueFalseDeleteMilestone(Id) {
    bootbox.confirm("Are You Sure To Delete ?", function (e) {
        if (e == true) {
            DeleteMilestone(Id);
        }
    });

}