function onBlurTile() {
    var len = document.getElementById('myModal2').getElementsByClassName('modal-body-Tiles').length;

    myArray = [];

    for (var i = 0; i < len; i++) {
        //var string = document.getElementById('myModal2').getElementsByClassName('modal-body-Tiles')[0].innerHTML.toString().trim().replace('&nbsp;', '.');
        var stre = document.getElementById('myModal2').getElementsByClassName('modal-body-Tiles')[0].innerText.toString();
        stre = stre.replace('<div>', '');
        stre = stre.replace('</div>', '');
        stre = stre.replace('&nbsp;', '');
        stre = stre.replace('&amp;', '');
        stre = stre.replace('<br>', '');
        myArray.push(stre);

    }

    //angular.element(document.getElementById('myModal')).scope().SaveComments(myArray);
    angular.element(document.getElementById('allModals')).scope().SaveComments(myArray);

}

function changeToProjects(status, programId) {
    // $("#hdGlobalID").val(programId);
    var statusFlag = document.getElementById('statusProgramOrProject').value;
    var id = document.getElementById('programid').value;
    angular.element(document.getElementsByClassName('info-box-content')).scope().OpenProjects(statusFlag, id);
}

function changeProgressBar() {

    var statusFlag = document.getElementById('statusProgramOrProject').value;
    var id = document.getElementById('programid').value;
    angular.element(document.getElementsByClassName('info-box-content')).scope().cngPrgrsBar(statusFlag, id);
}

function changeName() {
    angular.element(document.getElementById('nameDashboard')).scope().nameChange();
}

function changepROGRAMName() {
    //  angular.element(document.getElementById('ulProjectOrProgram')).scope().refreshProgram();
    var ID = $("#hdGlobalID").val();
    angular.element(document.getElementById('ulProjectOrProgram')).scope().helperMethods.BindLeftPanal(ID);

}

function changeProjectName(projectID, status) {
    angular.element(document.getElementById('headerBar')).scope().helperMethods.BindRGYProgressBar();
    var ID = $("#hdGlobalID").val();
    angular.element(document.getElementById('ulProjectOrProgram')).scope().helperMethods.BindLeftPanal(ID);
}
