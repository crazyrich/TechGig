
var PermissionList = EditPermissionListForLoginUser;
var getDataForResource = getallresources();

//var TempDataForResource=getallresources();

//var getDataForResource = [];
//$.each(TempDataForResource, function (i, item)
//{
//    $.each(PermissionList,function(i,it){
//        if (item.ProjectID == it.PID) { getDataForResource.push(item);}
//    });
//});



var allProjectId = [];
var distinctProjectID = [];
var allProgramID = [];
var distinctProgramID = [];
var allDesignation = [];
var distinctDesignation = [];
var resourceDrillToProjectLevel=0;
var drillDownProgramName = "";
var drillDownProgramID = 0;







function resourceChart() {
    allProjectId = [];
    distinctProjectID = [];
    allProgramID = [];
    distinctProgramID = [];
    allDesignation = [];
    distinctDesignation = [];
    //get distinct program name available
    for (var i in getDataForResource) {
        allProgramID.push(getDataForResource[i].ProgramName);
    }
    distinctProgramID = allProgramID.filter(function (item, i, allProgramID) {
        return i == allProgramID.indexOf(item);
    });

    //get distinct project name available
    for (var i in getDataForResource) {
        allProjectId.push(getDataForResource[i].ProjectName);
    }
    distinctProjectID = allProjectId.filter(function (item, i, allProjectId) {
        return i == allProjectId.indexOf(item);
    });

    //get distinct designation available
    allDesignation = getDesignationDetails();
    $.each(allDesignation, function (i, item) {
        distinctDesignation.push(item.DesignationName);
    });
    getResourceUtilizationChart();
    getResourceRoleChart();
    getResourceTypeChart(); 
   getResourceLocationChart(); 
}

function getResourceRoleChart()
{
    var programId = 0;
    var count = 0;
    var value = [];
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    if (hdnFieldValueForProject[3] == 'Y' && resourceDrillToProjectLevel == 0) {
        for (var j = 0; j < distinctDesignation.length; j++) {

        for (var i = 0; i < distinctProgramID.length; i++) {

                count = 0;
                for (var k = 0; k < getDataForResource.length; k++) {
                    if (getDataForResource[k].Designation == distinctDesignation[j] && getDataForResource[k].ProgramName.trim() == distinctProgramID[i].trim() && getDataForResource[k].Year == document.getElementById('yearforgrid0').value && getDataForResource[k].Month == document.getElementById('monthforgrid0').value) {
                        count++;
                        flag1 = true;
                        programId = getDataForResource[k].ProgramID;
                    }
                }

                value.push({ y: count, label: distinctProgramID[i], designation: distinctDesignation[j], programid: programId });
                programId = 0;
            }
        }
        bindResourceRoleChart(value,0);
    }
    else {
        if (resourceDrillToProjectLevel == 1) {
            programName = drillDownProgramName;
        }
        else {
            programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
        }
        value = [];
        for (var j = 0; j < distinctDesignation.length; j++) {

            for (var i = 0; i < distinctProjectID.length; i++) {

                count = 0;
                for (var k = 0; k < getDataForResource.length; k++) {
                    if (getDataForResource[k].Designation == distinctDesignation[j] && programName == getDataForResource[k].ProgramName.trim() && distinctProjectID[i].trim() == getDataForResource[k].ProjectName.trim() && getDataForResource[k].Year == document.getElementById('yearforgrid0').value && getDataForResource[k].Month == document.getElementById('monthforgrid0').value) {
                        count++;
                        flag1 = true;
                        programId = getDataForResource[k].ProgramID;
                    }
                }

                value.push({ y: count, label: distinctProjectID[i], designation: distinctDesignation[j], programid: programId });
                programId = 0;
            }
        }
        bindResourceRoleChart(value,1);
    }
}

function getResourceUtilizationChart() {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    var programid = 0;

    var data = [];

    var totalPlannedHours = 0;

    var totalUtilizedHours = 0;

    var projectName, prgid;


    if (hdnFieldValueForProject[3] == 'Y' && resourceDrillToProjectLevel == 0) {

        var flag = 0;

        for (var i = 0; i < distinctProgramID.length; i++) {

            for (var j = 0; j < getDataForResource.length; j++) {

                if (getDataForResource[j].ProgramName.trim() == distinctProgramID[i].trim() && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {

                    totalPlannedHours = totalPlannedHours + parseInt(getDataForResource[j].PlannedHours);

                    totalUtilizedHours = totalUtilizedHours + parseInt(getDataForResource[j].UtilizedHours);

                    projectName = getDataForResource[j].ProjectName.trim();
                    prgid = getDataForResource[j].ProgramID;

                    flag = 1;

                }
            }
            if (flag == 1) {
                data.push({ plannedhours: totalPlannedHours, utilizedhours: totalUtilizedHours, label: distinctProgramID[i].trim(), projectName: projectName, programid: prgid });
                totalPlannedHours = 0;
                totalUtilizedHours = 0;
                flag = 0;
            }
        }
        bindResourceUtilzationChart(data, 0, getDataForResource, distinctProjectID);
    }
        //for project level/drill down level
    else {
        totalPlannedHours = 0;
        totalUtilizedHours = 0;
        data = [];
        if (resourceDrillToProjectLevel == 1) {
            programName = drillDownProgramName;
        }
        else {
            programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
        }

        var flag = 0;
        for (var i = 0; i < distinctProjectID.length; i++) {

            for (var j = 0; j < getDataForResource.length; j++) {
                if (programName == getDataForResource[j].ProgramName.trim() && distinctProjectID[i].trim() == getDataForResource[j].ProjectName.trim() && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {

                    totalPlannedHours = totalPlannedHours + parseInt(getDataForResource[j].PlannedHours);

                    totalUtilizedHours = totalUtilizedHours + parseInt(getDataForResource[j].UtilizedHours);
                    flag = 1;
                    programid = getDataForResource[j].ProgramID;
                }

            }
            if (flag == 1) {
                data.push({ plannedhours: totalPlannedHours, utilizedhours: totalUtilizedHours, label: distinctProjectID[i].trim(), programid: programid });
                totalPlannedHours = 0;
                totalUtilizedHours = 0;
                flag = 0;
            }
        }
        bindResourceUtilzationChart(data, 1, 0, 0);
    }

}

function resourceUtilizationDataProjectLevel() {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    var totalPlannedHours = 0;
    var totalUtilizedHours = 0;
    var data = [];
    if (resourceDrillToProjectLevel == 1) {
        programName = drillDownProgramName;
    }
    else {
        programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
    }

    var flag = 0;
    for (var i = 0; i < distinctProjectID.length; i++) {

        for (var j = 0; j < getDataForResource.length; j++) {
            if (programName == getDataForResource[j].ProgramName.trim() && distinctProjectID[i].trim() == getDataForResource[j].ProjectName.trim() && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {

                totalPlannedHours = totalPlannedHours + parseInt(getDataForResource[j].PlannedHours);

                totalUtilizedHours = totalUtilizedHours + parseInt(getDataForResource[j].UtilizedHours);
                flag = 1;
                programid = getDataForResource[j].ProgramID;
            }

        }
        if (flag == 1) {
            data.push({ plannedhours: totalPlannedHours, utilizedhours: totalUtilizedHours, label: distinctProjectID[i].trim(), programid: programid });
            totalPlannedHours = 0;
            totalUtilizedHours = 0;
            flag = 0;
        }
    }
    return data;
}

function getResourceTypeChart()
{
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    var value = [];
    var count = 0;
    var allResourceType = [];
    var distinctResourceType = [];
    var programName="";
    var resourcetype = getResourcesType();
    for (var i in resourcetype) {
        allResourceType.push(resourcetype[i].ResourceType);
    }
    distinctResourceType = allResourceType.filter(function (item, i, allResourceType) {
        return i == allResourceType.indexOf(item);
    });
    if(resourceDrillToProjectLevel==1)
    {
        programName=drillDownProgramName;
    }
    else
    {
        programName=document.getElementById('idBrdScrProgName').innerHTML.trim();
    }

    if (hdnFieldValueForProject[3] == 'Y' && resourceDrillToProjectLevel==0) {
            var flag = 0;
            // for getting data of resource type at program level
            for (var i = 0; i < distinctDesignation.length; i++) {

                for (var k = 0; k < distinctResourceType.length; k++) {
                    count = 0;
                    for (var j = 0; j < getDataForResource.length; j++) {
                        if (distinctDesignation[i].trim() == getDataForResource[j].Designation.trim() && distinctResourceType[k].trim() == getDataForResource[j].ResourceType.trim() && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {
                            count++;
                            flag = 1;
                        }

                    }
                    if (flag == 1) {
                        value.push({ resourceType: distinctResourceType[k].trim(), totalCount: count, label: distinctDesignation[i] });
                        flag = 0;
                    }
                }
            }
        }
        else {
            // for getting data of resource type at project/drilldown level
            for (var i = 0; i < distinctDesignation.length; i++) {

                for (var k = 0; k < distinctResourceType.length; k++) {
                    count = 0;
                    for (var j = 0; j < getDataForResource.length; j++) {
                        if (distinctDesignation[i].trim() == getDataForResource[j].Designation.trim() && distinctResourceType[k].trim() == getDataForResource[j].ResourceType.trim() && getDataForResource[j].ProgramName.trim() == programName && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {
                            count++;
                        }
                    }
                    value.push({ resourceType: distinctResourceType[k].trim(), totalCount: count, label: distinctDesignation[i] });
                }
            }
        }

    //getResourceDetailsChart(value, distinctDesignation, distinctResourceType);
    bindResourceTypeChart(value, distinctDesignation, distinctResourceType);

}

function getResourceLocationChart()
{
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');
    var value = [];
    var count = 0;
    var allResourceLocation = [];
    var distinctLocation = [];
    var programName = 'n';
    var resourceLocation = getResourcesLocation();
    for (var i in resourceLocation) {
        allResourceLocation.push(resourceLocation[i].ResourceLocation);
    }
    distinctLocation = allResourceLocation.filter(function (item, i, allResourceLocation) {
        return i == allResourceLocation.indexOf(item);
    });

    if (resourceDrillToProjectLevel == 1) {
        programName = drillDownProgramName;
    }
    else {
        programName = document.getElementById('idBrdScrProgName').innerHTML.trim();
    }
    // for getting data of resource location at program level
    if (hdnFieldValueForProject[3] == 'Y' && resourceDrillToProjectLevel == 0) {
        for (var i = 0; i < distinctDesignation.length; i++) {

            for (var k = 0; k < distinctLocation.length; k++) {
                count = 0;
                for (var j = 0; j < getDataForResource.length; j++) {
                    if (distinctDesignation[i].trim() == getDataForResource[j].Designation.trim() && distinctLocation[k].trim() == getDataForResource[j].ResourceLocation.trim() && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {
                        count++;
                    }
                }
                value.push({ resourceLocation: distinctLocation[k].trim(), totalCount: count, label: distinctDesignation[i] });
            }


        }
    }
    else {
        // for getting data of resource location at project/drilldown level
        for (var i = 0; i < distinctDesignation.length; i++) {

            for (var k = 0; k < distinctLocation.length; k++) {
                count = 0;
                for (var j = 0; j < getDataForResource.length; j++) {
                    if (distinctDesignation[i].trim() == getDataForResource[j].Designation.trim() && distinctLocation[k].trim() == getDataForResource[j].ResourceLocation.trim() && getDataForResource[j].ProgramName.trim() == programName && getDataForResource[j].Year == document.getElementById('yearforgrid0').value && getDataForResource[j].Month == document.getElementById('monthforgrid0').value) {
                        count++;
                    }
                }
                value.push({ resourceLocation: distinctLocation[k].trim(), totalCount: count, label: distinctDesignation[i] });
            }


        }
    }
    //getResourceLocationChart(value, distinctDesignation, distinctResourceLocation);
    bindResourceLocationChart(value, distinctDesignation, distinctLocation);

}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key].trim();
        var y = b[key].trim();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function SetBreadCrumbForResource(PName) {
    var hdnFieldValueForProject = (document.getElementById('hdSetpageindex').value).split(',');

    if (PName != null) {
        if (hdnFieldValueForProject[3] == 'Y') {
            document.getElementById('A1').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program";
        }
        else if (hdnFieldValueForProject[3] == 'N') {
            document.getElementById('A1').innerHTML = "<span class='glyphicon glyphicon-menu-right' aria-hidden='true' style='color:white;'></span>" + PName + " Program";
        }
    }

}

function RestoreResourceChart() {
  
        document.getElementById('PortfolioBreadcrumbForResource').onclick = "";
        document.getElementById('PortfolioBreadcrumbForResource').style.cursor = "default";
        document.getElementById("editResource").style.visibility = "visible";
        var person = JSON.parse(localStorage.getItem('LoginUser'));
        if (person.RoleName == "Project Manager")
        { document.getElementById("editResource").style.display = "none"; }

    resourceDrillToProjectLevel = 0;
    drillDownProgramName = "";
    drillDownProgramID = 0;

    moveBackChartResource = 'Yes';
    clickBarChartDesignation = 'N';
    document.getElementById('A1').innerHTML = "";
    $("#hdGlobalID").val(0);
    var programOrProject = (document.getElementById('hdSetpageindex').value).split(',');

    changeResourceToProjectLevel('Y', programOrProject[2]);
    resourceChart();


}
