var app = angular.module('myModule', []);

app.controller("myController", function ($scope) {

    var employees = [
  { name: "Anuj Kumar", dateOfBirth: new Date("November 23, 1982"), gender: "Male", Salary: "6789.897" },
  { name: "Amit Kumar", dateOfBirth: new Date("September 17, 1978"), gender: "Male", Salary: "678990.897" },
  { name: "Sumit Kumar", dateOfBirth: new Date("June 15, 1978"), gender: "Male", Salary: "67089.897" },
  { name: "Shwati", dateOfBirth: new Date("January 11, 1992"), gender: "Female", Salary: "65757.89700" }];

    $scope.employees = employees;

    //Search Name or Gender From one Text box >> STARTS
    $scope.search = '';
    $scope.filterNameGender = function (employee) {
        return (employee.name + employee.gender).indexOf($scope.search) >= 0
    }
    //Search Name or Gender From one Text box >> ENDS


    // Display 1 – if gender is Male and 2 if it Female >> STARTS
    $scope.changeToNumber = function (gender) {

        if (gender == "Male") return "1";
        else if (gender == "Female") return "2";

    }
    // Display 1 – if gender is Male and 2 if it Female >> ENDS



    //

    $scope.sort() = function () {



    }
    //


    //$scope.maskSalary = '';
    //$scope.filterToMask = function (employee) {
    //    //if (maskSalaryCheckBox) {
    //     //   return employee.Salary.replace([0 - 9], "#");

    //    //} else return employee.Salary;

    //        $.each(employee, function (i,item) {

    //            return item.Salary.replace([0-9],"#");
    //        })

    //}
   
    //Mask Sakary >> STARTS
    $scope.maskSalaryCheckBox = false;

    $scope.isChecked = function () {
        if ($scope.maskSalaryCheckBox) {
            $scope.maskSalaryCheckBox = false;
        }
        else
            $scope.maskSalaryCheckBox = true;
    }
    $scope.maskEmpSalary = function (emp) {
        if ($scope.maskSalaryCheckBox) {
            var x = emp.replace(new RegExp("[0-9]?.?", "g"), "#");
            return x;
        }
        return emp;
    }
    //Mask Sakary >> ENDS
    


});
