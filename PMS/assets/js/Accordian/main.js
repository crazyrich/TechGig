


function makeTabs(selector) {

    tab_lists_anchors = document.querySelectorAll(selector + " li a");
    divs = document.querySelector(selector).getElementsByTagName("div");
    for (var i = 0; i < tab_lists_anchors.length; i++) {
        if (tab_lists_anchors[i].classList.contains('active')) {
            divs[i].style.display = "block";
        }

    }

    for (i = 0; i < tab_lists_anchors.length; i++) {

        document.querySelectorAll(".tabs li a")[i].addEventListener('click', function (e) {

            for (i = 0; i < divs.length; i++) {
                divs[i].style.display = "none";
            }

            for (i = 0; i < tab_lists_anchors.length; i++) {
                tab_lists_anchors[i].classList.remove("active");
            }

            clicked_tab = e.target || e.srcElement;

            clicked_tab.classList.add('active');
            div_to_show = clicked_tab.getAttribute('data-target');

            document.querySelector(div_to_show).style.display = "block";

        });
    }

}


$(document).on("click", ".cls-keyAcc", function () {


    $("#pKeyText").attr("contenteditable", "true");
    $(".cls-keyAcc-save").removeClass("hide");
    $(".cls-keyAcc-cancel").removeClass("hide");
    $(".cls-keyAcc").addClass("hide");


   
});
function ResetKeyButton() {

    $(".cls-keyAcc-save").removeClass("show");
    $(".cls-keyAcc-save").addClass("hide");
    $(".cls-keyAcc-cancel").addClass("hide");
    $(".cls-keyAcc").removeClass("hide");
    $("#pKeyText").removeAttr("contenteditable");

}

$(document).on("click", ".cls-keyFuture", function () {


    $("#pNextStepText").attr("contenteditable", "true");
    $(".cls-keyFuture-save").removeClass("hide");
    $(".cls-keyFuture-cancel").removeClass("hide");
    $(".cls-keyFuture").addClass("hide");



});


function ResetNextPlanButton() {

    $(".cls-keyFuture-save").removeClass("show");
    $(".cls-keyFuture-save").addClass("hide");
    $(".cls-keyFuture-cancel").addClass("hide");
    $(".cls-keyFuture").removeClass("hide");
    $("#pNextStepText").removeAttr("contenteditable");

}
