var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.myFunction = function () {
        $scope.buttonText = "Clicked!";
        $scope.buttonStyle = { color: 'red' };
    };
});
app.controller('chemCtrl', function ($scope, $http) {
   
   
    $scope.pageNumber = 0;
    $scope.documents = [];
    
    $http.get("http://172.18.66.83:8080/api/program")
             .success(function (response) {
                 $scope.value = response;
                
             })
             .error(function (execption, ab, er) {
                
             });

    $scope.getTotalMembers = function () {
         var getTotalMembers = 0;
         for (var i = 0; i < $scope.periodic.elements.length; i++) {
             var TotalMembers = $scope.periodic.elements[i];
             getTotalMembers += (TotalMembers.members);
         }
         return getTotalMembers;
     }

    $scope.getTotalRisk = function () {
         var total = 0;
         for (var i = 0; i < $scope.periodic.elements.length; i++) {
             var TotalRisk = $scope.periodic.elements[i];
             getTotalRisk += (TotalRisk.risk);
         }
         return getTotalRisk;
     }

    $scope.getTotalIssue = function () {
         var getTotalIssue = 0;
         for (var i = 0; i < $scope.periodic.elements.length; i++) {
             var TotalIssue = $scope.periodic.elements[i];
             getTotalIssue += (TotalIssue.issue);
         }
         return getTotalIssue;
    }
   
    $scope.setPageNumber = function (index, programname1,programid) {
        $scope.pageNumber = index;
        document.getElementById('header').innerHTML = '<h4>' + programname1 + '</h4>';
        charttimeline(index, programid);
        
        Keytable(programid);
        document.getElementById('programid').value = programid;
        
    };

    function Keytable(programid) {
        $http.get('http://172.18.66.83:8080/api/program/' + programid)
             .success(function (response) {
                 $scope.documents = response;
               
             })
             .error(function (execption, ab, er) {
                
             });

    };
    
    function charttimeline(status, rogramid) {
        var newJsonData = [];
        var data = null;
        document.getElementById('programid').value = rogramid;
        
        $http.get('http://172.18.66.83:8080/api/milestone')
            .success(function (response) {
                data = response;
                document.getElementById('visualization').innerHTML = null;
               
                $.each(data, function (i, item) {
                    if (item.Program_Id == rogramid)
                    {
                        newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.M_Date });
                                             
                    }
                    
                });
                
                var container = document.getElementById('visualization');
                var items = new vis.DataSet(newJsonData);
                
                var options = { height: 400, border: null };
                var timeline = new vis.Timeline(container, items, options);
                //document.getElementById('visualization').innerHTML = null;
                // Create a DataSet (allows two way data-binding)

                //if (status == '0') {
                //    document.getElementById('visualization').innerHTML = null;
                //    data = [
                //                { id: 1, content: 'Test network connectivity solution (load balancing on MI side)', start: '2015-05-01' },
                //                { id: 2, content: 'Approval of final SCAL deployment plan by leadership to gain PBM support for rollout dates', start: '2015-05-21' }
                //    ];
                //}
                //else if (status == '1') {
                //    document.getElementById('visualization').innerHTML = null;
                //    data = [
                //                { id: 1, content: 'Extract Program Installed in MCPS Production', start: '2015-01-10' },
                //                { id: 2, content: 'Extract Program Installed in MCPS Production', start: '2015-02-14' },
                //                { id: 3, content: 'Code installed DMDL environment ', start: '2015-03-10' },
                //                { id: 4, content: 'Drug & Clinical File Upload (8 EPS + 1 MO)', start: '2015-02-21' },
                //                { id: 5, content: 'Conversion Testing Pass 1', start: '2015-02-28' },
                //                { id: 6, content: 'Migrate CAEPS EPS to AIX', start: '2015-03-27' },
                //                            { id: 7, content: 'Data Conversion Testing Pass 1', start: '2015-02-04' },
                //                            { id: 8, content: 'Production MCPS Extracts Available for Pre-Test ', start: '2015-02-04' },
                //                            { id: 9, content: 'Regression Testing Signoff', start: '2015-04-13' },
                //                { id: 10, content: 'Pre-Release  1 Testing ', start: '2015-03-16' },
                //                { id: 11, content: 'ROC 1 EPS DB Changes Delivered', start: '2015-05-19' },
                //                { id: 12, content: 'Sprint 35 - PDX Code Received', start: '2015-04-19' },
                //                            { id: 13, content: 'Sprint 35 - PDX Code Installed & Integrated in KP-Dev Env', start: '2015-02-27' },
                //                            { id: 14, content: 'Sprint 35 - PDX Code Installed & Integrated in KP-Dev Env', start: '2015-02-27' }
                //    ];

                //}
                //else if (status == '2') {
                //    document.getElementById('visualization').innerHTML = null;
                //    data = [
                //                { id: 1, content: 'Citrix ICONs published in XenApp6 production farm', start: '2015-04-14' },
                //                { id: 14, content: 'Sprint 35 - PDX Code Installed & Integrated in KP-Dev Env', start: '2015-02-27' }
                //    ];

                //}
                //else if (status == '3') {
                //    document.getElementById('visualization').innerHTML = null;
                //    data = [
                //                { id: 1, content: 'PnS Environ Setup Complete - 34.5', start: '2015-02-10' },
                //                { id: 2, content: 'PnS Data Loads Complete', start: '2015-02-14' },
                //                { id: 3, content: 'BAT (8 EPS + 1 MO) ', start: '2015-03-10' },
                //                { id: 4, content: 'Installation & Validation Activities Completed', start: '2015-03-21' },
                //                { id: 5, content: 'Execute "Joint" PnS Checklist & Backup Systems', start: '2015-04-28' },
                //                { id: 6, content: 'Multi-EPS (1 Store ONLY) - LPAR 2', start: '2015-04-27' },
                //                            { id: 7, content: 'Mail Order (Park Sierra)', start: '2015-05-04' },
                //                            { id: 8, content: 'PnS Debrief Completed  ', start: '2015-05-04' },
                //                            { id: 9, content: 'Prepare final Report', start: '2015-04-13' }
                //    ];

                //}
                //else if (status == '4') {
                //    document.getElementById('visualization').innerHTML = null;
                //    data = [
                //                { id: 1, content: 'BBF Linux to AIX Migration (dry run 1)', start: '2015-02-10' },
                //                { id: 2, content: 'CAEPS BBF Linux to AIX Migration  (dry run 2)', start: '2015-02-14' },
                //                { id: 3, content: 'P6 Frame Upgrade Part 1 (capacity)', start: '2015-02-10' },
                //                { id: 4, content: 'P6 Frame Upgrade Part 2 (failover)', start: '2015-02-21' },
                //                { id: 5, content: 'P6 Frame Upgrade Final', start: '2015-02-28' },
                //                { id: 6, content: 'Production CAEPS migration to AIX 8:1 (w/Citrix) infrastructure', start: '2015-02-27' },
                //                            { id: 7, content: 'Downey & Kraemer going live on AIX 8:1 (w/Citrix) infrastructure', start: '2015-05-04' },
                //                            { id: 8, content: 'Transition from embedded DBs in production (part of Migration to AIX Platform)', start: '2015-05-04' },
                //                            { id: 9, content: 'PEN Test complete', start: '2015-04-13' },
                //                { id: 10, content: 'Cycle 36 Design review completed', start: '2015-04-16' },
                //                { id: 11, content: 'MDS Upload', start: '2015-04-19' },
                //                { id: 12, content: 'POS Soft Freeze', start: '2015-04-19' },
                //                            { id: 13, content: 'POS Code frozen for SCAL release', start: '2015-04-27' },
                //                            { id: 14, content: 'Sprint Cycle 36 Demo completed', start: '2015-04-27' }
                //    ];

                //}
              
            })
            .error(function (execption, ab, er) {
               
            });
        
        
        


       
       
        
        
    };

    $scope.doubleclick = function () {
        $http.get("http://172.18.66.83:8080/api/program")
            .success(function (response) {
                $scope.value = response;
                //alert(response);
            })
            .error(function (execption, ab, er) {
              
            });
    };
       
});
app.controller('NavigationController', function ($scope) {
    $scope.changeview = function (color) {
        var progDiv = angular.element(document.querySelector('#ProgramDiv'));
        var mainDiv = angular.element(document.querySelector('#tablesandcharts'));

        var myElPurple = angular.element(document.querySelector('#divPurple'));
        var myElBlue = angular.element(document.querySelector('#divBlue'));
        var myElAqua = angular.element(document.querySelector('#divAqua'));
        var myElRed = angular.element(document.querySelector('#divRed'));
        var myElYellow = angular.element(document.querySelector('#divYellow'));


        var myTblPurple = angular.element(document.querySelector('#tablePurple'));
        var myTblBlue = angular.element(document.querySelector('#tableBlue'));
        var myTblAqua = angular.element(document.querySelector('#tableAqua'));
        var myTblRed = angular.element(document.querySelector('#tableRed'));
        var myTblYellow = angular.element(document.querySelector('#tableYellow'));

        if (color == 'Programs') {

            progDiv.css('display', '');
            mainDiv.css('display', 'none');

            //myElPurple.css('display', '');
            //myElBlue.css('display', 'none');
            //myElAqua.css('display', 'none');
            //myElRed.css('display', 'none');
            //myElYellow.css('display', 'none');

            //myTblPurple.css('display', 'none');
            //myTblBlue.css('display', 'none');
            //myTblAqua.css('display', 'none');
            //myTblRed.css('display', 'none');
            //myTblYellow.css('display', 'none');
        }
        if (color == 'Amount') {
            progDiv.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', '');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Persons') {
            progDiv.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', '');
            myElRed.css('display', 'none');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Risks') {
            progDiv.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', '');
            myElYellow.css('display', 'none');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Issues') {
            progDiv.css('display', 'none');
            mainDiv.css('display', '');

            myElPurple.css('display', 'none');
            myElBlue.css('display', 'none');
            myElAqua.css('display', 'none');
            myElRed.css('display', 'none');
            myElYellow.css('display', '');

            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
    };

    $scope.ShowTable = function (color) {

        var myTblPurple = angular.element(document.querySelector('#tablePurple'));
        var myTblBlue = angular.element(document.querySelector('#tableBlue'));
        var myTblAqua = angular.element(document.querySelector('#tableAqua'));
        var myTblRed = angular.element(document.querySelector('#tableRed'));
        var myTblYellow = angular.element(document.querySelector('#tableYellow'));

        if (color == 'Purple') {
            myTblPurple.css('display', '');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Blue') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', '');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Aqua') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', '');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Red') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', '');
            myTblYellow.css('display', 'none');
        }
        if (color == 'Yellow') {
            myTblPurple.css('display', 'none');
            myTblBlue.css('display', 'none');
            myTblAqua.css('display', 'none');
            myTblRed.css('display', 'none');
            myTblYellow.css('display', '');
        }
    };

    $scope.ZoomOut = function (value) {
        if (value == '1') {
            document.getElementById("ProjectPNG").style.width = '100px';
            document.getElementById("ProjectPNG").style.height = '50px';
        }
        if (value == '2') {
            document.getElementById("FinancePNG").style.width = '100px';
            document.getElementById("FinancePNG").style.height = '50px';
        }
        if (value == '3') {
            document.getElementById("MemberPNG").style.width = '100px';
            document.getElementById("MemberPNG").style.height = '50px';
        }
        if (value == '4') {
            document.getElementById("RiskPNG").style.width = '100px';
            document.getElementById("RiskPNG").style.height = '50px';
        }
        if (value == '5') {
            document.getElementById("IssuePNG").style.width = '100px';
            document.getElementById("IssuePNG").style.height = '50px';
        }
        if (value == '6') {
            document.getElementById("ProjectPNG").style.width = '100px';
            document.getElementById("ProjectPNG").style.height = '50px';
        }
    };

    $scope.ZoomIn = function (value) {
        if (value == '1') {
            document.getElementById("ProjectPNG").style.width = '41px';
            document.getElementById("ProjectPNG").style.height = '42px';
        }
        if (value == '2') {
            document.getElementById("FinancePNG").style.width = '46px';
            document.getElementById("FinancePNG").style.height = '43px';
        }
        if (value == '3') {
            document.getElementById("MemberPNG").style.width = '49px';
            document.getElementById("MemberPNG").style.height = '24px';
        }
        if (value == '4') {
            document.getElementById("RiskPNG").style.width = '51px';
            document.getElementById("RiskPNG").style.height = '45px';
        }
        if (value == '5') {
            document.getElementById("IssuePNG").style.width = '51px';
            document.getElementById("IssuePNG").style.height = '46px';
        }
        if (value == '6') {
            document.getElementById("ProjectPNG").style.width = '41px';
            document.getElementById("ProjectPNG").style.height = '42px';
        }
    };
});

app.controller('timeLineEditable', function ($scope) {
    $scope.winEditableGrid = function editableGrid() {
        window.open('../timeline/EditableGrid.html', 'EditableGrid', 'width=800,height=300,name="",scrollbars=1,resizable=1');
    }
});

app.controller('MainCtrl', function ($scope) {
    $scope.showModal = false;
    $scope.toggleModal = function (name,progName,flag,programID) {
        $scope.noofprogramp = name;
        $scope.nameofprogramp = progName;
        $scope.countdatafor = flag;
        $scope.showModal = !$scope.showModal;
    };
});

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
              '<div class="modal-content">' +
                '<div class="modal-header">' +
                  '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                  '<h4 class="modal-title">{{ title }}</h4>' +
                '</div>' +
                '<div class="modal-body" ng-transclude></div>' +
              '</div>' +
            '</div>' +
          '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

app.controller('ProgramNameController', function ($scope, $http) {
    
    


});

app.controller('Hover', function ($scope) {
    $scope.DoIt = function (tileNumber) {

        if (tileNumber == '1') {
            document.getElementById("myBtn").style.backgroundColor = 'gray';
            document.getElementById("myBtn").style.padding = '5px';
        }
        if (tileNumber == '2') {
            document.getElementById("myBtn2").style.backgroundColor = 'gray';
            document.getElementById("myBtn2").style.padding = '5px';
        }
        if (tileNumber == '3') {
            document.getElementById("myBtn3").style.backgroundColor = 'gray';
            document.getElementById("myBtn3").style.padding = '5px';
        }

    };

    $scope.UnDoIt = function (tileNumber) {

        if (tileNumber == '1') {
            document.getElementById("myBtn").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn").style.padding = '0px';
        }
        if (tileNumber == '2') {
            document.getElementById("myBtn2").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn3").style.padding = '0px';
        }
        if (tileNumber == '3') {
            document.getElementById("myBtn3").style.backgroundColor = '#f7f7f7';
            document.getElementById("myBtn3").style.padding = '0px';
        }
    };
});


app.controller('viewTimeline', function ($scope, $http) {

    var newJsonData = [];
    var data = null;
    $http.get('http://172.18.66.83:8080/api/milestone')
       .success(function (response) {

           data = response;
           document.getElementById('divGrid').innerHTML = null;
           $.each(data, function (i, item) {
               
               if (item.Program_Id == document.getElementById('programid').value) {
                   newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.M_Date });

               }
           });

           document.getElementById('divGrid').innerHTML = null;
           var container = document.getElementById('divGrid');
           // Create a DataSet (allows two way data-binding)
           //var data = null;

           //document.getElementById('divGrid').innerHTML = null;

           //data = [
           //            { id: 1, content: 'BBF Linux to AIX Migration (dry run 1)', start: '2015-04-10' },
           //            { id: 2, content: 'CAEPS BBF Linux to AIX Migration  (dry run 2)', start: '2015-04-14' },
           //            { id: 3, content: 'P6 Frame Upgrade Part 1 (capacity)', start: '2015-04-10' },
           //            { id: 4, content: 'P6 Frame Upgrade Part 2 (failover)', start: '2015-04-21' },
           //            { id: 5, content: 'P6 Frame Upgrade Final', start: '2015-04-28' },
           //            { id: 6, content: 'Production CAEPS migration to AIX 8:1 (w/Citrix) infrastructure', start: '2015-04-27' },
           //                        { id: 7, content: 'Downey & Kraemer going live on AIX 8:1 (w/Citrix) infrastructure', start: '2015-05-04' },
           //                        { id: 8, content: 'Transition from embedded DBs in production (part of Migration to AIX Platform)', start: '2015-05-04' },
           //                        { id: 9, content: 'PEN Test complete', start: '2015-04-13' },
           //            { id: 10, content: 'Cycle 36 Design review completed', start: '2015-04-16' },
           //            { id: 11, content: 'MDS Upload', start: '2015-04-19' },
           //            { id: 12, content: 'POS Soft Freeze', start: '2015-04-19' },
           //                        { id: 13, content: 'POS Code frozen for SCAL release', start: '2015-04-27' },
           //                        { id: 14, content: 'Sprint Cycle 36 Demo completed', start: '2015-04-27' }
           //];
           var items = new vis.DataSet(newJsonData);
           var options = { height: 400, width: 500 };

           var timeline = new vis.Timeline(container, items, options);
       })
       .error(function (execption, ab, er) {
          
       });
    
    
    
    $scope.timeline = function abcd() {
        var newJsonData = [];
        var data = null;
        $http.get('http://172.18.66.83:8080/api/milestone')
           .success(function (response) {

               data = response;
               document.getElementById('divGrid').innerHTML = null;
               $.each(data, function (i, item) {

                   if (item.Program_Id == document.getElementById('programid').value) {
                       newJsonData.push({ "id": item.MileStoneId, "content": item.Milestone_Description, "start": item.M_Date });

                   }
               });

               document.getElementById('divGrid').innerHTML = null;
               var container = document.getElementById('divGrid');
               // Create a DataSet (allows two way data-binding)
               //var data = null;

               //document.getElementById('divGrid').innerHTML = null;

               //data = [
               //            { id: 1, content: 'BBF Linux to AIX Migration (dry run 1)', start: '2015-04-10' },
               //            { id: 2, content: 'CAEPS BBF Linux to AIX Migration  (dry run 2)', start: '2015-04-14' },
               //            { id: 3, content: 'P6 Frame Upgrade Part 1 (capacity)', start: '2015-04-10' },
               //            { id: 4, content: 'P6 Frame Upgrade Part 2 (failover)', start: '2015-04-21' },
               //            { id: 5, content: 'P6 Frame Upgrade Final', start: '2015-04-28' },
               //            { id: 6, content: 'Production CAEPS migration to AIX 8:1 (w/Citrix) infrastructure', start: '2015-04-27' },
               //                        { id: 7, content: 'Downey & Kraemer going live on AIX 8:1 (w/Citrix) infrastructure', start: '2015-05-04' },
               //                        { id: 8, content: 'Transition from embedded DBs in production (part of Migration to AIX Platform)', start: '2015-05-04' },
               //                        { id: 9, content: 'PEN Test complete', start: '2015-04-13' },
               //            { id: 10, content: 'Cycle 36 Design review completed', start: '2015-04-16' },
               //            { id: 11, content: 'MDS Upload', start: '2015-04-19' },
               //            { id: 12, content: 'POS Soft Freeze', start: '2015-04-19' },
               //                        { id: 13, content: 'POS Code frozen for SCAL release', start: '2015-04-27' },
               //                        { id: 14, content: 'Sprint Cycle 36 Demo completed', start: '2015-04-27' }
               //];
               var items = new vis.DataSet(newJsonData);
               var options = { height: 400, width: 1000 };

               var timeline = new vis.Timeline(container, items, options);
           })
           .error(function (execption, ab, er) {
              
           });

    //    document.getElementById('divGrid').innerHTML = null;
    //    var container = document.getElementById('divGrid');
    //    // Create a DataSet (allows two way data-binding)
    //    //var data = null;

    //    //document.getElementById('divGrid').innerHTML = null;

    //    //data = [
    //    //            { id: 1, content: 'BBF Linux to AIX Migration (dry run 1)', start: '2015-04-10' },
    //    //            { id: 2, content: 'CAEPS BBF Linux to AIX Migration  (dry run 2)', start: '2015-04-14' },
    //    //            { id: 3, content: 'P6 Frame Upgrade Part 1 (capacity)', start: '2015-04-10' },
    //    //            { id: 4, content: 'P6 Frame Upgrade Part 2 (failover)', start: '2015-04-21' },
    //    //            { id: 5, content: 'P6 Frame Upgrade Final', start: '2015-04-28' },
    //    //            { id: 6, content: 'Production CAEPS migration to AIX 8:1 (w/Citrix) infrastructure', start: '2015-04-27' },
    //    //                        { id: 7, content: 'Downey & Kraemer going live on AIX 8:1 (w/Citrix) infrastructure', start: '2015-05-04' },
    //    //                        { id: 8, content: 'Transition from embedded DBs in production (part of Migration to AIX Platform)', start: '2015-05-04' },
    //    //                        { id: 9, content: 'PEN Test complete', start: '2015-04-13' },
    //    //            { id: 10, content: 'Cycle 36 Design review completed', start: '2015-04-16' },
    //    //            { id: 11, content: 'MDS Upload', start: '2015-04-19' },
    //    //            { id: 12, content: 'POS Soft Freeze', start: '2015-04-19' },
    //    //                        { id: 13, content: 'POS Code frozen for SCAL release', start: '2015-04-27' },
    //    //                        { id: 14, content: 'Sprint Cycle 36 Demo completed', start: '2015-04-27' }
    //    //];
    //    var items = new vis.DataSet(newJsonData);
    //    var options = { height: 400, width: 1000 };

    //    var timeline = new vis.Timeline(container, items, options);
    }

});

app.controller('editTimelineData', function ($scope, $http) {

    $http.get('http://172.18.66.83:8080/api/milestone')
       .success(function (response) {

           debugger
           $scope.value = response;
       })
       .error(function (execption, ab, er) {
 
       });
    document.getElementById('programid').value
    $scope.editData = function timelineData() {
        
        var data = [{ "MileStoneId": 1, "Program_Id": 1, "Program_Name": "ESB ", "Project_Id": 1, "Project_Name": "Member Directed Fill Ahead (MDFA)", "Release": "MAS", "Milestone_Description": "Extract Program Installed in MCPS Production", "M_Date": "3/3/2016 1:50:40 PM", "Revised_Date": null, "Priority": "Low", "Major_Minor": "Mino", "Dependency": "McKesson", "Notes": null }, { "MileStoneId": 2, "Program_Id": 1, "Program_Name": "ESB ", "Project_Id": 1, "Project_Name": "Member Directed Fill Ahead (MDFA)", "Release": "MAS", "Milestone_Description": "Extract Program Installed in MCPS Production", "M_Date": "3/3/2016 1:50:40 PM", "Revised_Date": null, "Priority": "Low", "Major_Minor": "Mino", "Dependency": "McKesson", "Notes": null }, { "MileStoneId": 3, "Program_Id": 1, "Program_Name": "ESB ", "Project_Id": 1, "Project_Name": "Member Directed Fill Ahead (MDFA)", "Release": "MAS", "Milestone_Description": "Extract Program Installed in MCPS Production", "M_Date": "3/3/2016 1:50:40 PM", "Revised_Date": null, "Priority": "Low", "Major_Minor": "Mino", "Dependency": "McKesson", "Notes": null }, { "MileStoneId": 4, "Program_Id": 1, "Program_Name": "ESB ", "Project_Id": 1, "Project_Name": "Member Directed Fill Ahead (MDFA)", "Release": "MAS", "Milestone_Description": "Extract Program Installed in MCPS Production", "M_Date": "3/3/2016 1:50:40 PM", "Revised_Date": null, "Priority": "Low", "Major_Minor": "Mino", "Dependency": "McKesson", "Notes": null }, { "MileStoneId": 5, "Program_Id": 1, "Program_Name": "ESB ", "Project_Id": 1, "Project_Name": "Member Directed Fill Ahead (MDFA)", "Release": "MAS", "Milestone_Description": "Extract Program Installed in MCPS Production", "M_Date": "3/3/2016 1:50:40 PM", "Revised_Date": null, "Priority": "Low", "Major_Minor": "Mino", "Dependency": "McKesson", "Notes": null }];
        var newJsonData = [];
        $.each($scope.value, function (i, item) {
            if (item.Program_Id == document.getElementById('programid').value)
            newJsonData.push({ "Project_Name": item.Project_Name, "Release": item.Release , "Milestone_Description": item.Milestone_Description, "Priority": item.Priority, "Dependency": item.Dependency, "Notes": item.Notes});
        });

        var dyntable = "<div><table id='tblDataControl' class='table'><thead>" +
        "<tr><th>MileStoneId</th><th>Project Name</th><th>Release</th><th>Milestone Description</th><th>Priority</th><th>Dependency</th><th>Notes</th></tr></thead><tbody>"
        $.each(newJsonData, function (i, item) {

            dyntable += "<tr><td>" + item.MileStoneId + "</td><td> <div contenteditable='true' > " + item.Project_Name + "</div></td>" +
                        "<td> <div contenteditable='true' > " + item.Release + "</div></div></td>" +
                        "<td> <div contenteditable='true' > " + item.Milestone_Description + "</div></td>" +
                        "<td> <div contenteditable='true' > " + item.Priority + "</div></td>" +
                        "<td> <div contenteditable='true' > " + item.Dependency + "</div></td>" +
                        "<td> <div contenteditable='true' > " + item.Notes + "</div></td></tr>";

        });
        dyntable += "</tbody></table>";
        dyntable += "<table><tr><td align='right' valign='top' style='width:1000px'>";
        dyntable += "<button type='button' class='btn btn-primary' ng-controller='updateTimelineData' ng-click='updateData();'>Save</button>";
        dyntable += "</td></tr></table></div>";
        document.getElementById('divGrid').innerHTML = dyntable;

    }
});

app.controller('updateTimelineData', function ($scope) {
    debugger;
    var jsonData = null;
    jsonData += "[{";
    $scope.updateData = function timelineData() {
        var rows = $('#tblDataControl tbody >tr');
        var columns;
        for (var i = 0; i < rows.length; i++) {
            columns = $(rows[i]).find('td');
            for (var j = 0; j < columns.length; j++) {
                console.log($(columns[j]).html());
                if (j == 0)
                { jsonData += "'MileStoneId':" + $(columns[j]).html() + "," }
                else if (j == 1)
                { jsonData += "'Project_Name':" + $(columns[j]).html() + "," }
                else if (j == 2)
                { jsonData += "'Release':" + $(columns[j]).html() + "," }
                else if (j == 3)
                { jsonData += "'Milestone_Description':" + $(columns[j]).html() + "," }
                else if (j == 4)
                { jsonData += "'Priority':" + $(columns[j]).html() + "," }
                else if (j == 5)
                { jsonData += "'Dependency':" + $(columns[j]).html() + "," }
                else if (j == 6)
                { jsonData += "'Notes':" + $(columns[j]).html() + "," }

            }
        }
        debugger;
        jsonData = jsonData.substring(0, string.length - 1);
        jsonData += "}];";
    };
});

app.controller('tilesData', function ($scope, $http) {

    $http.get("http://172.18.66.83:8080/api/risk")
             .success(function (response) {
                 $scope.value = response;
             })
             .error(function (execption, ab, er) {
               
             });

});

app.controller('keyaccom', function ($scope, $http) {
    var newJsonDatakeyacco = [];
    $http.get("http://172.18.66.83:8080/api/weeklystatus")
             .success(function (response) {
                 $.each(response, function (i, item) {

                     if (item.Program_Id == document.getElementById('programid').value) {
                         newJsonDatakeyacco.push({ "WeeklyStatus_Id": item.WeeklyStatus_Id, "KeyAccomplishments": item.KeyAccomplishments, "FuturePlan": item.FuturePlan });

                     }
                    
                 });

                 $scope.value = newJsonDatakeyacco;
             })
             .error(function (execption, ab, er) {
               
             });

    

    $scope.SaveKeyAccomplishments = function (WeeklyStatusId) {
        WeeklyStatusId=1;
        var data = [{ "WeeklyStatus_Id": 1, "Project_Id": 1, "Program_Id": "ESB ", "Project_Name": 1, "Project_Desc": "Member Directed Fill Ahead (MDFA)", "Resource_Id": "MAS", "Resource_Name": "Extract Program Installed in MCPS Production", "Status": "3/3/2016 1:50:40 PM", "KeyAccomplishments": "fdfdfdfd", "KeyIssues": "Low", "FuturePlan": "Mino", "Comments": "McKesson"}];
        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            KeyAccomplishments: '* Hardware requests - Approval completed. * Sprint Cycle 11 - completed * MDFA Application Code review - in progress kkk'
            
        };
        var stringData = JSON.stringify(Weeklystatus);
        //$http.put('api/weeklystatus/', name).success(function (abc) {
        //    alert("Saved Successfully!!");
        //    //frien.editMode = false;
        //    //$scope.loading = false;
        //}).error(function (data) {
        //    //$scope.error = "An Error has occured while Saving customer! " + data;
        //    //$scope.loading = false;
        //});

        //$.ajax({
        //    url: "api/weeklystatus/KeyAccomplishments/",
        //        type: "PUT",
        //        data: abc,
        //        contentType: "application/json;charset=utf-8",
        //        dataType: 'json'
        //    })
          
        
        var urlString = "http://172.18.66.83:8080/api/weeklystatus";

        //switch (id) {
        //    case 'btnAdd':
        //        urlString = urlString + "Add/?" + arg;
        //        break;
        //    case 'btnMinus':
        //        urlString = urlString + "Substract/?" + arg;
        //        break;
        //    case 'btnMultiply':
        //        urlString = urlString + "Multiply/?" + arg;
        //        break;
        //    case 'btnDivide':
        //        urlString = urlString + "Divide/?" + arg;
        //        break;
        //    default:
        //        urlString = urlString + "hello";

        //}

        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };

    $scope.SaveWeeklyFuturePlan = function (WeeklyStatusId) {
        
        WeeklyStatusId = 1;
        
        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            FuturePlan: 'pppp extended timeline for TCoE Testing to be completed by 11/30 -  due to QA1 R5 build Deployment Outage & QA1 SCAL Deployment outage/defects  * Get signoff on the initial UI Enhancement prototype from Business and Product owners - meeting to be scheduled. kkk'

        };
        var stringData = JSON.stringify(Weeklystatus);
        
        var urlString = "http://172.18.66.83:8080/api/WeeklyFuturePlan/";

        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };

    $scope.SaveComments = function (WeeklyStatusId) {
      //  alert('SaveComments');
        WeeklyStatusId = 1;

        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            Comments: 'We need to focus on this project, it is going to be superb success pppppp'

        };
        var stringData = JSON.stringify(Weeklystatus);

        var urlString = "http://172.18.66.83:8080/api/WeeklyComments/";

        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };

    $scope.SaveKeyIssues = function (WeeklyStatusId) {
       // alert('SaveKeyIssues');
        WeeklyStatusId = 1;

        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            KeyIssues: 'US Dev/Test for html5 is being blocked by awaiting delivery of four (4) MS Surface Pro 3 from SCAL HelpDesk  - no ETA  Team requires UI Designer and Developers with Mobil App experience  Need business decision for deployment date regarding new PDX user story needed for Pick-up Now functionality - now included in ePIMS R5.1  kkk'

        };
        var stringData = JSON.stringify(Weeklystatus);

        var urlString = "http://172.18.66.83:8080/api/WeeklyKeyIssues/";

        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };
    //$scope.SavetableAccoData = function timelineData(weeklystatus_id) {
    //    var name = document.getElementById('divKeyAcco').innerText;

    //    var config = {
    //        method: 'PUT',
    //        url: 'api/weeklystatus/' + 1,
    //        params: { KeyAccomplishments: name }
    //    };

    //    return $http(config).success(function (data, status, headers, config) {
    //        return true;
    //    });

    //    //$http.put(serviceURL + 'api/weeklystatus', { KeyAccomplishments: name });

    //    //$.ajax({
    //    //    url: "/api/weeklystatus/KeyAccomplishments/1",
    //    //    type: "POST",
    //    //    data: JSON.stringify(document.getElementById('divKeyAcco').innerText),
    //    //    headers: {
    //    //        "Content-Type": "application/json",
    //    //        "X-HTTP-Method-Override": "PUT"
    //    //    },
    //    //})
    //    //alert(document.getElementById('divKeyAcco').innerText);

    //};


    $scope.SaveMilestone = function (MileStone_Id) {
        MileStone_Id = 26;
        var Milestone_Master = {
            MileStoneId: MileStone_Id,
            Program_Id: '1',
            Project_Id:'0',
            Release: 'MAS',
            Milestone_Description: 'Extract Program Installed in MCPS Production',
            M_Date: '12/15/2018',
            Revised_Date: '12/16/2018',
            Priority: 'hIGH',
            Major_Minor: 'Mino',
            Dependency: 'McKesson',
            Notes:'ash'

        };
        
        var stringData = JSON.stringify(Milestone_Master);
        
        //var urlString = "http://172.18.66.83:8080/api/milestone/";
        var urlString = "/api/MileStone/";
        
        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };

    $scope.DeleteMilestone = function (MileStone_Id) {
        MileStone_Id = 26;
        var Milestone_Master = {
            MileStoneId: MileStone_Id,
            Program_Id: '1',
            Project_Id: '0',
            Release: 'MAS',
            Milestone_Description: 'Extract Program Installed in MCPS Production',
            M_Date: '12/15/2018',
            Revised_Date: '12/16/2018',
            Priority: 'hIGH',
            Major_Minor: 'Mino',
            Dependency: 'McKesson',
            Notes: 'ash'

        };

        var stringData = JSON.stringify(Milestone_Master);

        //var urlString = "http://172.18.66.83:8080/api/milestone/";
        var urlString = "/api/DeleteMilestone/";

        $.ajax({
            url: urlString,
            type: "DELETE",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };
    $scope.UpdateStatus = function (WeeklyStatusId) {
      //  alert('upate');
        WeeklyStatusId = 1;

        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatusId,
            Status: 'G'

        };
        var stringData = JSON.stringify(Weeklystatus);

        //var urlString = "http://172.18.66.83:8080/api/WeeklyProjectStatus/";
        var urlString = "/api/WeeklyProjectStatus/";

        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                //$("#txtResult").val(result);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                //$("#txtResult").val(err.Message)
            }
        });
    };
});