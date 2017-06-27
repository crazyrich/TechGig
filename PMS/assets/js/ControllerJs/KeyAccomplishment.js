app.controller('keyaccom', ['$rootScope', '$scope', '$http', 'ProgrammeSrv','$sce', function ($rootScope, $scope, $http, ProgrammeSrv,$sce) {

    $scope.models = {
        KeyAccomplishments: "",
        NextStep: "",
        PreviousAccomplishments: []
    }

    $scope.helperMethods = {
        BindKeyAccomplished: function (PID)
        {
            PID = document.getElementById('weeklyStatusID').value;
			tinymce.get('txtKeyAccom').setContent('');
          
            $("#txtKeyAccom").val("");
         

            $scope.models.KeyAccomplishments = "";
			var preWeek = -1;
            ProgrammeSrv.getAllKeyAccomplishment(PID).then(function (successResponse) {
                arrKeyAccom = [];
                $scope.models.PreviousAccomplishments = [];
                $.each(successResponse, function (indx, item) {
                    if (item.Status == 'CurrentWeek') {
                        $scope.models.KeyAccomplishments = $sce.getTrustedHtml(item.KeyAccomplishments);
						 preWeek = (parseInt(item.WeekNumber) -1);
                         //$("#txtKeyAccom").val(item.KeyAccomplishments);
						 tinymce.get('txtKeyAccom').setContent(item.KeyAccomplishments);
                         // $("#txtNextStep").val(item.FuturePlan);
                         tinymce.get('txtKeyAccom').setContent(item.KeyAccomplishments);
                       // $("#txtNextStep").val(item.FuturePlan);
                         tinymce.get('txtNextStep').setContent(item.FuturePlan);
                         $scope.models.NextStep = item.FuturePlan;

                    }
                    else
                    {
                       // $scope.models.PreviousAccomplishments.push(item.KeyAccomplishments);
					     if (parseInt(item.WeekNumber) == preWeek)
                        {
                            $scope.models.PreviousAccomplishments.push(item.KeyAccomplishments);
                        }
                        arrKeyAccom.push({ "KeyAccomplishment": item.KeyAccomplishments, "TrDate": item.TRDATE, "WeekNumber": item.WeekNumber, "NextStep": item.FuturePlan });
                    }
                });

                BindCalederCombos();
                ShowPreviousWSR("0", "0", "0");
            }, function (failureResponse) {
               // alert("Unexcpected error occured in KeyAccomplish => BindKeyAccomplished();  !!")
            });

        }
    }

    $scope.SavetableAccoData = function timelineData(weeklystatus_id) {

        $.ajax({
            url: "api/weeklystatus/KeyAccomplishments/" + weeklystatus_id,
            type: "POST",
            data: JSON.stringify(document.getElementById('divKeyAcco').innerText),
            headers: {
                "Content-Type": "application/json",
                "X-HTTP-Method-Override": "PUT"
            },
        })

    };

    $scope.$on('handleBroadcast', function (event, args) {
       
        $scope.helperMethods.BindKeyAccomplished(args.GlobalId);

    });

}]);

function SaveKeyAccomplishments() {

    WeeklyStatus_Id = document.getElementById('weeklyStatusID').value;
	
	  var editorKeyValue = tinymce.get('txtKeyAccom').getContent();
   
    setTimeout(doSomething, 1000);
    function doSomething() {

        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatus_Id,
            KeyAccomplishments: editorKeyValue

        };
        var stringData = JSON.stringify(Weeklystatus);
        var urlString = "api/weeklystatus";
        //var urlString = "http://172.18.66.83:8080/api/weeklystatus";
        $.ajax({
            url: urlString,
            type: "PUT",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                angular.element(document.getElementById('dvKeyAccom')).scope().helperMethods.BindKeyAccomplished(0); 
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("Error in Saving Key Accomplishmnet >> doSomething() >> " + xhr.responseText);
            },
            complete: function () {
               
            }
        });

    };
};



function SaveWeeklyFuturePlan() {

    WeeklyStatus_Id = document.getElementById('weeklyStatusID').value;
	
	  var edtFutureVal = tinymce.get('txtNextStep').getContent();

    setTimeout(doSomething, 1000);

    function doSomething() {
        var Weeklystatus = {
            WeeklyStatus_Id: WeeklyStatus_Id,
            FuturePlan: edtFutureVal

        };
        var stringData = JSON.stringify(Weeklystatus);

        var urlString = "api/WeeklyFuturePlan/";
        //var urlString = "http://172.18.66.83:8080/api/WeeklyFuturePlan/";

        $.ajax({
            url: urlString,
            type: "POST",
            data: stringData,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function (result) {
                angular.element(document.getElementById('dvKeyAccom')).scope().helperMethods.BindKeyAccomplished(0);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                console.log("Error in Saving Key Accomplishmnet >> doSomething() >> " + xhr.responseText);
            }
        });

    };

};

function ShowPreviousWSR(forYear, forMonth, forWeek)
{

    var KeyElement = $("#dvpreKeyAccom");
    var NextStepElement = $("#dvpreNextStep");
    KeyElement.html('No Record Found !!');
    NextStepElement.html('No Record Found !!');
    if (forMonth.length == 1)
    {
        forMonth = "0" + forMonth;
    }

    if (arrKeyAccom.length > 0) {
        if (forYear == '0' && forMonth == '00' && forWeek == '0') {
            KeyElement.html(arrKeyAccom[0].KeyAccomplishment);
            NextStepElement.html(arrKeyAccom[0].NextStep);
        }
        else {
            $.each(arrKeyAccom, function (index, itm) {

                var MyDate = new Date(itm.TrDate);
                var myYear = MyDate.getFullYear();
                if ((forMonth == monthFormated(MyDate)) && (forWeek == itm.WeekNumber) && (forYear == myYear)) {
                    KeyElement.html(itm.KeyAccomplishment);
                    NextStepElement.html(itm.NextStep);
                }

            });
        }
    }
}

function OpenPreviousWSR()
{
    var selYear = $("#keyYear").val();
    var SelWeek =  $("#keyWeek").val();
    var SelMonth = $("#keyMonth").val();
    ShowPreviousWSR(selYear, SelMonth, SelWeek);

}

function SaveCurrentWSR()
{
    SaveKeyAccomplishments();
    SaveWeeklyFuturePlan();
    $("#closeKeyMdl").triger
  
    CloseWsr();
}

function CloseWsr()
{
    $("#closeKeyMdl").trigger('click');
}
