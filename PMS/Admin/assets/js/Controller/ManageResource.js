
adminApp.service('GetResourceService', ['$http', '$q', function ($http, $q) {


    var deferred = $q.defer();
    this.GetDesignation = function () {
        return $http({
            url: "../api/Designation/",
            type: "get",
            async: false,
        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    },
    this.AddResource = function (oResource) {
        return $http({
            url: "../api/Resource/AddResource",
            dataType: 'json',
            method: 'POST',
            data: oResource,

        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    },
    this.GetResource = function () {
        return $http({
            url: "../api/Resource/GetAllResource",
            type: "get",
            async: false,

        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    },
    this.AssignResourceProject = function (oResourceRole) {

        return $http({
            url: "../api/Resource/AssignResourceProject",
            dataType: 'json',
            method: 'POST',
            data: oResourceRole,

        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    },
     this.GetProgramList = function (ID) {
         return $http({
             url: "../api/program/GetAllProgram/" + ID,
             type: "get",
             async: false,

         }).success(function (succesResponse) {
             deferred.resolve(succesResponse);
             return deferred.promise;
         }).error(function (failureResponse) {
             deferred.reject(failureResponse);
             return deferred.promise;
         });

     },
     this.GetResourceProgramProjectList = function () {
         return $http({
             url: "../api/Resource/GetResourceProgramProjectList",
             type: "get",
             async: false,

         }).success(function (succesResponse) {
             deferred.resolve(succesResponse);
             return deferred.promise;
         }).error(function (failureResponse) {
             deferred.reject(failureResponse);
             return deferred.promise;
         });

     },

    this.DeleteResourceProject= function (Id) {
        return $http({
            url: "../api/Resource/DeleteResourceProject/" + Id,
            type: "get",
            async: false,

        }).success(function (succesResponse) {
            deferred.resolve(succesResponse);
            return deferred.promise;
        }).error(function (failureResponse) {
            deferred.reject(failureResponse);
            return deferred.promise;
        });
    }
}]);

adminApp.directive('autoComplete', function ($timeout) {
    return function (scope, iElement, iAttrs) {
        iElement.autocomplete({
            source: scope[iAttrs.uiItems],
            select: function () {
                $timeout(function () {
                    iElement.trigger('input');
                }, 0);
            }
        });
    };
});

adminApp.controller('ControllerManageResource', ['$scope', 'GetResourceService', function ($scope, GetResourceService) {

    var oPromise = GetResourceService.GetDesignation().then(function (successResponse) {

        if (successResponse.data.length != 0) {
            $scope.designationList = successResponse.data;
        }

    }, function (failureResponse) {
    });



    var oPromise = GetResourceService.GetResource().then(function (successResponse) {

        if (successResponse.data.length != 0) {
            $scope.models.Resource = successResponse.data;
        }

    }, function (failureResponse) {
    });
    var oPromise = GetResourceService.GetProgramList(0).then(function (successResponse) {

        if (successResponse.data) {
            $scope.models.ProgramList = successResponse.data;
        }

    }, function (failureResponse) {
    });

    var oPromise = GetResourceService.GetResourceProgramProjectList().then(function (successResponse) {

        if (successResponse.data) {
            $scope.models.ResourceAssignedProgramList = successResponse.data;
            $scope.models.Temp = successResponse.data;
        }

    }, function (failureResponse) {
        bootbox.alert("Error Occured! Please try again later.");
    });

    $scope.methods = {
        AddResource: function () {
            var oResource = {
                "Name": $scope.models.ResourceName,
                "Designation": $scope.models.selectedDesignation,
                "Skills": 1,
                "ResourceId": $scope.models.ResourceId

            }

            var oPromise = GetResourceService.AddResource(oResource).then(function (successResponse) {

                if (successResponse.data) {
                    $scope.HelperMethods.ResetResource();
                    bootbox.alert("Resource Added Sucessfully!");

                }

            }, function (failureResponse) {
                bootbox.alert("Error Occured! Please try again later.");
            });

        },
        AssignProject: function () {
            var temp = $scope.models.selectedResource.split('(EmpCode-');
            if (temp.length > 1) {
                temp = temp[1].split(')');
                var resourceId = "";
                $.each($scope.models.Resource, function (x, obj) {
                    if (obj.ResourceEmpID == temp[0])
                        resourceId = obj.ResourceID;
                });

                var oResourceRole = {
                    "ProgramId": $scope.models.selectedProgram,
                    "ProjectId": $scope.models.selectedProject,
                    "ResourceId": resourceId

                }

                var oPromise = GetResourceService.AssignResourceProject(oResourceRole).then(function (successResponse) {

                    if (successResponse.data == 1) {
                        $scope.HelperMethods.ResetResourceRole();
                        bootbox.alert("Resource Assigned Sucessfully!");
                    }
                    else {
                        bootbox.alert("Resource is already assigned to the selected project!");
                    }

                }, function (failureResponse) {
                    bootbox.alert("Error Occured! Please try again later.");
                });
            }
            else {
                bootbox.alert("Resource not found. Please select resource from suggestions!");
            }

        },

        GetResourceProgramSearchList: function () {

            $scope.models.ResourceAssignedProgramList = [];
            var temp1 = $scope.models.selectedResource.split('-');
            var empid="";
            if (temp1[0]!="") {
                temp1 = temp1[1].split(')');
                empid = temp1[0];
            }

            $.each($scope.models.Temp, function (x, obj) {
                if (($scope.models.selectedProgram != 0 && $scope.models.selectedResource == "" && $scope.models.selectedProgram == obj.ProgramId) || ($scope.models.selectedProgram != 0 && $scope.models.selectedResource != "" && $scope.models.selectedProgram == obj.ProgramId && obj.EmpId == empid))//) ||( $scope.models.selectedProgram != 0 && $scope.models.selectedResource != "" && $scope.models.selectedProgram.trim() == obj.ProgramId.trim() && obj.EmpId.trim() == empid.trim()))
                {
                    $scope.models.ResourceAssignedProgramList.push(obj);
                }
            });
          
        },
        GetResourceNameSearchList: function () {

            $scope.models.ResourceAssignedProgramList = [];
            var temp1 = $scope.models.selectedResource.split('-');
            var empid = "";
            if (temp1[0] != "") {
                temp1 = temp1[1].split(')');
                empid = temp1[0];
            }
            $.each($scope.models.Temp, function (x, obj) {
                if (($scope.models.selectedProgram == 0 && $scope.models.selectedResource != "" && empid == obj.EmpId) || ($scope.models.selectedProgram != 0 && $scope.models.selectedResource != "" && $scope.models.selectedProgram == obj.ProgramId && obj.EmpId == empid)) {
                    $scope.models.ResourceAssignedProgramList.push(obj);
                }
            });

        }

    }

    $scope.models = {
        selectedDesignation: 0,
        ResourceId: "",
        ResourceName: "",
        ResourceSkill: "",
        selectedProgram: 0,
        selectedProject: "",
        selectedResource: "",
        ProgramList: [],
        ProjectList: [],
        Resource: "",
        EmpCode: "EmpCode",
        ResourceAssignedProgramList: [],
        Temp:[]

    }

    $scope.HelperMethods = {

        ResetResource: function () {

            $scope.models.selectedDesignation = 0;
            $scope.models.ResourceId = "";
            $scope.models.ResourceName = "";
            $scope.models.ResourceSkill = "";


        },
        ResetResourceRole: function () {

            $scope.models.selectedProgram = 0;
            $scope.models.selectedProject = 0;
            $scope.models.selectedResource = "";
        },
        FillProjectList:function()
        {
            var programId = $scope.models.selectedProgram;
            var oPromise = GetResourceService.GetProgramList(programId).then(function (successResponse) {

                if (successResponse.data) {
                    $scope.models.ProjectList = successResponse.data;
                }

            }, function (failureResponse) {
            });
        },
        DeleteResourceProject:function(Id)
        {
            bootbox.confirm("Are You Sure You want to Release Resource ?", function (e) {
                if (e == true) {
            var oPromise = GetResourceService.DeleteResourceProject(Id).then(function (successResponse) {

                if (successResponse.data==1) {
                    bootbox.alert("Resource unassigned from the Project.");
                    var oPromise = GetResourceService.GetResourceProgramProjectList().then(function (successResponse) {

                        if (successResponse.data) {
                            $scope.models.ResourceAssignedProgramList = successResponse.data;
                            $scope.models.Temp = successResponse.data;
                        }

                    }, function (failureResponse) {
                        bootbox.alert("Error Occured! Please try again later.");
                    });
                }
                else
                {
                    bootbox.alert("Could not unassigned resource now. Try again latter.");
                }

            }, function (failureResponse) {
            });
                }
            });
        }
    }

}]);