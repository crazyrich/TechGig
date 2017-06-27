var financeDrillDown = 0;
var financeDillDownProgramName="";
function addFinanceData() {
   
    var table = document.getElementById('tblFinanceDataControl').getElementsByTagName('tbody')[0];
    var rows = $('#tblFinanceDataControl tbody >tr');
    var Ftd = $(rows[0]).find('td').first();
  //  alert("td  = " + $(Ftd).html());

    var StrtIndx = parseInt($(Ftd).html()) - 1;
  //  alert("StrtIndx=" + StrtIndx);
    var endIndx = StrtIndx + table.rows.length;

    var row = table.insertRow(table.rows.length);
    ////var row = table.insertRow(0);
    var row1 = endIndx;

    var rowID = "FinanceRow" + row1;
    row.id = rowID;//id to row
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
    cell1.innerHTML = "<div id='Row" +row1+ "' style='display:none;padding: 0px;width:0px;'></div>";
    cell2.innerHTML="<div id='finance" +row1+ "' style='display:none;padding: 0px;width:0px;'></div>"
        cell3.innerHTML = createProgramDropDown(row1);
        cell4.innerHTML = createProjectDropDown(null, row1);
        cell5.innerHTML = "<input  type='text' size='12'  data-type='Number' onblur='return validate(this)'  id='AllocatedBudget" + row1 + "' style=' border:0px;outline:0px;'>";
        cell6.innerHTML = "<input  type='text' size='12'  data-type='Number' onblur='return validate(this)'  id='RevisedBudget" + row1 + "' style=' border:0px;outline:0px;'>";
        cell7.innerHTML = "<input  type='text' size='12'  data-type='Number' onblur='return validate(this)' id='UsedBudget" + row1 + "' style=' border:0px;outline:0px;'>";
		cell8.innerHTML = "<button type='button' class='btn btn-primary' onclick='cancelNewRowFinance(" + rowID + ")'>Cancel</button>";
        //cell7.innerHTML = "<button class='btn btn-sm btn-danger' disabled onclick='DeleteRow()'><i class='fa fa-trash'></i> Delete</button>"
        //document.getElementById('InsertRowButtonForFinance').disabled = true;
		$('#InsertRowButtonForFinance').prop("disabled", "true");

    };
	//fxn to CANCEl
function cancelNewRowFinance(rowID) {

    $(rowID).remove();

    document.getElementById('InsertRowButtonForFinance').disabled = false;

}

function DeleteFinance(Finance_Id) {

    var Finance_Master = {
        FinanceId: Finance_Id

    };

    var stringData = JSON.stringify(Finance_Master);

    var urlString = "api/DeleteFinance/";


    $.ajax({
        url: urlString,
        type: "DELETE",
        data: stringData,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            //Code to re update the time line on delete click
            var data = document.getElementById('hdSetpageindex').value.split(',');
            angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#txtResult").val(err.Message)
        }
    });

    var data = document.getElementById('hdSetpageindex').value.split(',');
    angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
    document.getElementById('divEditFinance').style.display = "none";

};

function createProgramDropDown(i)
{
    var abc = document.getElementById('hdSetpageindex').value.split(',');
    if (abc[3] == 'N') {
        financeDrillDown = 1;
        financeDillDownProgramName = abc[4];
    }
    var jsonData = getProgramData();
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    var PermissionList = EditPermissionListForLoginUser;

    var newJsonData = [];
    if (financeDrillDown == 0)
    {
        $.each(jsonData, function (i, item) {

                    $.each(PermissionList, function (j, it) {
                    if (it.PID == item.Program_Id && it.EditPermission == 'Y' && item.Parent_Id == 0)

                        newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name });
                    });
        });
        }
        else
    {
        $.each(jsonData, function (i, item) {
            $.each(PermissionList, function (j, it) {

                if (it.PID == item.Program_Id && it.EditPermission=='Y' && item.Parent_Id == 0 && item.Program_Id == financeDillDownProgramName) {
                    newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name });
                }
            });
        });
    }


    var data = "<option value=''> Please select </option>";
    $.each(newJsonData, function (i, item) {
        if (item.Program_Id == $("#hdGlobalID").val()) {
            data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
        }
        else {
            data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
        }
    });
    var id = "program" + i;
    //if ($("#hdGlobalID").val() != '0') {
    //    var drpDownProgram = "<select data-ctl='" + "project" + i + "' id='" + id + "' onchange='PopulateProjects(this);' class='selectpicker' data-style='btn-primary'  data-width='30' style=' border:0px;outline:0px;width:100%'>" + data + "</select>"

    //}
    //else
    //{
        var drpDownProgram = "<select data-ctl='" + "project" + i + "' id='" + id + "' onchange='PopulateProjects(this);' class='selectpicker' data-style='btn-primary'  data-width='30' style=' border:0px;outline:0px;width:100%'>" + data + "</select>"

   // }

    return drpDownProgram;
}

function createProjectDropDown(ctl, rowid) {

    var data = "";
    var myID = 0;
   
    var jsonData = "";
    //; getProgramData(myID);
    var FinanceData = "";
    myID = $("#hdGlobalID").val();

    var newJsonData = [];
    if (ctl == 'undefined' || ctl == null) {
        data += "<option value=''> Please select </option>";

    //    if (myID != 0) {
    //        jsonData = getBindProjects(myID);
    //        FinanceData = getFinanceData(myID);

    //        newJsonData = FindUnallocatedProjects(jsonData, FinanceData);
    //        //$.each(jsonData, function (i, item) {
    //        //    newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name });
    //        //});

    //        if (Object.keys(newJsonData).length != 0) {

    //            $.each(newJsonData, function (i, item) {

    //                data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
    //            });
    //        }
    //        else
    //        {
    //            data += "<option value=''>---No More Projects---</option>";
    //        }
    //    }
       
    }
    else {
        //var newCtlId = $(ctl).attr('data-ctl');

        //var selProject = $("#" + newCtlId);

        //$(selProject).empty();
     
        //var SelectedProgram = $(ctl).val();      
    }

    var id = "project" + rowid;
    var drpDownProgram = "<select id=" + id + " class='selectpicker' data-style='btn-primary'  data-width='30' style=' border:0px;outline:0px;width:100%'>" + data + "</select>";
    return drpDownProgram;
}

//function getProgramData() {

//    var ID = 0;

//    //var data = document.getElementById('hdSetpageindex').value.split(',');
//    // if (data[3] == 'Y') {
//    //     ID = 0;
//    //}
//    //else
//    //{
//    //     ID=data[4]
//    //}
//        //$("#programid").val();
   
//    var jsonDataResponse = "";
//    $.ajax({
//        url: "api/program/GetAllProgram/" + ID,
//        //url: "api/milestone",
//        type: "GET",
//        async: false,
//        success: function (data) {
//            //alert("Changed value  = ");
//            jsonDataResponse = data;
//        },
//        error: function () {
//            //alert("Error value  = ");
//            connectionError("api/program/GetAllProgram/");
//        }
//    });
//    return jsonDataResponse;

//}

function connectionError(ProblemURL)
{
   // alert('You Got Some Problem!!' + ProblemURL);

}

function getBindProjects(ID) {

 
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    var uri = "api/Program/GetProgramByUserId?ProgramId=" + ID + "&LoginId=" + person.UserName;

    var jsonDataResponse = "";
    $.ajax({
        url: uri,
        type: "GET",
        async: false,
        success: function (data) {
            jsonDataResponse = data;
            
        },
        error: function () {
            //alert("Error value  = ");
            connectionError("Finance >> getBindProjects()");
        }
    });
    return jsonDataResponse;

}

function PopulateProjects(ProgCtl)
{
    
    var ProgID = $(ProgCtl).val();
    // alert("Change Fire = " + ProgID);

    var jsonData = getBindProjects(ProgID);

    var newCtlId = $(ProgCtl).attr('data-ctl');

    var ProjectCtl = $("#" + newCtlId);
    $(ProjectCtl).empty();
    ProjectCtl.append("<option value='0'> Please select </option>");
    var financeData = "";
    var FinPromise = getFinanceData(ProgID);
    FinPromise.then(function (jsonDataResponse) {

        financeData=jsonDataResponse;

    }, function () {
    })

    var UnallocatedProjects = FindUnallocatedProjects(jsonData, financeData);
    var PermissionList = EditPermissionListForLoginUser;

    if (Object.keys(UnallocatedProjects).length != 0) {

        $.each(UnallocatedProjects, function (i, item) {

            $.each(PermissionList, function (j, it) {

                if (it.PID == item.Program_Id && it.EditPermission == 'Y')
                    ProjectCtl.append("<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>");
            });
        }
        );
    }
    else
    {
       // $(ProjectCtl).empty();
        ProjectCtl.append("<option value='0'> ----No More Projects--- </option>");
    }

}

function FindUnallocatedProjects(AllProjectData, financeAllocatedProjectData)
{
    var flag = true; var UnallocatedProjects = [];
    $.each(AllProjectData, function (i, item) {

        flag = true;

        $.each(financeAllocatedProjectData, function (j, item1)
        {
            if (item.Program_Id == item1.ProgramID)
            {
                flag = false;
            }
        });

        if (flag == true)
        {
            UnallocatedProjects.push(item);

        }
        
    });

    return UnallocatedProjects;
}

function setDrillDownValue(i,prg) {
    financeDrillDown = i;
    financeDillDownProgramName = prg;
}