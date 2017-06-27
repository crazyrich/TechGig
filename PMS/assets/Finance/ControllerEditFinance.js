
//ControllerUpdateFinanceData


app.controller('testController', function ($scope) {
    $scope.editFinanceDataModal = function (id) {
        id = $("#hdGlobalID").val();
        editFinanceDataModal(id);
    }

   

});



//==============================================================================


app.controller('ControllerShowFinances', function ($scope) {

    $scope.$on('handleBroadcast', function (event, args) {

       
        $scope.Financedata = GetFinanceDataForTable($("#hdGlobalID").val());
    });
  

});


//function updateFinanceGridData() {
//    alert("hello");
//    var rows = $('#tblFinanceDataControl tbody >tr');
//    var arr = [];
//    $.each(rows, function (indx, currentRow) {
//        console.log("hee = " + currentRow);
//        var ProgramName = $(currentRow.innerHTML).find("#ProgramName" + indx + "").val();
//        var FinanceId = $(currentRow.innerHTML).find("#hidFinanceId_" + indx + "").val();//hidFinanceId_0
//        var AllocatedBudget = $(currentRow.innerHTML).find("#AllocatedBudget" + indx + "").val();
//        var UsedBudget = $(currentRow.innerHTML).find("#UsedBudget" + indx + "").val();
//        var RevisedBudget = $(currentRow.innerHTML).find("#RevisedBudget" + indx + "").val();
//        alert(" indx [" + indx + "] = " + FinanceId);
//        item = { "FinanceID": FinanceId, "AllocatedBudget": AllocatedBudget, "UsedBudget": UsedBudget, "RevisedBudget": RevisedBudget }
//        arr.push(item);
//    });

//    $.each(arr, function (indx, currentItem) {

//        alert("ProgramName " + currentItem.ProgramName);
//    })
//}


function DeleteFinance(Finance_Id) {

    var Finance_Master = {
        FinanceId: Finance_Id

    };

    var stringData = JSON.stringify(Finance_Master);

    var urlString = "api/finance/";


    $.ajax({
        url: urlString,
        type: "DELETE",
        data: stringData,
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function (result) {
            //Code to re update the time line on delete click
            //var data = document.getElementById('hdSetpageindex').value.split(',');
            //angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            //$("#txtResult").val(err.Message)
        }
    });

    //var data = document.getElementById('hdSetpageindex').value.split(',');
    //angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
    document.getElementById('divEditFinance').style.display = "none";

};


//function valueCheck(item) {
//    if (item === null || item === undefined)
//        return " ";
//    else
//        return item;
//}

function getFinanceData(ID) {

    var deferred = $.Deferred();

    if (typeof ID == 'undefined' || ID === null) {
        ID = 0;
       // alert("type casting values to zer0");
    }
    var person = JSON.parse(localStorage.getItem('LoginUser'));

    var jsonDataResponse = "";
    $.ajax({
        url: "api/Finance/GetAllFinance?ID=" + ID + "&UserName=" + person.UserName,
        type: "GET",
        async: false,
        //       data: {
        ////       ParentID: PID
        //       },
        success: function (data) {
            jsonDataResponse = data;
            deferred.resolve(jsonDataResponse);
        },
        error: function () {
            //connectionError();
            deferred.reject(null);
        }
    });

    return deferred.promise();

}

function GetFinanceDataForTable(id) {

    var deferred = $.Deferred();

    var financeDataForTable = "";
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (id == "")
        id = 0;

    var jsonDataResponse;

    if (hdnFieldValueForProject[3] == 'N') {

         financeDataForTable = "<table class='table'>" +
                           "<thead>" +
                               "<tr>" +
                                  "<th id='PNameForGrid'>Project Name</th>" +
                                   "<th>Planned Budget</th>" +
                                  "<th>Revised Budget</th>" +
                                  "<th>Actual Spent</th>" +
                               "</tr>" +
                            "</thead>" +
                           "<tbody>";

        var value = hdnFieldValueForProject[4];
 
        //  jsonDataResponse = getFinanceData(value);

        var FinPromise = getFinanceData(value);
        FinPromise.then(function (jsonDataResponse) {

            $.each(jsonDataResponse, function (indx, item) {
                //if (hdnFieldValueForProject[4] == item.ProgramID) {
                financeDataForTable += "<tr>" +
                         "<td>" + item.ProgramName + "</td>" +
                         "<td>" + item.AllocatedBudget + "</td>" +
                          "<td>" + item.RevisedBudget + "</td>" +
                         "<td>" + item.UsedBudget + "</td>" +
                     "</tr>";
                // }
            });

        }, function () {

          //  alert("Error in Finance >> GetFinanceDataForTable .. ControllerEditFinance.js ")
        })
        

    }
    else {
        
        var FinPromise = getFinanceData(id);

        FinPromise.then(function (jsonDataResponse) {

             financeDataForTable = "<table class='table'>" +
                         "<thead>" +
                             "<tr>" +
                                "<th id='PNameForGrid'>Program Name</th>" +
                                 "<th>Planned Budget</th>" +
                                 "<th>Revised Budget</th>" +
                                 "<th>Actual Spent</th>" +
                             "</tr>" +
                          "</thead>" +
                         "<tbody>";

            $.each(jsonDataResponse, function (indx, item) {
                financeDataForTable += "<tr>" +
                         "<td>" + item.ProgramName + "</td>" +
                         "<td>" + item.AllocatedBudget + "</td>" +
                          "<td>" + item.RevisedBudget + "</td>" +
                         "<td>" + item.UsedBudget + "</td>" +
                     "</tr>";
            });
        }, function () {

          //  alert("Getting else error")
        });
     //   jsonDataResponse = getFinanceData(id);
      
    }


    financeDataForTable += "</tbody>" +
                       "</table>"

    document.getElementById('DivFinanceDataForTable').innerHTML = "";
    document.getElementById('DivFinanceDataForTable').innerHTML = financeDataForTable;
    deferred.resolve(jsonDataResponse);
    return deferred.promise();
}

function updateFinanceGridData() {
    //var input = confirm(" Are You Sure You Want To Save ?");
    //if (input == true) {
        var jsonData = "";
        var rows = $('#tblFinanceDataControl tbody >tr');
        var columns;
        var temp = null;
        var financeId, prgId, projId, allocatedbudget, usedbudget, revisedbudget;
        var doUpdate = true;
        //  var table = $('#tblFinanceDataControl');
        //var pageNum = table.page();

        var Ftd = $(rows[0]).find('td').first();
        //  alert("td  = " + $(Ftd).html());

        var StrtIndx = parseInt($(Ftd).html()) - 1;
        //alert("StrtIndx=" + StrtIndx);
        var endIndx = parseInt(StrtIndx + rows.length);
        //alert("endIndx=" + endIndx);

        $.each(rows, function (indx, item) {

            //  columns = $(rows[i]).find('td');
            columns = $(this).find('td');
            if (columns.length >= 4) {

                i = (StrtIndx + indx);

                //var idAllocatedBudget = "AllocatedBudget" +i ;
                //allocatedbudget = (document.getElementById(idAllocatedBudget).value).trim();

                //alert(" allocatedbudget = " + allocatedbudget);
                //for (var i = StrtIndx; i < endIndx; i++) {
                //    columns = $(rows[i]).find('td');
                //    if (columns.length >= 4) {


                var idAllocatedBudget = "AllocatedBudget" + i;
                allocatedbudget = (document.getElementById(idAllocatedBudget).value).trim();

                var idUsedBudget = "UsedBudget" + i;
                usedbudget = (document.getElementById(idUsedBudget).value).trim();

                var idRevisedBudget = "RevisedBudget" + i;
                revisedbudget = (document.getElementById(idRevisedBudget).value).trim();

                var finance = "finance" + i;
                financeId = (document.getElementById(finance).innerHTML).trim();

                var program = "program" + i;
                if (document.getElementById(program).tagName == "DIV") {
                    prgId = (document.getElementById(program).innerHTML).trim();
                }
                else {
                    prgId = $('#' + program).val();
                    prgId = (document.getElementById(program).value).trim();
                }

                var project = "project" + i;

                if (document.getElementById(project).tagName == "DIV") {
                    projId = (document.getElementById(project).innerHTML).trim();
                }
                else {
                    projId = $('#' + project).val();
                    projId = (document.getElementById(project).value).trim();
                }

                // alert("Project ID = " + projId + " ProgrmId = " + prgId);



                if (financeId == "")
                    financeId = "0";
                var FinanceData_Master = {
                    FinanceId: financeId,
                    ProgramId: prgId,
                    ProjectId: projId,
                    AllocatedBudget: allocatedbudget,
                    UsedBudget: usedbudget,
                    RevisedBudget: revisedbudget


                };

                if (allocatedbudget != "" && usedbudget != "" && revisedbudget != "") {
                    var stringData = JSON.stringify(FinanceData_Master);
                    var urlString = "api/finance/PutKeyAccomplishments/";
                    $.ajax({
                        url: urlString,
                        type: "PUT",
                        data: stringData,
                        dataType: 'json',
                        contentType: "application/json;charset=utf-8",
                        success: function (result) {
                            //Code to reload the time line again.
                            //var data = document.getElementById('hdSetpageindex').value.split(',');
                            //angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);

                            //var gId = $("#hdGlobalID").val();
                            //GetFinanceDataForTable(gId);
                            //SetFinanceDataForHeader(gId);
                            //financeChart();
                            //editFinanceDataModal(gId);

                            //table.page(pageNum).draw(false);

                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            //$("#txtResult").val(err.Message)
                        }

                    });
                    jsonData = "";
                } else {
                    doUpdate = saveValidationFinance(allocatedbudget, usedbudget, revisedbudget, i);
                }
            }
        });
        if (doUpdate == true) {
            var gId = $("#hdGlobalID").val();
            GetFinanceDataForTable(gId);
            SetFinanceDataForHeader(gId);
            financeChart();
            editFinanceDataModal(gId);

            //var data = document.getElementById('hdSetpageindex').value.split(',');
            //angular.element(document.getElementById('mainnav')).scope().setPageNumber(data[0], data[1], data[2], data[3], data[4], data[5]);
            //document.getElementById('divEditFinance').style.display = "none";
            document.getElementById('InsertRowButtonForFinance').disabled = false;
        }
    //}
        document.getElementById('divEditFinance').style.display = "none";
}
    
   




function editFinanceDataModal(id) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    //  alert("hdnFieldValueForProject = " + hdnFieldValueForProject);
    var value; var ProgName;

    if (id == 0) {
        id = hdnFieldValueForProject[4];
        //alert("PArent ID = " + id);
    }
    else {
        value = hdnFieldValueForProject[2]; ProgName = hdnFieldValueForProject[1];
    }
   
    var Financedata = GetFinanceDetailsForModal(id);
    var PermissionList = EditPermissionListForLoginUser;
    var newJsonData = [];
    $.each(Financedata, function (i, item) {

        $.each(PermissionList,function(j,it){

            if(it.PID==item.ProjectID && it.EditPermission=='Y')
        
            newJsonData.push({ "FinanceID": item.FinanceID, "ProgramID": item.ProgramID, "ProgramName": item.ProgramName, "ProjectID": item.ProjectID, "ProjectName": item.ProjectName, "AllocatedBudget": item.AllocatedBudget, "UsedBudget": item.UsedBudget, "RevisedBudget": item.RevisedBudget });
        
        });
    })
    var tableID = 'tblFinanceDataControl';
    var dyntable = "<div><table id='tblFinanceDataControl' class='table table-bordered table-hover'><thead>" +
"<tr><th ></th><th style='padding: 0px;width:0px;'></th><th>Program Name</th><th>Project Name</th><th>Planned Budget</th><th>Revised Budget</th><th>Actual Spent</th><th style='padding:0px;width:0px;'></tr></thead><tbody>";

    /* if (hdnFieldValueForProject[3] == 'N') {
         $.each(newJsonData, function (i, item) {
             if (item.ParentID == id) {
                 var financeId = "finance" + i;
                 var prgId = "program" + i;
                 var prjId = "project" + i;
                 dyntable += "<tr><td><div id=" + financeId + " style='display:none;padding: 0px;width:0px;'> " + item.FinanceID + "</div> </td>" +
                              "<td><div id=" + prgId + " style='display:none;' > " + item.ProgramID + "</div><div> " + item.ProgramName + "</div></td>" +
                              "<td><div id=" + prjId + " style='display:none;' > " + item.ProjectID + "</div><div> " + item.ProjectName + "</div></td>" +
                              "<td><div style='display:none' > " + item.AllocatedBudget + "</div>" + createDateTextbox(valueCheck(item.AllocatedBudget), i, "AllocatedBudget") + "</td>" +
                              "<td><div style='display:none' > " + item.UsedBudget + "</div>" + createDateTextbox(valueCheck(item.UsedBudget), i, "UsedBudget") + "</td>" +
                              "<td><div style='display:none' > " + item.RevisedBudget + "</div>" + createDateTextbox(valueCheck(item.RevisedBudget), i, "RevisedBudget") + "</td>" +
                 "<td><button class='btn btn-sm btn-danger' disabled onclick='DeleteFinance(" + item.FinanceID + ")'><i class='fa fa-trash'></i> Delete</button></td></tr></tr>";
             }
         });
     }
     else { */
    $.each(newJsonData, function (i, item) {


        var financeId = "finance" + i;
        var prgId = "program" + i;
        var prjId = "project" + i;
        dyntable += "<tr id='FinanceRow" + i + "'>" +
                     "<td><div style='display:none' >&nbsp;</div></td><td style='padding: 0px;width:0px;'> <div id=" + financeId + " style='display:none' > " + item.FinanceID + "</div></td>" +
                     "<td><div id=" + prgId + " style='display:none;' > " + item.ProgramID + "</div><div> " + item.ProgramName + "</div></td>" +
                     "<td><div id=" + prjId + " style='display:none;' > " + item.ProjectID + "</div><div> " + item.ProjectName + "</div></td>" +
                     "<td><div style='display:none' > " + item.AllocatedBudget + "</div>" + createTextbox(valueCheck(item.AllocatedBudget), i, "AllocatedBudget", 'Number') + "</td>" +
                      "<td><div style='display:none' > " + item.RevisedBudget + "</div>" + createTextbox(valueCheck(item.RevisedBudget), i, "RevisedBudget", 'Number') + "</td>" +
                     "<td><div style='display:none' > " + item.UsedBudget + "</div>" + createTextbox(valueCheck(item.UsedBudget), i, "UsedBudget", 'Number') + "</td>" +
       // "<td><button class='btn btn-sm btn-danger' style='visibility:hidden' disabled onclick='DeleteFinance(" + item.FinanceID + ")'><i class='fa fa-trash'></i> Delete</button></td></tr>";
        "<td><a  href='javascript:void(0)' style='visibility:hidden' disabled  onclick='DeleteFinance(" + item.FinanceID + ")'><i class='glyphicon glyphicon-trash'> </i>  </a><a  href='javascript:void(0)' onclick='addFinanceData()'><i class='glyphicon glyphicon-plus'> </i>  </a></td></tr>";

    });
    // }

    dyntable += "</tbody></table>";
    dyntable += "<table><tr><td align='right' valign='top' style='width:900px;padding:4px;'>";
    dyntable += "<button onclick='cancelSaveFinance();' type='button' class='btn btn-secondary'>Cancel</button></td><td align='right' valign='top' style='padding:4px;'>";

    dyntable += "<button  style='display:none' type='button' id='InsertRowButtonForFinance' class='btn btn-primary' onclick='addFinanceData()'>Insert Row</button></td>"

    dyntable += "<td align='right' valign='top' style='padding:4px;'><button type='button' class='btn btn-primary' onclick='updateFinanceGridData();';>Save</button>";

    dyntable += "</td></tr></table></div>";
    document.getElementById('divEditMYGrid').innerHTML = "";
    document.getElementById('divEditMYGrid').innerHTML = dyntable;
    //alert(dyntable);

    //$('#tblFinanceDataControl').dataTable({

    //    "fnPreDrawCallback": function (oSettings) {
    //        if(confirm("Do You Want to save changes!"))
    //        {
    //            var idRevisedBudget = "RevisedBudget0";
    //            revisedbudget = (document.getElementById(idRevisedBudget).value).trim();
    //            alert('DataTables has redrawn the table' + revisedbudget);
    //        }

    //    }

    //} );
    if (Object.keys(newJsonData).length <= 0)
        $('#InsertRowButtonForFinance').css("display", "block");

    createResponsiveGrid(tableID);
    var table = $('#tblFinanceDataControl').DataTable();
    $('#tblFinanceDataControl').on('page.dt', function () {

        //var pagenum = table.page();
        //alert('page change started');
        //updateFinanceGridData();
        // alert('update done-- going to new page!');
        //table.page(pagenum).draw(false);
    });

}


//function createResponsiveGridFinance() {
//    var bugTable = $('#tblFinanceDataControl').DataTable({
//        "columnDefs": [{
//            "processing": true,
//            "searchable": false,
//            "orderable": false,
//            "targets": 0,
//        }],
//        fixedHeader: true,
//        responsive: true,
//        "order": [],

//    });

//    bugTable.on('order.dt search.dt', function () {
//        bugTable.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
//            cell.innerHTML = i + 1;
//        });
//    }).draw();
//}

function SetBreadCrumbForFinance(PName) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    if (PName != null) {
        if (hdnFieldValueForProject[3] == 'Y') {
            document.getElementById('ProgramBreadCrumbForFinance').innerHTML ="<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" +PName +" Program ";
        }
                else if (hdnFieldValueForProject[3] == 'N') {
                    document.getElementById('ProgramBreadCrumbForFinance').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program"
        }
    }

}

function GetFinanceDetailsForModal(ParentID) {
    var ID = ParentID;
    if (ID == 'undefined') {
        ID = 0;
    }
    var jsonDataResponse = "";
    $.ajax({
        url: "api/Finance/GetFinanceDetails/" + ID,
        type: "get",
        async: false,

        success: function (data) {
            jsonDataResponse = data;
        },
        error: function () {
            connectionError("api/Finance/GetFinanceDetails");
        }
    });
    return jsonDataResponse;
}

function SetFinanceDataForHeader(id) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    if (id == "")
        id = 0;
    var TotalAllocatedFinance = 0.00;
    var TotalUsedFinance = 0.00;
    var UtilizationOfFinance = 0.00;

    var jsonDataResponse;

    if (hdnFieldValueForProject[3] == 'N') {
        var value = hdnFieldValueForProject[4];
        financeData = getFinanceData(value);
        financeData.then(function (jsonDataResponse) {
            $.each(jsonDataResponse, function (indx, item) {
                TotalAllocatedFinance = TotalAllocatedFinance + item.AllocatedBudget;
                TotalUsedFinance = TotalUsedFinance + item.UsedBudget;
            });
        });

    }
    else {
        var financeData = getFinanceData(id);
        financeData.then(function (jsonDataResponse) {
            $.each(jsonDataResponse, function (indx, item) {

                TotalAllocatedFinance = TotalAllocatedFinance + item.AllocatedBudget;
                TotalUsedFinance = TotalUsedFinance + item.UsedBudget;

            });
        });
    }
    if (TotalAllocatedFinance > 0) {
        UtilizationOfFinance = ((TotalUsedFinance * 100) / TotalAllocatedFinance);
    }
    else { UtilizationOfFinance = 0; TotalUsedFinance = 0;}

    //alert("my Div = " + document.getElementById('TotalAllocatedFinanceForHeader'));
    var dvEle = document.getElementById('TotalAllocatedFinanceForHeader')

    if (dvEle != null) {
        document.getElementById('TotalAllocatedFinanceForHeader').innerHTML = "";
        document.getElementById('TotalAllocatedFinanceForHeader').innerHTML = '<span class="fFamily2" style="font-size:22px;">$' + TotalAllocatedFinance + '</span> <span class="fontSizeApply fFamily1">mn</span>';

        document.getElementById('TotalUtilizedFinanceForHeader').style.width = UtilizationOfFinance + "%";
        document.getElementById('UtilizationPercentage').innerHTML = UtilizationOfFinance.toPrecision(3) + "%";

    }

}
function cancelSaveFinance() {

    $('#divEditFinance').css("display", "none");

}