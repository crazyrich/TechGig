

angular.module('myApp').service('MileStoneSrv', ['$http', '$q', '$localStorage', '$resource', function ($http, $q, $localStorage, $resource) {

    var deferred = $q.defer();

    var person = $localStorage.LoginUser;
    
    this.getMileStone = function () {

        var person = JSON.parse(localStorage.getItem('LoginUser'));

        var ProgId = $("#programid").val();
        var ParentId = $("#hdGlobalID").val();

        var MileStoneData = $resource("api/MileStone/GetMileStoneByprogramId?ParentId=" + ParentId + "&ProgrameId=" + ProgId + "&UserId="+ person.UserName, {}, {
            "getMileStoneData": {
                method: "GET",
                isArray: true
            }
        });
        return MileStoneData.getMileStoneData().$promise;
    }

    // end parameter function
}]);