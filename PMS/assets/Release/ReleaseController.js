app.controller('ReleaseController', ['$rootScope', '$scope', '$http', '$localStorage', 'ReleaseSrv', function ($rootScope, $scope, $http, $localStorage, ReleaseSrv) {

    $scope.methods = {

        GetCalender: function (year,month) {
            var oPromise = ReleaseSrv.getCalender(year, month).then(function (sucessResponse) {
               
                $scope.models.CalenderURL = sucessResponse.Calender;
            }, function (failureResponse) {
                alert("Error occured in ReleaseController >> GetCalender(); ");
            });
        },
        GetAllReleases: function (year, month, ReleaseId) {
            var oPromise = ReleaseSrv.getAllReleases(year, month, ReleaseId).then(function (sucessResponse) {
                
                $scope.models.arrPreRelease = [];
                $scope.models.arrFutureRelease = [];
                $.each(sucessResponse, function (indx,itm) {

                    if (itm.ReleaseType == 'PreviousRelease') {
                        $scope.models.arrPreRelease.push({ "Title": itm.Title, "ContactPerson": itm.ContactPerson, "Description": itm.Description, "ReleaseDate": itm.ReleaseDate, "ReleaseId": itm.ReleaseId });
                    }
                    else {
                        $scope.models.arrFutureRelease.push({ "Title": itm.Title, "ContactPerson": itm.ContactPerson, "Description": itm.Description, "ReleaseDate": itm.ReleaseDate, "ReleaseId": itm.ReleaseId });
                    }
                });
            }, function (failureResponse) {
                alert("Error occured in ReleaseController >> GetAllReleases(); ");
            });
        },
        GetReleaseData: function (ReleaseId) {

            alert("Release Id = " + ReleaseId);
        }

    }


    $scope.models = {
        CalenderURL: "",
        arrPreRelease: [],
        arrFutureRelease: []
    }

}]);


function GetDefaultRelease()
{
    var rYear = $("#keyYear2").val();
    var rMonth = $("#keyMonth2").val();
    angular.element(document.getElementById('divUnderConstruction')).scope().methods.GetCalender(rYear, rMonth);
    angular.element(document.getElementById('divUnderConstruction')).scope().methods.GetAllReleases(rYear, rMonth,0);
}