
//*** Start : Global Variable for the App ***//

//------- Used at KeyAccomplishment -------//

var arrKeyAccom = [];  // These are used in Keyaccomplishment controller and model window for Keyaccomplishment update
var preNextStep = [];  // These are used in Keyaccomplishment controller and model window for Keyaccomplishment update

//*** End : Global Variable for the App ***//

var arrModPermission = [];


// NEXT FUNCTION DROPDOWN
function getProgramData() {
    var ID = '0';
   // var PID = (document.getElementById("programid").value).trim();
    var jsonDataResponse = "";
    $.ajax({
        url: "api/program/GetAllProgram/" + ID,
        //url: "api/milestone",
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
            //alert("Error value  = ");
            connectionError("api/program/GetAllProgram/" + id);
        }
    });

    

    //  var jqxhr = $.get("api/program/GetAllProgram/" + ProgID, function () {
    //      alert("success");
    //  })
    //.done(function (response) {
    //    alert("second success");
    //})
    //.fail(function () {
    //    alert("error");
    //})
    //.always(function () {
    //    alert("finished");
    //});
    return jsonDataResponse;

}

function getProgramDataByUserId() {
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    var ID = '0';
    // var PID = (document.getElementById("programid").value).trim();
    var uri="api/Program/GetProgramByUserId?ProgramId=" + ID + "&LoginId=" + person.UserName;
    var jsonDataResponse = "";
    $.ajax({
        url: uri,
        //url: "api/milestone",
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
            //alert("Error value  = ");
            // connectionError("api/program/GetAllProgram/" + id);
        }
    });
    return jsonDataResponse;

}

//Value Check - finanace ,Resource
function valueCheck(item) {
    if (item === null || item === undefined)
        return " ";
    else
        return item;
}
// Responsive Grid 

function createResponsiveGrid(tableID) {
    var bugTable = $('#'+tableID).DataTable({
        "columnDefs": [{

            "searchable": false,
            "orderable": false,
            "targets": 0,
        }],
        fixedHeader: true,
        responsive: true,
        "order": [],

    });

    bugTable.on('order.dt search.dt', function () {
        bugTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();
}
//INPUT Field

function createTextbox(data, i, name, dataType) {
    var id = name + i;
    var div = "";

    div = "<input type='text' data-type='" + dataType + "' onblur='return validate(this)'  size='12'  id=" + id + " value='" + data + "' style=' border:0px;outline:0px;'>";
    return div;
}

function createTextArea(data, i, name, dataType) {
    var id = name + i;
    var div = "";

    div = "<textarea rows='2' data-type='" + dataType + "' onblur='return validate(this)'  size='12'  id=" + id + " value='" + data + "' style=' border:0px;outline:0px;resize:none;'>" + data + "</textarea>";
    return div;
}




////fxn to CANCEl
//function cancelNewRow(rowID,module) {

//    $(rowID).remove();
//    if (module == 'Finance') {
//        document.getElementById('InsertRowButtonForFinance').disabled = false;
//    } else if (module == 'Resource') {
//        document.getElementById('InsertRowButtonForResource').disabled = false;
//    } else if (module == 'Timeline') {
//        document.getElementById('InsertRowButtonForTimeline').disabled = false;
//    }

//}

function monthFormated(date) {
    //If date is not passed, get current date
    if (!date)
        date = new Date();

    month = date.getMonth();

    // if month 2 digits (9+1 = 10) don't add 0 in front 
    return month < 9 ? "0" + (month + 1) : month + 1;
}

function BindMonths(ctl,isDefault)
{
    if ((ctl == null) || (typeof (ctl) == undefined))
    {
        alert("Id is missing for Month control at KeyAccomplishment Model");
        return;
    }

    $("#keyWeek").empty();
    $("#keyWeek").append('<option value="' + "-1" + '" >' + "Please select Week" + '</option>');

    var d = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    //var n = month[d.getMonth()];
    var n = d.getMonth();


    var selYear = $(".clsParentYear").val();
    var strOption = "";
    var isCurrentyear = false;
    if (selYear == d.getFullYear())  {

        isCurrentyear = true;

    }
    else {
        n = 11;
    }
    if (isDefault != '0')
    {
        isCurrentyear = false;
    }

    var indx =0;
    $("#" + ctl).empty();
    $("#" + ctl).append('<option value="' + "-1" + '" >' + "Select Month" + '</option>');
    for (indx = 0; indx <= n; indx++) {

        var strSelected = "";
        if ((indx == n) && (isCurrentyear == true)) {
            strSelected = 'selected=selected'
        }
        else {
            strSelected = "";
        }

        $("#" + ctl).append('<option value="' + (indx +1) + '" ' + strSelected + '>' + month[indx] + '</option>');
     
    }
   
}

function BindYears(ctl) {

    if ((ctl == null) || (typeof (ctl) == undefined)) {
        alert("Id is missing for Year control at KeyAccomplishment Model");
        return;
    }
 
    var d = new Date();
    var strYear = d.getFullYear();
    var indx = 0;

    $("#" + ctl).empty();
    for (indx = strYear; indx >= (strYear-4); indx--) {

        var strSelected = "";
        if (indx == strYear) {
            strSelected = 'selected=selected'
        }
        else {
            strSelected = "";
        }

        $("#" + ctl).append('<option value="' + indx + '" ' + strSelected + '>' + indx + '</option>');

    }
}

function BindWeeks(ctl,isDefault)
{
    var selYear = $(".clsParentYear").val(); // clsParentMonth
    var selMonth = $(".clsParentMonth").val();

    var dat = new Date();

    var isCurrentyear = false;
    var newMonth = (parseInt(selMonth) - 1);
    if ((selYear == dat.getFullYear()) && (newMonth == dat.getMonth())) {

        isCurrentyear = true;

    }
    if ((isDefault != '0') && (isCurrentyear == false)) {
       
        dat = new Date(selYear, newMonth,27);
    }
    

    
    var myWeeknumber = getWeekOfMonth(dat)
    //  <option value="1">WEEK 1</option>
    var myday = new Date();
    var CurrentDay = myday.getDay();
   
    var someDate = new Date();
    
    if (isCurrentyear = true) {
        if (parseInt(CurrentDay) < 4) {
            myWeeknumber = parseInt(myWeeknumber) - 1;
        }
        if (myWeeknumber == "0") {

            var numberOfDaysToAdd = myday.getDate();
            someDate.setDate(someDate.getDate() - numberOfDaysToAdd);
            myWeeknumber = CustomeWeekNumber(someDate);
        }

    }
    else {
        myWeeknumber = parseInt(myWeeknumber) + 1;
    }

    $("#" + ctl).empty();
    $("#" + ctl).append('<option value="' + "-1" + '" >' + "Please select Week" + '</option>');

    var indx = 1;
    for (indx = 1; indx <= myWeeknumber; indx++) {

        var strSelected = "";
        if (indx == myWeeknumber && isDefault == '0') {
            strSelected = 'selected=selected'
        }
        else {
            strSelected = "";
        }

        $("#" + ctl).append('<option value="' + indx + '" ' + strSelected + '>' + "WEEK " + indx + '</option>');

    }
}

function getWeekOfMonth(date) {
    var day = date.getDate()
    day -= (date.getDay() == 0 ? 6 : date.getDay() - 1);//get monday of this week
    //special case handling for 0 (sunday)
    
    day += 7;
    //for the first non full week the value was negative
    
    prefixes = ['0', '1', '2', '3', '4', '5'];
    return prefixes[0 | (day) / 7];
}

function findProgramsWithEditableProjects(PermissionList) {

    var TempPermissionList = [];
    $.each(PermissionList, function (i, item) {
        if (item.EditPermission == 'Y')
            TempPermissionList.push(item);
    });

    for (var i in TempPermissionList) {
        allProgramID.push(TempPermissionList[i].ParentID);
    }

    distinctProgramIDWithEditableProjects = allProgramID.filter(function (item, i, allProgramID) {
        return i == allProgramID.indexOf(item);
    });

    return distinctProgramIDWithEditableProjects;
}

function CustomeWeekNumber(date)
{
    var day = date.getDate(date);
    var numberOfDaysToAdd = (date.getDate() -1);
    date.setDate(date.getDate() - numberOfDaysToAdd);
    var CustomMonth = "";// date.getMonth();
    var weekCount = 0;
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    CustomMonth = month[date.getMonth()];

    while (month[date.getMonth()].indexOf(CustomMonth) != -1)
    {
        if (date.getDay() == "4")
        {
            weekCount = parseInt(weekCount) + 1;
        }
      
        date.setDate(date.getDate() + 1);
    }

    $("#keyMonth").val(date.getMonth());
    return weekCount;
}


