



angular.module('myApp').service('BreadCrumbSrv', [ '$http', '$q', '$localStorage', '$resource', function ( $http, $q, $localStorage, $resource) {

    var deferred = $q.defer();

    this.getBreadCrumb = function (id) {
        var BreadCrumb = $resource("api/BreadCrumb/GetBreadCrumb?id=" + id, {}, {
            "getBreadrumb": {
                method: "GET",
                isArray: true
            }
        });
        return BreadCrumb.getBreadrumb().$promise;
    }

    // end parameter function
}]);

//BreadCrumbCtrl

angular.module('myApp').controller('BreadCrumbCtrl', ['$rootScope','$scope','BreadCrumbSrv', function ($rootScope,$scope,BreadCrumbSrv) {

    $scope.viewModel = {

        ItemList:[]
    }

    $scope.methods = {

        BindBreadCrumb: function (id)
        {

            var Obj = null;
            BreadCrumbSrv.getBreadCrumb(id).then(function (successResponse) {

                $scope.viewModel.ItemList = [];
                Obj = { 'Name': 'Portfolio', "ID": '0' }
                $scope.viewModel.ItemList.push(Obj);

                $.each(successResponse, function (index, item) {
                    Obj = { 'Name': item.Program_Name, "ID": item.Program_Id }
                    $scope.viewModel.ItemList.push(Obj);
                    if ($scope.viewModel.ItemList.length>1)
                        document.getElementById('idBrdScrProgName').innerHTML = $scope.viewModel.ItemList[1].Name.trim();
                })

            }, function (failureResponse) {

               // alert("Failure in Breadcrumb binding");
            });
        },

        ReloadProgram: function ()
        {
            $rootScope.GlobalId = "0";
            $rootScope.EntityLevel = "0";
            $("#hdGlobalID").val(0);
        }
    }


  //  $scope.methods.BindBreadCrumb(0);

    $scope.$on('handleBroadcast', function (event, args) {
        
      //  alert("Data Handeeled Braodcast =>> " + args.GlobalId);
        $scope.methods.BindBreadCrumb(args.GlobalId);
        
    });

}]);
