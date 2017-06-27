<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FAQ.aspx.cs" Inherits="FAQ" %>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>myPHR FAQ </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <link href="css/customcss.css" rel="stylesheet" />


    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="js/bootstrap.min.js"></script>

</head>
<body>


     <nav class="navbar navbar-inverse navbar-fixed-top cust_nav " role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand no_pad" href="#XYZ"> <img src="images/ico.png" /></a>
            </div>
            <!-- Collect the nav links for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="http://localhost:51705/index.aspx">HOME</a>
                    </li>
                    <li><a href="http://localhost:51705/ContactUs.aspx">CONTACT US</a>
                    </li>
                    <li><a href="http://localhost:51705/AboutUs.aspx">ABOUT US</a>
                    </li>
                     <li><a href="http://localhost:51705/FAQ.aspx">FAQ</a>
                    </li>
                    <li class="active"><a href="http://localhost:51705/index.aspx/#login-bar">LOGIN</a>
                    </li>
                     <li class="active"><a href="http://localhost:51705/index.aspx/#login-bar">SIGNUP</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <!--End Navigation -->

    <!-- COntact us Image-->
     <div class="container wid2">
        <div class="row">
                <img class="wid2"src="images/10.jpg" />
        </div>
    </div>    
    <!--starts container-->
        <div class="container">

            <div class="page-header">
                 <h1>myPHR FAQ <small> Frequently Asked Questions</small></h1>
            </div>
        </div>

<!-- Bootstrap FAQ - START -->
<div class="container">
    <br />
     

    <div class="panel-group" id="accordion">
        <div class="faqHeader">General questions</div>
       
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">Q1.Why would I want to keep a PHR?</a>
                </h4>
            </div>
            <div id="collapseOne" class="panel-collapse collapse in">
                <div class="panel-body">
                    With your PHR, you can:
    Knowledgeably discuss your health with healthcare providers
    Provide information to new caregivers
    Have easy access to your health information while traveling
    Access your information when your doctor’s office is closed
    Record your progress toward specific health-related goals
    Refer to physician instructions, prescriptions, allergies, medications, insurance claims, etc.
    Track appointments, vaccinations, and numerous other wellness healthcare services </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">Q2.If I don't have access to a computer can I still keep a PHR?</a>
                </h4>
            </div>
            <div id="collapseTwo" class="panel-collapse collapse">
                <div class="panel-body">
                    Yes. A simple file folder with copies of your health records can be very valuable in documenting your health. Electronic PHRs may be more efficient than paper, especially now that more physicians have moved  to electronic health records, but the important thing is to have a single source of your health information, in whatever format you choose to store it.
                </div>
            </div>
        </div>
        <!---->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">Q3.If I don't have access to a computer can I still keep a PHR?</a>
                </h4>
            </div>
            <div id="collapseThree" class="panel-collapse collapse">
                <div class="panel-body">
                    Yes. A simple file folder with copies of your health records can be very valuable in documenting your health. Electronic PHRs may be more efficient than paper, especially now that more physicians have moved  to electronic health records, but the important thing is to have a single source of your health information, in whatever format you choose to store it.
                </div>
            </div>
        </div>
        <!---->
        <!---->
        <!---->
        <!---->
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">Q4.Should my PHR include emergency contact information?</a>
                </h4>
            </div>
            <div id="collapseFour" class="panel-collapse collapse">
                <div class="panel-body">
                   Yes. For the best possible care in the case of an emergency, you should include emergency contact information in your PHR
                </div>
            </div>
        </div>
</div>
<style>
    .faqHeader {
        font-size: 27px;
        margin: 20px;
    }

    .panel-heading [data-toggle="collapse"]:after {
        font-family: 'Glyphicons Halflings';
        content: "\e072"; /* "play" icon */
        float: right;
        color: #00A9DF;
        font-size: 18px;
        line-height: 22px;
        /* rotate "play" icon from > (right arrow) to down arrow */
        -webkit-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .panel-heading [data-toggle="collapse"].collapsed:after {
        /* rotate "play" icon from > (right arrow) to ^ (up arrow) */
        -webkit-transform: rotate(90deg);
        -moz-transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        -o-transform: rotate(90deg);
        transform: rotate(90deg);
        color: #454444;
    }
</style>

<!-- Bootstrap FAQ - END -->

</div>
<!--FOOTER-->
     <footer class="footer">
        <div class="container">
            <p class="text-muted">
                 <center  class="color4">Copyright  2016 Infogain. All rights reserved</center>
            </p>
        </div>
    </footer>
    <!--Footer ENDs-->

</body>
</html>