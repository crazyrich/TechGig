function updateTimelineData() {
    var data = document.getElementById('hdSetpageindex').value.split(',');
    //var input = confirm(" Are You Sure You Want To Save ?");
    //if (input == true) {
        var jsonData = "";
        var rows = $('#tblDataControl tbody >tr');
        var columns;
        var temp = null;
        var milestoneId, release, description, milestonedt, reviseddt, priority, dependency, notes, id, projectIdValue, majorMinorValue;


        var Ftd = $(rows[0]).find('td').first();
        var StrtIndx = parseInt($(Ftd).html()) - 1;
        var endIndx = parseInt(StrtIndx + rows.length);
        var duplicateValueCheckFlag = 0;
        //for (var i = 0; i < rows.length; i++) {
        $.each(rows, function (indx, item) {
            i = (StrtIndx + indx);
            columns = $(this).find('td');
            if (columns.length >= 9) {
                for (var j = 1; j < columns.length; j++) {
                    //console.log($(columns[j]).html());

                    if (j == 1) {
                        temp = $(columns[j]).html();
                        temp = temp.replace('<div style="display: none;">', '');
                        temp = temp.replace('<div style="display:none">', '');
                        temp = temp.replace('</div>', '');
                        temp = temp.replace('<br>', '');
                        temp = temp.replace(/^\s+|\s+$/gm, '');
                        milestoneId = temp.trim();
                    }

                    if (j == 2) {
                        temp = $(columns[j]).html();
                        id = "Release" + i;
                        release = (document.getElementById(id).value).trim();
                    }
                    else
                    if (j == 3) {
                        id = "Description" + i;
                        description = (document.getElementById(id).value).trim();
                    }
                    else if (j == 4) {
                        id = "mdate" + i;
                        milestonedt = (document.getElementById(id).value).trim();
                    }
                    //else if (j == 5) {
                    //    id = "revised" + i;
                    //    reviseddt = (document.getElementById(id).value).trim();

                    //}
                    else if (j == 6) {
                        priority = (document.getElementById("priority" + i).value).trim();
                    }
                    else if (j == 7) {
                        id = "Dependency" + i;
                        dependency = (document.getElementById(id).value).trim();
                    }
                    else if (j == 8) {
                        id = "Notes" + i;
                        notes = (document.getElementById(id).value).trim();
                    }
                    id = "project" + i;
                    projectIdValue = (document.getElementById(id).value).trim();

                    id = "majorMinor" + i;
                    majorMinorValue = (document.getElementById(id).value).trim();
                    if (majorMinorValue.trim() == "Program") {
                        majorMinorValue = "";
                        majorMinorValue = "Major";
                    }
                    else {
                        majorMinorValue = "";
                        majorMinorValue = "Minor";
                    }
                }

                if (rows.length > 1) {

                    for (var k = StrtIndx; k < i; k++) {



                        var descriptionData, projectData, milestoneData,realeaseData;



                        id = "Description" + k;

                        descriptionData = (document.getElementById(id).value).trim();

                        id = "project" + k;
                        projectData = (document.getElementById(id).value).trim();


                        id = "Release" + k;
                        realeaseData = (document.getElementById(id).value).trim();
                        
                        id = "mdate" + k;
                        milestoneData = (document.getElementById(id).value).trim();

                        if (descriptionData == description && projectData == projectIdValue && milestoneData == milestonedt && realeaseData == release) {

                            duplicateValueCheckFlag = 1;

                        }

                    }

                }

                if (duplicateValueCheckFlag == 0) {
                    if (milestoneId == "")
                        milestoneId = "0";
                    var programData = document.getElementById('hdSetpageindex').value.split(',');

                    var programId = "";
                    var projectId = "";
                    if (programData[3] == "Y") {
                        programId = programData[2];
                        projectId = "0";
                    }
                    else {
                        programId = programData[4];
                        projectId = programData[2];
                    }
                    var Milestone_Master = {
                        MileStoneId: milestoneId,
                        Program_Id: programId,
                        Project_Id: projectIdValue,
                        Release: release,
                        Milestone_Description: description,
                        CreatedDate: milestonedt,
                        RevisedDate: milestonedt,
                        Priority: priority,
                        Major_Minor: majorMinorValue,
                        Dependency: dependency,
                        Notes: notes

                    };


                    var stringData = JSON.stringify(Milestone_Master);
                    var urlString = "api/milestone/";
                    $.ajax({
                        url: urlString,
                        type: "PUT",
                        data: stringData,
                        dataType: 'json',
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {
                            //Code to reload the time line again.


                            // angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);

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

            alert("Duplicate value for Project, Release, Milestone Description and Milestone Date is not allowed!");

        }
     //   angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
        angular.element(document.getElementById('edit')).scope().editData();
        //document.getElementById('divEditTimeline').style.display = "none";
        document.getElementById('InsertRowButtonForTimeline').disabled = false;

        document.getElementById('divEditTimeline').style.display = "none";
        angular.element(document.getElementById('mainnav')).scope().helperMethods.BindTimeLineData();

}

//function createResponsiveGrid() {
//    var bugTable = $('#tblDataControl').DataTable({
//        "columnDefs": [{
//            "searchable": false,
//            "orderable": false,
//            "targets": 0
//        }],
//        "order": [],
//        responsive: true
//    });

//    bugTable.on('order.dt search.dt', function () {
//        bugTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
//            cell.innerHTML = i + 1;
//        });
//    }).draw();



//}

function createDropDown(priority, i) {
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
        data = "Please Select,Low,Medium,High";
    }
    var id = "priority" + i;
    var temp = data.split(',');

    if (temp.length == 4) {
        var drpDownPriority = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
      "<option selected='' disabled='disabled' value=''>" + temp[0] + "</option>" +
      "<option >" + temp[1] + "</option>" +
      "<option >" + temp[2] + "</option>" +
      "<option>" + temp[3] + "</option>" +
      "</select>"
    }
    else {
 
        var drpDownPriority = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
      "<option >" + temp[0] + "</option>" +
      "<option >" + temp[1] + "</option>" +
      "<option>" + temp[2] + "</option>" +
      "</select>"
    }
    return drpDownPriority;
}

function createMajorMinorDropDown(major, i) {
    var data;
    if (major == "Major") {
        data = "";
        data = "Program,Project";
    }
    else if (major == "Minor") {
        data = "";
        data = "Project,Program";
    }
    else {
        data = "";
        data = "Please Select,Program,Project";
    }
    var id = "majorMinor" + i;
    var temp = data.split(',');
    if (temp.length == 3) {  
        var drpDownMajor = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
        "<option selected='' disabled='disabled' value=''>" + temp[0] + "</option>" +
    "<option >" + temp[1] + "</option>" +
    "<option >" + temp[2] + "</option>" +
    "</select>"
    }
    else
    {
        var drpDownMajor = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" +
    "<option >" + temp[0] + "</option>" +
    "<option >" + temp[1] + "</option>" +
    "</select>"

    }
    return drpDownMajor;
}

function createDateTextbox(data, i, name) {
    var id = name + i;
    var div = "";
    if (name == "mdate" || name == "revised")
        div = "<input  type='text' size='12'  id=" + id + " onclick='datePickerControl(this)' value='" + data + "' style=' border:0px;outline:0px;'>";
    else
        div = "<input  type='text' size='12'  id=" + id + " value='" + data + "' style=' border:0px;outline:0px;'>";
    return div;
}

function datePickerControl(ctrl) {
    //var theId = ctrl.id;
    //$("#" + theId).datepicker({
    //         dateFormat: 'yy-mm-dd'
    //}).on('changeDate', function (e) {
    //   $(this).datepicker('hide');
    //});
    // $("#" + theId).datepicker().datepicker("show");

}

function addMilestoneData() {

    var table = document.getElementById('tblDataControl').getElementsByTagName('tbody')[0];
    var rows = $('#tblDataControl tbody >tr');

    var Ftd = $(rows[0]).find('td').first();
    var StrtIndx = parseInt($(Ftd).html()) - 1;
    var endIndx = StrtIndx + table.rows.length;
    var d = new Date();
    var month = d.getMonth() + 1;
    if (month < 10)
    {
        month = "0" + month;
    }
    var dt = d.getDate();
    if (dt < 10)
    {
        dt = "0" + dt;
    }
    var preFilledDate = d.getFullYear() + "-" + month + "-" + dt;
    var row1 = endIndx;
    var RID = "RID" + row1;

    var rowID = "TimelineRow" + row1;
 
    var row = table.insertRow(table.rows.length);

    row.id = rowID;//id to row

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    $(cell2).css("padding", "0px");
    $(cell2).css("width", "0px");
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    var cell11 = row.insertCell(10);
    var cell12 = row.insertCell(11);
    cell1.innerHTML = "";
    cell2.innerHTML = "";
    var prgDetail = document.getElementById('hdSetpageindex').value.split(',');
    if (prgDetail[3] == "Y") {
        cell3.innerHTML = createResourceProjectDropDown(null, row1, 0, prgDetail[2], prgDetail[1]);
    }
    else
    {
        cell3.innerHTML = createResourceProjectDropDown(null, row1,0 ,prgDetail[4], prgDetail[1]);

    }
    cell4.innerHTML = "<textarea rows='2' data-type='' size='12' id='Release" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell5.innerHTML = "<textarea rows='2' data-type='' size='12' id='Description" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
 
    cell6.innerHTML = "<input  type='text' size='12'  id='mdate" + row1 + "' onclick='datePickerControl(this)' value=" + preFilledDate + " style=' border:0px;outline:0px;'>";
    //cell7.innerHTML = "<input  type='text' size='12'  id='revised" + row1 + "' onclick='datePickerControl(this)' style=' border:0px;outline:0px;'>";
    cell7.innerHTML = createDropDown("", row1);
    cell8.innerHTML = createMajorMinorDropDown("", row1);
    
    cell9.innerHTML = "<textarea rows='2' data-type='' size='12' id='Dependency" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell10.innerHTML = "<textarea rows='2' data-type='' size='12' id='Notes" + row1 + "' style=' border:0px;outline:0px;resize:none;'>";
    cell11.innerHTML = "<button type='button' class='btn btn-primary' onclick='cancelNewRowTimeline(" + rowID + ")'>Cancel</button>";

    $('#divEditGrid table tr').each(function () {
        $('td:nth-child(6)').find('input').datepick({


            format: "YYYY-MM-DD"

        });
        //$('td:nth-child(7)').find('input').datepick({


        //    format: "YYYY-MM-DD"

        //});
    });
    document.getElementById('InsertRowButtonForTimeline').disabled = true;

}

//fxn to CANCEl
function cancelNewRowTimeline(rowID) {

    $(rowID).remove();

    document.getElementById('InsertRowButtonForTimeline').disabled = false;

}

function DeleteMilestone(MileStone_Id) {
  
    var Milestone_Master = {
        MilestoneID: MileStone_Id
    };
        var stringData = JSON.stringify(Milestone_Master);

        var urlString = "api/DeleteMilestone/";


        $.ajax({
            url: urlString,
            type: "DELETE",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //Code to re update the time line on delete click
                var data = document.getElementById('hdSetpageindex').value.split(',');
              //  angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });

        var data = document.getElementById('hdSetpageindex').value.split(',');
     //   angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
        document.getElementById('divEditTimeline').style.display = "none";
        angular.element(document.getElementById('mainnav')).scope().helperMethods.BindTimeLineData();
    

};

function getmilestonedata() {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/milestone",
        //url: "api/milestone",
        type: "get",
        async: false,
        success: function (data) {
            jsonDataResponse = data;
        },
        error: function () {
            connectionError();
        }
    });
    return jsonDataResponse;

}



