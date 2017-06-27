var isGridDataValid = false;

//validate on Save----3
function saveValidation(name, prj, hrs,i) {
    var flag = true;
    if (name == "") {
        if (prj == '0') {
            if (hrs == "") {
                flag = false;
                alert("Please Fill Name ,Program and Hours in row " +(i+1) );
            }
            else {
                flag = false;
                alert("Please Fill Name and Project in row " + (i + 1));
            }
        }
        else {
            if (hrs == "") {
                flag = false;
                alert("Please Fill Name and Hours in row " + (i + 1));
            }
            else {
                flag = false;
                alert("Please Fill Hoursin row " + (i + 1));
            }
        }
        return flag;
    }
    else {
        if (prj == '0') {
            if (hrs == "") {
                flag = false;
                alert("Please Fill Project and Hours in row " + (i + 1));
            }
            else {
                flag = false;
                alert("Please Choose Project in row " + (i + 1));
            }
        }
        else {
            if (hrs == "") {
                flag = false;
                alert(" Please Fill Hours in row " + (i + 1));
            }

        }
        return flag;
    }
   
}
//
//validate on Save----3
function  saveValidationFinance(allocatedbudget, usedbudget, revisedbudget, i) {
    var flag = true;
    if (allocatedbudget == "") {
        if (usedbudget == "") {
            if (revisedbudget == "") {
                flag = false;
                alert("Please Fill allocatedbudget ,usedbudget and revisedbudget in row " + (i + 1));
            }
            else {
                flag = false;
                alert("Please Fill allocatedbudget and usedbudget in row " + (i + 1));
            }
        }
        else {
            if (revisedbudget == "") {
                flag = false;
                alert("Please Fill allocatedbudget and revisedbudget in row " + (i + 1));
            }
            else {
                flag = false;
                alert("Please Fill revisedbudget in row " + (i + 1));
            }
        }
        return flag;
    }
    else {
        if (usedbudget == "") {
            if (revisedbudget == "") {
                flag = false;
                alert("Please Fill usedbudget and revisedbudget in row " + (i + 1));
            }
            else {
                flag = false;
                alert("Please Choose usedbudget in row " + (i + 1));
            }
        }
        else {
            if (revisedbudget == "") {
                flag = false;
                alert(" Please Fill revisedbudget in row " + (i + 1));
            }

        }
        return flag;
    }

}
//

//Called onKeyUP
function validate(ctrl) {
    //alert(ctrl.type + " "+ ctrl.id);
    isGridDataValid = false;
    var ctltype = $(ctrl).attr('data-type');

    if (ctltype == "AlphaNumeric")
    {
        if (checkAlphaNumeric(ctrl.value)) {
            $(ctrl).removeClass("alertBorder");
            return true;
        } else {
            alert("Please Enter Valid Data !");
            ctrl.focus();
			$(ctrl).addClass("alertBorder");
            //$(ctrl).css('border', '1px solid #f00');
          
        }
    } else if (ctltype == "Number") {
        if (checkNumber(ctrl.value)) {
           $(ctrl).removeClass("alertBorder");
          return true;
        } else {
            alert("Please Enter Numeric Value ! ");
            ctrl.focus();

			$(ctrl).addClass("alertBorder");
         

           // $(ctrl).css('border', '1px solid #f00');


        }
    } else if (ctltype == "CharSpaces") {
        if (checkCharSpaces(ctrl.value)) {
            $(ctrl).removeClass("alertBorder");
            return true;
        } else {
            alert("Please Enter Valid Data !");
            ctrl.focus();
			
			$(ctrl).addClass("alertBorder");
            

           // $(ctrl).css('border', '1px solid #f00');


        }
    }
}
//Check For AlphaNumeric
function checkAlphaNumeric(value) {
    var regxCharSpaces = /^[a-zA-Z0-9 ,#]*$/;
        if (regxCharSpaces.test(value.trim())) {
            return true;
        }
        else {
            return false;
        }
}

//Check For Numeric
function checkNumber(value) {
    var regxCharSpaces = /^[0-9]*$/;
    if (regxCharSpaces.test(value)) {
        return true;
    }
    else {
        return false;
    }
}
//Check For Characters
function checkCharSpaces(value) {
    var regxCharSpaces = /^[a-zA-Z ]*$/;
    if (regxCharSpaces.test(value.trim())) {
        return true;
    }
    else {
        return false;
    }
}