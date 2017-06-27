


angular.module('myApp').service('ReleaseSrv', ['$http', '$q', '$rootScope', '$localStorage', '$resource', function ($http, $q, $rootScope, $localStorage, $resource) {

    var deferred = $q.defer();
    this.getCalender = function (year,month) {

        var Releases = $resource("api/Release/GetCaleder?year=" + year + "&month=" + month, {}, {
            "getCalender": {
                method: "GET",
                isArray: false
            }
        });
        return Releases.getCalender().$promise;
    }

    // end parameter function

    this.getAllReleases = function (year, month,ReleaseId) {

        var Releases = $resource("api/Release/GetAllReleases?year=" + year + "&month=" + month + "&ReleaseId=" + ReleaseId, {}, {
                "getAllReleases": {
                    method: "GET",
                    isArray: true
                }
            });
            return Releases.getAllReleases().$promise;
        }

}]);







