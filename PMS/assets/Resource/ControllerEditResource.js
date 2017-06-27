var program = 0;
var drillDown = 0;
var editDillDownProgramName;
app.service('ResourceService', ['$http', '$q', function ($http, $q) {


    var deferred = $q.defer();
    var id = document.getElementById('programid').value;
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var url_api = "api/resource?userid=" + person.UserName;
    this.getResource = function () {

        return $http.get(url_api).then(function (response) {
            //alert("Response = " + response)
            deferred.resolve(response);
            return deferred.promise;
        }, function (response) {
            deferred.reject(response);
            return deferred.promise;
        });
    } // end function

} // end parameter function
]);

//ControllerUpdateFinanceData

app.controller('ControllerUpdateResourceData', ['$scope', '$http', '$q', 'ResourceService', function ($scope, $http, $q, ResourceService) {


    var Resourcedata = [];

    ResourceService.getResource().then(function (result) {

        var arr = result.data;
        Resourcedata = result.data;
    }, function (error) {
        console.log(error.statusText);
    });

    var yr = 2016;
    var rowValue = 0;
    var yearMonthDropdown = "<div id='divEditResourceYearMonth' style='font-weight: bold'>Utilization For:- " + yearDropdown(valueCheck(yr), rowValue);
    yearMonthDropdown += "&nbsp;&nbsp;&nbsp;&nbsp; " + monthDropdown(valueCheck(yr), rowValue) + " </div><br/>";
    document.getElementById('divHeaderYear').innerHTML = "";
    document.getElementById('divHeaderYear').innerHTML = yearMonthDropdown;


    //Modal pop up with data of resource master table.
    $scope.editResourceData = function () {
        var temp11 = getResourceDetails();
        var newJsonData = [];

        $scope.Resourcedata = getallresources();

        var conditionId, conditionProgName;

        var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
        var PermissionList = EditPermissionListForLoginUser;
        if (hdnFieldValueForProject[3] == 'Y') { conditionId = drillDownProgramID; conditionProgName = drillDownProgramName }
        else { conditionId = drillDown; conditionProgName = editDillDownProgramName; }

        if (conditionId == 0) {
            $.each($scope.Resourcedata, function (i, item) {
                $.each(PermissionList, function (j, it) {

                    if (it.PID == item.ProjectID && it.EditPermission == 'Y')
                        newJsonData.push({ "ID": item.ID, "ProjectID": item.ProjectID, "ProgramID": item.ProgramID, "ProjectName": item.ProjectName, "ProgramName": item.ProgramName, "ResourceID": item.ResourceID, "ResourceName": item.ResourceName, "ResourceType": item.ResourceType, "ResourceLocation": item.ResourceLocation, "Designation": item.Designation, "Month": item.Month, "Year": item.Year, "PlannedHours": item.PlannedHours, "UtilizedHours": item.UtilizedHours, "DesignationId": item.DesignationId });
                });
            })

        }
        else {
            $.each($scope.Resourcedata, function (i, item) {
                $.each(PermissionList, function (j, it) {
                    if (it.PID == item.ProjectID && it.EditPermission == 'Y' && item.ProgramName.trim() == conditionProgName)
                        newJsonData.push({ "ID": item.ID, "ProjectID": item.ProjectID, "ProgramID": item.ProgramID, "ProjectName": item.ProjectName, "ProgramName": item.ProgramName, "ResourceID": item.ResourceID, "ResourceName": item.ResourceName, "ResourceType": item.ResourceType, "ResourceLocation": item.ResourceLocation, "Designation": item.Designation, "Month": item.Month, "Year": item.Year, "PlannedHours": item.PlannedHours, "UtilizedHours": item.UtilizedHours, "DesignationId": item.DesignationId });
                });
            });
        }
        var dyntable = "<div><table id='tblResourceDataControl' class='table table-bordered table-hover'><thead>" + "<tr><th></th><th style='display:none;padding:0px;width:0px;'></th><th>Program Name</th><th>Project Name</th><th>Resource Name</th><th>Resource Type</th><th>Resource Location</th><th>Planned Hours</th><th>Utilized Hours</th><th></th></tr></thead><tbody>";
        var yearId = "year0";
        var year = (document.getElementById(yearId).value).trim();
        var monthId = "month0";
        month = (document.getElementById(monthId).value).trim();
        var i = 0;

      

            $.each(newJsonData, function (j, item) {

                var ID = "ID" + i;
                var RID = "RID" + i;
                var program = "program" + i;
                var project = "project" + i;
                if (item.Year == year && item.Month == month) {
                    dyntable +=
                                "<tr id='ResourceRow" + i + "'>" +
                                "<td ><div></div></td>" +
                                "<td  style='display:none;padding:0px;width:0px;'><div id=" + ID + " style='display:none;padding:0px;width:0px;'>" + item.ID + "</div></td>" +
                                 "<td ><div style='display:none;'> " + item.ProgramName + "</div><div id=" + program + " style='display:none;'> " + item.ProgramID + "</div><label style='font-weight: normal'>" + item.ProgramName + "</label></td>" +
                                 "<td ><div style='display:none;'> " + item.ProjectName + "</div><div id=" + project + " style='display:none;'> " + item.ProjectID + "</div><label style='font-weight: normal'>" + item.ProjectName + "</label></td>" +
                               "<td ><div style='display:none;'> " + item.ResourceName + "</div><div id=" + RID + " style='display:none;'> " + item.ResourceID + "</div><label style='font-weight: normal'>" + item.ResourceName + "</label></td>" +
                                "<td ><div style='display:none;'> " + item.ResourceType + "</div>" + CreateTypeDropDown(valueCheck(item.ResourceType), i) + "</td>" +
                                "<td ><div style='display:none;'> " + item.ResourceLocation + "</div>" + CreateLocationDropDown(valueCheck(item.ResourceLocation), i) + "</td>" +
                                "<td ><div style='display:none;'> " + item.PlannedHours + "</div>" + createTextbox(valueCheck(item.PlannedHours), i, "PlannedHours", "Number") + "</td>" +
                                "<td ><div style='display:none;'> " + item.UtilizedHours + "</div>" + createTextbox(valueCheck(item.UtilizedHours), i, "UtilizedHours", "Number") + "</td>" +

                   // "<td><button class='btn btn-sm btn-danger' onclick='DeleteResource(" + item.ID + ")'><i class='fa fa-trash'></i> Delete</button></td></tr>";
                    "<td><a  href='javascript:void(0)' onclick='getTrueFalseDeleteResource(" + item.ID + ")'><i class='glyphicon glyphicon-trash'> </i>  </a><a >  </a></td></tr>";

                    i = i + 1;
                }
            });

        
       

            "<tr><td  colspan=10><a  href='javascript:void(0)' onclick='addResourceData()'><i class='glyphicon glyphicon-plus'> </i>  </a></td></tr>";
        

        dyntable += "</tbody></table>";
        dyntable += "<table><tr><td align='right' valign='top' style='width:900px;padding:4px;'>";
        dyntable += "<button type='button' onclick='cancelSaveResource();' class='btn btn-secondary'>Cancel</button></td><td align='right' valign='top' style='padding:4px;'>";

        dyntable += "<button  style='display:none' type='button' id='InsertRowButtonForResource' class='btn btn-primary' onclick='addResourceData()'>Insert Row</button>&nbsp;&nbsp;</td>&nbsp;&nbsp;"

        dyntable += "<td align='right' valign='top' style='padding:4px;'><button   type='button' class='btn btn-primary' onclick='updateResourceGridData();';>Save</button></td>";

        dyntable += "</tr></table></div>";
        document.getElementById('divEditResourceGrid').innerHTML = "";
        document.getElementById('divEditResourceGrid').innerHTML = dyntable;

        if (Object.keys(newJsonData).length <= 0) {
            $('#InsertRowButtonForResource').css("display", "none");
        }
        else {
            var flag = 0;
            var year = (document.getElementById('yearforgrid0').value).trim();
            var month = (document.getElementById('monthforgrid0').value).trim();
             
            $.each(newJsonData, function (i, item) {
                if(item.Year == year && item.Month == month){
                    flag = 1;
                }

            });

            if(flag == 0)
                $('#InsertRowButtonForResource').css("display", "block");
            else
                $('#InsertRowButtonForResource').css("display", "none");


        }
         createResponsiveGrid("tblResourceDataControl");
        getDataForResource = "";
        getDataForResource = $scope.Resourcedata;
        resourceChart();


    };

}]);


app.controller('ControllerShowResources', function ($scope) {
    $scope.CreateDropDowns = CreateDropDownsForResource();
    $scope.Resourcedata = getallresources();
    $scope.PortfolioData = getresourceportfolio();

});


function cancelSaveResource() {

    $('#divEditResource').css("display", "none");

}
//get the individuals--
function getallresources() {
    var ID = 0;
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var url_api = "api/Resource/GetDataForModification?ID=" + ID + "&userid=" + person.UserName;
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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

};

function getResourcesType() {
    var ID = 0;
    var url_api = "api/Resource/GetDataForresourceType";
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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

};

function getResourcesLocation() {
    var ID = 0;

    var url_api = "api/Resource/GetDataForResourceLocation";
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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

};


//gets the resources at portfolio level--
function getresourceportfolio() {
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var url_api = "api/resource?userid=" + person.UserName;
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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

};

//resource for changeResource  to Projects 
function changeResourceToProjectLevel(status, programName) {
    //var statusFlag = document.getElementById('statusProgramOrProject').value;
    //var id = document.getElementById('programid').value;
    // angular.element(document.getElementsByID('toShowProjects')).scope().getresourceproject(statusFlag, id);
    //var projectOrProgram = 'Y';// document.getElementsByID('hdSetpageindex').value;
    var jsonData = [];
    var tempData = [];
    if (status == 'Y') {
        drillDown = 0;
        jsonData = getResourceDetails();
        //  document.getElementById('spanResourceCount').innerHTML = '<span class="fFamily2" style="font-size:25px;">' + jsonData.length + '</span><span class="fontSizeApply fFamily1"> Persons</span>';
    }
    else {
        tempData = getallresources();
        drillDown = 1;
        var tempJsonData = [];
        editDillDownProgramName = programName.trim();
        for (var i = 0; i < tempData.length; i++) {
            if (tempData[i].ProgramName.trim() == programName.trim()) {
                tempJsonData.push(tempData[i]);
            }
        }
        jsonData = [];
        if (tempJsonData.length >= 1) {
            jsonData.push(tempJsonData[0]);
            var flag = true;
            $.each(tempJsonData, function (index, item) {
                flag = true;
                $.each(jsonData, function (index, item1) {
                    if (item.ResourceID == item1.ResourceID) {
                        flag = false;
                    }
                });
                if (flag == true) { jsonData.push(item); }
            });
        }
        else {
            jsonData = [];
        }


        //  document.getElementById('spanResourceCount').innerHTML = '<span class="fFamily2" style="font-size:25px;">' + jsonData.length + '</span><span class="fontSizeApply fFamily1"> Persons</span>';

    }

    BindDataToResourceGrid(0);
}

function CreateDropDownsForResource() {

    var yr = 2016;
    var rowValue = 0;
    var yearMonthDropdown = "<div style='font-weight: bold'> " + yearDropdownForGrid(valueCheck(yr), rowValue);
    yearMonthDropdown += "&nbsp;&nbsp;&nbsp;&nbsp; " + monthDropdownForGrid(valueCheck(yr), rowValue) + " </div><br/>";
    document.getElementById('divHeaderForYear').innerHTML = "";
    document.getElementById('divHeaderForYear').innerHTML = yearMonthDropdown;
}

function BindDataToResourceGrid(PrgId) {

    if (PrgId == "" || PrgId == 'undefined') { PrgId = 0; }

    if (resourceDrillToProjectLevel == 1) { PrgId = drillDownProgramID; }

    var yearId = "yearforgrid0";
    var year = (document.getElementById(yearId).value).trim();

    var monthId = "monthforgrid0";
    month = (document.getElementById(monthId).value).trim();

    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
    var ParentId = 0

    if (programOrProject[3] == 'Y') {

        if (PrgId == 0) {
            ParentId = 0;
        }
        else {
            ParentId = PrgId;
        }
        //document.getElementById('A1').innerHTML = "";
        //$("#hdGlobalID").val(0);
    }
    else {
        ParentId = programOrProject[4];
    }
    var jsonData = getResourceDetailsForGrid(ParentId, year, month);


    if (ParentId == 0) {
        var resourceDataForTableProgram = "<table class='table'>" +
                                   "<thead>" +
                                       "<tr>" +
                                          "<th>Program Name</th>" +
                                           "<th>Total Resources</th>" +
                                           "<th>Total Planned Hours</th>" +
                                           "<th>Total Utilized Hours</th>" +
                                       "</tr>" +
                                    "</thead>" +
                                   "<tbody >";

        if (Object.keys(jsonData).length != 0) {
            $.each(jsonData, function (indx, item) {
                resourceDataForTableProgram += "<tr>" +
                         "<td>" + item.ProgramName + "</td>" +
                         "<td>" + item.TotalResources + "</td>" +
                         "<td>" + item.TotalPlannedHours + "</td>" +
                         "<td>" + item.TotalUtilizedHours + "</td>" +
                     "</tr>";
            });
        }
        else {
            resourceDataForTableProgram += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available   </td></tr>"
        }

        resourceDataForTableProgram += "</tbody>" +
                   "</table>"

    }
    else {
        var resourceDataForTableProject = "<table class='table'>" +
                               "<thead>" +
                                   "<tr>" +
                                      "<th>Project Name</th>" +
                                           "<th>Total Resources</th>" +
                                           "<th>Total Planned Hours</th>" +
                                           "<th>Total Utilized Hours</th>" +
                                   "</tr>" +
                                "</thead>" +
                               "<tbody >";
        if (Object.keys(jsonData).length != 0) {
            $.each(jsonData, function (indx, item) {
                resourceDataForTableProject += "<tr>" +
                         "<td>" + item.ProjectName + "</td>" +
                         "<td>" + item.TotalResources + "</td>" +
                         "<td>" + item.TotalPlannedHours + "</td>" +
                         "<td>" + item.TotalUtilizedHours + "</td>" +
                     "</tr>";
            });
        }
        else {
            resourceDataForTableProject += "<tr><td colspan='4' style='text-align:center;'>No Data Is Available  </td></tr>"

        }
        resourceDataForTableProject += "</tbody>" +
                   "</table>"
    }


    document.getElementById('DivResourceDataForTable').innerHTML = "";
    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (programOrProject[3] == 'Y') {

        if (PrgId == 0) {

            document.getElementById('DivResourceDataForTable').innerHTML = resourceDataForTableProgram;
        }
        else { document.getElementById('DivResourceDataForTable').innerHTML = resourceDataForTableProject; }

    }
    else {
        //getResourceBarDataProject(document.getElementById('idBrdScrProgName').innerHTML.trim());
        document.getElementById('DivResourceDataForTable').innerHTML = resourceDataForTableProject;

    }
    document.getElementById('divEditResourceYearMonth').innerHTML = "Utilization For:- " + yearDropdown(0, 0) + "&nbsp;&nbsp;&nbsp;&nbsp; " + monthDropdown(0, 0);
    resourceChart();
}

function getResourceDetailsForGrid(ParentId, year, month) {
    //var Id = 0; var Year = 2016; var Month = 4;
    //var Params = "";
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    var Args = { "ParentId": ParentId, "Year": year, "Month": month, "UserId": person.UserName };
    //Args=Json.stringify(Params);
    var jsonDataResponse = "";


    var url_api = "api/resource/GetResourceDetailsForModal";
    $.ajax({
        url: url_api,
        type: "POST",
        data: Args,
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

function getresourceproject(statusFlag, id) {
    //if (statusFlag == 'N')
    //{
    //var ID = parseInt(id);
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var url_api = "api/resource?id=" + id + "&userid=" + person.UserName;
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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
    //}
};

//addNEW
function addResourceData() {
    program = 0;
    var table = document.getElementById('tblResourceDataControl').getElementsByTagName('tbody')[0];
    //  var row = table.insertRow(table.rows.length);
    //var row = table.insertRow(0);
    var rows = $('#tblResourceDataControl tbody >tr');
    var Ftd = $(rows[0]).find('td').first();
    var StrtIndx;
    if (parseInt($(Ftd).html()) == 0) { StrtIndx = 0; }
    else {
        StrtIndx = parseInt($(Ftd).html()) - 1;
    }

    var endIndx = StrtIndx + table.rows.length;

    var row1 = endIndx;
    var RID = "RID" + row1;

    var rowID = "ResourceRow" + row1;

    var row = table.insertRow(table.rows.length);
    row.id = rowID;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    //var cell10 = row.insertCell(9);

    var rcID = "ID" + row1;

    //cell1.innerHTML = "<border:0px;outline:0px;'>";
    cell1.innerHTML = "<div id=" + rcID + " style='padding:0px;width:0px;'></div>";
    cell2.innerHTML = createResourceProgramDropDown(row1, 'random', 1);
    cell3.innerHTML = createResourceProjectDropDown(null, row1, 0, program, "");
    cell4.innerHTML = resourceDropDown(RID, getResourceDetails(), 0)//"<input  type='text' size='12' data-type='AlphaNumeric' onblur='return validate(this)' id='resourcename" + row1 + "' style=' border:0px;outline:0px;'>";

    cell5.innerHTML = CreateTypeDropDown("type", row1);
    cell6.innerHTML = CreateLocationDropDown("location", row1);
    cell7.innerHTML = "<input  type='text' size='12' data-type='Number' onblur='return validate(this)' id='PlannedHours" + row1 + "' style=' border:0px;outline:0px;'>";
    cell8.innerHTML = "<input  type='text' size='12' data-type='Number' onblur='return validate(this)' id='UtilizedHours" + row1 + "' style=' border:0px;outline:0px;'>";
    cell9.innerHTML = "<button type='button' class='btn btn-primary' onclick='cancelNewRow(" + rowID + ")'>Cancel</button>"

    $('#InsertRowButtonForResource').prop("disabled", "true");

};

//fxn to CANCEl
function cancelNewRow(rowID) {

    $(rowID).remove();
    document.getElementById('InsertRowButtonForResource').disabled = false;



}

//delete new ---


function getTrueFalseDeleteResource(Id) {
    bootbox.confirm("Are You Sure To Delete ?", function (e) {
        if (e == true) {
            DeleteResource(Id);
        }
    });

}

function DeleteResource(Id) {
  
   
        var Resource = {
            ID: Id

        };

        var stringData = JSON.stringify(Resource);

        var urlString = "api/Resource/DeleteResource/";


        $.ajax({
            url: urlString,
            type: "DELETE",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //Code to re update the time line on delete click
                angular.element(document.getElementById('editResource')).scope().editResourceData();
                var data = document.getElementById('hdSetpageindex').value.split(',');
                angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });

        //var data = document.getElementById('hdSetpageindex').value.split(',');
        //angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
        //document.getElementById('divEditResource').style.display = "none";

        var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
        if (drillDown == 0) {
            changeResourceToProjectLevel('Y', programOrProject[2]);
        }
        else {
            changeResourceToProjectLevel('N', editDillDownProgramName);
        }

    
   



};

//update
function updateResourceGridData() {
    var yearId = "year0";
    var year = (document.getElementById(yearId).value).trim();

    var monthId = "month0";
    month = (document.getElementById(monthId).value).trim();
    //var input = confirm(" Are You Sure You Want To Save ?");
    // if (input == true) {
    var jsonData = "";
    var rows = $('#tblResourceDataControl tbody >tr');
    var columns;
    var temp = null;
    var id = null;
    var program, project, resource, plannedhours, utilizedhours, rowid, resourceType, resourceLocation;

    var Ftd = $(rows[0]).find('td').first();
    var StrtIndx;
    StrtIndx = parseInt($(Ftd).html()) - 1;
    var endIndx = parseInt(StrtIndx + rows.length);
    var flag = 0;
    //for (var i = 0; i < rows.length; i++) {
    //    columns = $(rows[i]).find('td');
    //    if (columns.length >= 4) {
    $.each(rows, function (indx, item) {
        flag = 0;
        columns = $(this).find('td');
        if (columns.length >= 4) {
            i = (StrtIndx + indx);
            id = "program" + i;
            if (document.getElementById(id).tagName == "DIV") {
                program = (document.getElementById(id).innerHTML).trim();
            }
            else {
                program = (document.getElementById(id).value).trim();
            }

            id = "project" + i;
            if (document.getElementById(id).tagName == "DIV") {
                project = (document.getElementById(id).innerHTML).trim();
            }
            else {
                project = (document.getElementById(id).value).trim();
            }

            id = "resourceType" + i;
            //if (document.getElementById(id).tagName == "SELECT") {
            //    //resourceType = (document.getElementById(id).childNodes[0].childNodes[0].textContent).trim();
            //    resourceType = (document.getElementById(id).).trim();
            //}
            //else {
            resourceType = (document.getElementById(id).value).trim();
            //}

            id = "resourceLocation" + i;
            //if (document.getElementById(id).tagName == "SELECT") {
            //    resourceLocation = (document.getElementById(id).childNodes[0].childNodes[0].textContent).trim();
            //}
            //else {
            resourceLocation = (document.getElementById(id).value).trim();
            // }


            id = "PlannedHours" + i;
            plannedhours = (document.getElementById(id).value).trim();

            id = "UtilizedHours" + i;
            utilizedhours = (document.getElementById(id).value).trim();

            id = "ID" + i;
            rowid = (document.getElementById(id).innerHTML).trim();

            id = "RID" + i;
            if (document.getElementById(id).tagName == "DIV") {
                resource = (document.getElementById(id).innerHTML).trim();
            }
            else {
                resource = (document.getElementById(id).value).trim();
            }
            if (rows.length > 1) {
                for (var k = StrtIndx; k < i; k++) {

                    var programData, projectData, ResourceData;
                    id = "program" + k;
                    if (document.getElementById(id).tagName == "DIV") {
                        programData = (document.getElementById(id).innerHTML).trim();
                    }
                    else {
                        programData = (document.getElementById(id).value).trim();
                    }

                    id = "project" + k;
                    if (document.getElementById(id).tagName == "DIV") {
                        projectData = (document.getElementById(id).innerHTML).trim();
                    }
                    else {
                        projectData = (document.getElementById(id).value).trim();
                    }
                    id = "RID" + k;
                    if (document.getElementById(id).tagName == "DIV") {
                        ResourceData = (document.getElementById(id).innerHTML).trim();
                    }
                    else {
                        ResourceData = (document.getElementById(id).value).trim();
                    }
                    if (programData == program && projectData == project && ResourceData == resource) {
                        flag = 1;
                    }
                }
            }

            if (flag == 0) {
                if (rowid == "" || rowid == 'undefined')
                    rowid = "0";

                var Resource_Master = {

                    ID: rowid,
                    ProgramID: program,
                    ProjectID: project,
                    Year: year,
                    Month: month,
                    ResourceType: resourceType,
                    ResourceLocation: resourceLocation,
                    PlannedHours: plannedhours,
                    UtilizedHours: utilizedhours,
                    ResourceID: resource
                };

                if (program != 0 && project != 0) {
                    var stringData = JSON.stringify(Resource_Master);
                    var urlString = "api/resource/";
                    $.ajax({
                        url: urlString,
                        type: "PUT",
                        data: stringData,
                        async: false,
                        dataType: 'json',
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {
                            //Code to reload again.
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            //$("#txtResult").val(err.Message)
                        }

                    });
                }
            }
            else {
                alert("Duplicate value for Program, Project and Resource is not allowed!");
            }
            jsonData = "";
        }
    });
    document.getElementById('InsertRowButtonForResource').disabled = false;
    angular.element(document.getElementById('tblResourceDataControl')).scope().editResourceData();

    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (drillDown == 0) {
        changeResourceToProjectLevel('Y', programOrProject[2]);

    }
    else {
        changeResourceToProjectLevel('N', editDillDownProgramName);
        //getResourceBarDataProject(editDillDownProgramName);
    }
    //resourceChart();
    //document.getElementById('divEditResource').style.display = "none";
    //window.confirm("Successfully Saved!");

    //} else { }//Cancel
    //validate cancel
    document.getElementById('divEditResource').style.display = "none";


};

//ADDS NEW TABLE FUNCTIONS-- DROPDOWN
function createResourceProgramDropDown(i, isSelected, newOrExisting) {
    var jsonData = getProgramData();
    var newJsonData = [];

    var conditionId, conditionProgramName;
    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (programOrProject[3] == 'Y') {
        condition = resourceDrillToProjectLevel; conditionProgramName = drillDownProgramName;

    }
    else { condition = drillDown; conditionProgramName = editDillDownProgramName; }

    var PermissionList = EditPermissionListForLoginUser;

    if (condition == 1) {
        $.each(jsonData, function (i, item) {
            $.each(PermissionList, function (j, it) {

                if (it.PID == item.Program_Id && it.EditPermission == 'Y')

            if (item.Parent_Id == 0 && item.Program_Name.trim() == conditionProgramName.trim())
            { newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name }); }

            });
        });
    }
    else {
        $.each(jsonData, function (i, item) {
            $.each(PermissionList, function (j, it) {

                if (it.PID == item.Program_Id && it.EditPermission == 'Y' && item.Parent_Id == 0)
       
            { newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name }); }

            });
        });
    }
    //var data;
    if (newOrExisting == 0) { var data = ""; }
    else {
        var data = "<option selected='' disabled='' value=''> Please select </option>";
    }
    $.each(newJsonData, function (i, item) {
        if (item.Program_Name.trim() == isSelected.trim()) {
            data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
        }
    });
    $.each(newJsonData, function (i, item) {
        if (item.Program_Name.trim() != isSelected.trim()) {
            data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
            if (program == 0) {
                program = item.Program_Id;
            }
        }
    });
    var id = "program" + i;
    var drpDownProgram = "<select data-ctl='" + "project" + i + "' id='" + id + "'onchange='createResourceProjectDropDown(this," + i + ");' class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + data
    "</select>"
    // createProjectDropDown(Id);
    return drpDownProgram;
}
//PROJECTDROPDOWN

function createResourceProjectDropDown(ctl, rowid, flag, programID, projectName) {

    var data = "";
    var selProject = "";
    var newJsonData = [];
    var PermissionList = EditPermissionListForLoginUser;

    //s
    if ((projectName == '' && ctl == null)) {
        selProject += "<option selected='' disabled='' value=''>Please select</option>";
    }
    else {

        //ss
        // alert("clt = " + ctl);

        if (ctl == 'undefined' || ctl == null) {

            var pID = "program" + rowid;

            var jsonData = getProjectData(programID);
            //selProject += "<option value='0'> Please select </option>";
            data = "<option selected='' disabled='' value=''> Please select </option>";
            $.each(jsonData, function (i, item) {
                $.each(PermissionList, function (j, it) {
                    if (it.PID == item.Program_Id && it.EditPermission == 'Y' && item.Parent_Id == programID) {
                    //alert("Added Datat");
                    newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name });
                    }
                });
            });
            $.each(newJsonData, function (i, item) {
              

                    if ( item.Parent_Id == programID && item.Program_Name == projectName)

                        //   data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";

                        selProject += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                    //alert("looping");
               
            });

            $.each(newJsonData, function (i, item) {
               
                    //   data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                    if (item.Parent_Id == programID && item.Program_Name != projectName) {
                        selProject += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                        //alert("looping");
                    }
              
            });
        }
        else {

            // alert("CTL = " + $(ctl).val());

            var newCtlId = $(ctl).attr('data-ctl');
            //var selProject = "<option value='0'> Please select </option>";

            var selProject = $("#" + newCtlId);


            $(selProject).empty();
            //alert("Removed");
            var SelectedProgram = $(ctl).val();
            //alert("value "+SelectedProgram);
            if (SelectedProgram == "0") { selProject.append("<option selected='' disabled='' value=''> Please select </option>"); }
            else {
                var jsonData = getProjectData(SelectedProgram);

                //alert("Project Combo = " + selProject);
                newJsonData = [];
                $.each(jsonData, function (i, item) {
                    $.each(PermissionList, function (j, it) {
                        if (item.Parent_Id == SelectedProgram && it.PID == item.Program_Id && it.EditPermission == 'Y') {
                            //alert("Added Datat");
                            newJsonData.push({ "Program_Id": item.Program_Id, "Parent_Id": item.Parent_Id, "Program_Name": item.Program_Name });
                        }
                    });
                });
                // if (flag == 1) {
                $.each(newJsonData, function (i, item) {

                    //   data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
                    if (item.Parent_Id == SelectedProgram) {
                        selProject.append("<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>");
                        //alert("looping");
                    }
                });
            }

            //$.each(newJsonData, function (i, item) {

            //    //   data += "<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>";
            //    if (item.Parent_Id == SelectedProgram) {
            //        selProject.append("<option value=" + item.Program_Id + ">" + item.Program_Name + "</option>");
            //        //alert("looping");
            //    }
            //});
            // }

        }

        //ee
    }

    //e


    var id = "project" + rowid;
    var drpDownProgram = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px; width:150px;'>" + selProject + "</select>";
    return drpDownProgram;
}


function getProjectData(id) {
    var ID = id;
    var PID = (document.getElementById("programid").value).trim();
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var url_api = "api/program/GetProgramByUserId?ProgramId=" + id + "&LoginId=" + person.UserName;
    var jsonDataResponse = "";
    $.ajax({
        url: url_api,
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
            //connectionError("api/program/GetAllProgram/" + id);
        }
    });

    return jsonDataResponse;

}

function connectionError(ProblemURL) {
    // alert('You Got Some Problem!!' + ProblemURL);

}


////function For Validation
//function validate() {
//    var row;
//    var regxCharSpaces = /^[a-zA-Z ]*$/;
//    var regxCharSpecial = /^[ A-Za-z,]*$/;
//    var regxNumbers = /^[0-9]*$/;
//    var rows = $('#tblResourceDataControl tbody >tr');
//    for (var i = 0; i < rows.length; i++) {
//        name = (document.getElementById('Name' + i).value).trim();
//        desig = (document.getElementById('Designation' + i).value).trim();
//        skl = (document.getElementById('Skills' + i).value).trim();
//        hrs = (document.getElementById('UsedHours' + i).value).trim();
//        row = i + 1;
//        //if (name == "" || regxCharSpaces.test(name) == false) {
//        //    alert("Name in row " + row + " is Invalid !");
//        //    return false;
//        //}
//        //if (desig == "" || regxCharSpaces.test(desig) == false) {
//        //    alert("Designation in row " + row + " is Invalid !");
//        //    return false;
//        //}
//        //if (skl == "" || regxCharSpecial.test(skl) == false) {
//        //    alert("Skills in row " + row + " is Invalid !");
//        //    return false;
//        //}
//        //if (hrs == "" || regxNumbers.test(hrs) == false) {
//        //    alert("UsedHours in row " + row + " is Invalid !");
//        //    return false;
//        //}
//        //1-NAme
//        if (name != "") {
//            if (regxCharSpaces.test(name) == true) {

//            } else {
//                alert("Name in row " + row + " is Invalid!");
//                return false;

//            }
//        } else {
//            alert("Name in row " + row + " is Empty !");
//            return false;
//        }

//        // //3-SKILLS
//        if (skl != "") {
//            if (regxCharSpaces.test(skl) == true) {

//            } else {
//                alert("Skill in row " + row + " is Invalid!");
//                return false;

//            }
//        } else {
//            alert("Skills in row " + row + " is Empty !");
//            return false;
//        }
//        //4 Used Hours
//        if (hrs != "") {
//            if (regxNumbers.test(hrs) == true) {

//            } else {
//                alert("Used Hours in row " + row + " is Invalid!");
//                return false;

//            }
//        } else {
//            alert("Used Hours in row " + row + " is Empty !");
//            return false;
//        }

//        //
//    }
//    return true;

//}


//Designation DropDown 
function createDropDownDesignation(id, isSelected) {
    var ID = id;
    var getDesignationDataForResource = getallresources();

    var allDesignation = [];
    var distinctDesignation = [];

    //Designations
    for (var i in getDesignationDataForResource) {
        allDesignation.push(getDesignationDataForResource[i].Designation);
    }
    distinctDesignation = allDesignation.filter(function (item, i, allDesignation) {
        return i == allDesignation.indexOf(item);
    });


    var data = "";
    $.each(distinctDesignation, function (i, item) {
        if (item.trim() == isSelected.trim()) {
            data += "<option value=" + item + ">" + item + "</option>";
        }
    });
    $.each(distinctDesignation, function (i, item) {
        if (item.trim() != isSelected.trim()) {
            data += "<option value=" + item + ">" + item + "</option>";
        }
    });

    var dID = "Designation" + ID;
    var drpDownDesignation = "<select id=" + dID + " class='selectpicker' data-style='btn-primary' data-width='auto' style=' border:0px;outline:0px;'>" + data + "</select>";
    return drpDownDesignation;
}

function yearDropdown(value, rowid) {
    var id = "year" + rowid;
    var d = new Date();
    var selectedYear = document.getElementById('yearforgrid0').value;//d.getFullYear();

    var yID = "";
    for (var i = 2000; i <= 2020; i++) {
        if (selectedYear == i) {
            yID += "<option>" + i + "</option>";
        }
    }
    for (var i = 2000; i <= 2020; i++) {
        if (selectedYear != i) {
            yID += "<option>" + i + "</option>";
        }
    }
    var year = "<select id=" + id + " class='selectpicker' data-style='btn-primary'  onchange='bindResourceModelGrid()' data-width='auto' style=' border:0px;outline:0px;'>" + yID + "</select>";
    return year;
}

function yearDropdownForGrid(value, rowid) {
    var id = "yearforgrid" + rowid;
    var d = new Date();
    var currentYear = d.getFullYear();

    var yID = "";
    for (var i = 2000; i <= 2020; i++) {
        if (currentYear == i) {
            yID += "<option>" + i + "</option>";
        }
    }
    for (var i = 2000; i <= 2020; i++) {
        if (currentYear != i) {
            yID += "<option>" + i + "</option>";
        }
    }
    var year = "<select id=" + id + " class='selectpicker' data-style='btn-primary'  onchange='BindDataToResourceGrid(0)' data-width='auto' style=' border:0px;outline:0px;color:black;border-radius:3px;'>" + yID + "</select>";
    return year;
}

function monthDropdown(value, rowid) {
    var d = new Date();
    var currentMonth = document.getElementById('monthforgrid0').value;//d.getMonth() + 1;
    var mID;
    var id = "month" + rowid;
    var mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 1; i <= 12; i++) {
        if (currentMonth == i) {
            mID += "<option value=" + i + ">" + mth[i - 1] + "</option>";
        }
    }
    for (var i = 1; i <= 12; i++) {
        if (currentMonth != i) {
            mID += "<option value=" + i + ">" + mth[i - 1] + "</option>";
        }
    }
    var month = "<select id=" + id + " class='selectpicker' data-style='btn-primary' onchange='bindResourceModelGrid()' data-width='auto' style=' border:0px;outline:0px;'>" + mID + "</select>";
    return month;
}

function monthDropdownForGrid(value, rowid) {
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var mID;
    var id = "monthforgrid" + rowid;
    var mth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 1; i <= 12; i++) {
        if (currentMonth == i) {
            mID += "<option value=" + i + ">" + mth[i - 1] + "</option>";
        }
    }
    for (var i = 1; i <= 12; i++) {
        if (currentMonth != i) {
            mID += "<option value=" + i + ">" + mth[i - 1] + "</option>";
        }
    }
    var month = "<select id=" + id + " class='selectpicker' data-style='btn-primary' onchange='BindDataToResourceGrid(0)' data-width='auto' style=' border:0px;outline:0px;color:black;border-radius:3px;'>" + mID + "</select>";
    return month;
}

function getResourceDetails() {
    var person = JSON.parse(localStorage.getItem('LoginUser'));
    var jsonDataResponse = "";
    $.ajax({
        url: "api/GetResourceDetails?userid=" + person.UserName,
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

function resourceDropDown(id, dataFunction, item) {
    var data = dataFunction;
    var value = "<option selected='' disabled='' value=''>Please Select</option>";
    for (var i = 0; i < data.length; i++) {
        if (data[i].ResourceID == item) {
            value += "<option value=" + data[i].ResourceID + ">" + data[i].Name + "</option>";
        }
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].ResourceID != item) {
            value += "<option value=" + data[i].ResourceID + ">" + data[i].Name + "</option>";
        }
    }
    var drpDown = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;width:100px;'>" + value + "</select>";
    return drpDown;
}

function bindResourceModelGrid() {
    angular.element(document.getElementById('tblResourceDataControl')).scope().editResourceData();

}

function CreateTypeDropDown(type, i) {
    var id = "resourceType" + i;
    var typeoptions;
    if (type == "type") { typeoptions += "<option selected='' disabled='' value=''>Please Select</option>" }
    if (type == "FTE") {
        typeoptions += "<option value='FTE'>FTE</option><option value='Contractor'>Contractor</option>";
    }
        //else if (type == "Contractor") {
    else {
        typeoptions += "<option value='Contractor'>Contractor</option><option value='FTE'>FTE</option>";
    }
    var TypeDropDown = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;color:black;border-radius:3px;'>" + typeoptions + "</select>";
    return TypeDropDown;
}

function CreateLocationDropDown(location, i) {
    var id = "resourceLocation" + i;
    var locationoptions;
    if (location == "location") { locationoptions += "<option selected='' disabled='' value=''>Please Select</option>" }
    if (location == "OffShore") {
        locationoptions += "<option value='OffShore'>OffShore</option><option value='Onsite'>Onsite</option>";
    }
        // else if (location == "Onsite") {
    else {
        locationoptions += "<option value='Onsite'>Onsite</option><option value='OffShore'>OffShore</option>";
    }
    var LocationDropDown = "<select id=" + id + " class='selectpicker' data-style='btn-primary' data-width='30' style=' border:0px;outline:0px;color:black;border-radius:3px;'>" + locationoptions + "</select>";
    return LocationDropDown;
}

function getResourceType() {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/GetResourceProjectDetails",
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
//Get Designation 
function getDesignationDetails() {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Designation/",
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
//Get Skills 
function getSkillDetails() {
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Skill/",
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












