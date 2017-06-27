<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AboutUs.aspx.cs" Inherits="AboutUs" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
     <title>MyPHR-SignUp</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <!-- FONTAWESOME STYLE CSS -->
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <!-- CUSTOM STYLE CSS -->
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/customcss.css" rel="stylesheet" />
    <!-- CORE JQUERY  -->
    <script src="js/jquery-1.10.2.js"></script>
    <!-- BOOTSTRAP CORE SCRIPT   -->
    <script src="js/bootstrap.js"></script>
    <!-- CUSTOM SCRIPTS -->
    <script src="js/custom.js"></script>
</head>
<body>
    <form id="form1" runat="server">
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

         <!---->
   <div class="container wid2">
        <div class="row">
                <img class="wid2"src="images/5.jpg" />
        </div>
    </div>    

    <!--STARTS ABOUT DATA-->

        <div class="container ">
            <div class="row text-center">
                <div class="col-md-8 col-md-offset-2">
                    <h1>ABOUT US</h1>
                    <h4 class="color_grey">
                       MyPHR is a personal health record service that allows users to 
                        create and store health records online.
                    </h4>
                </div>
            </div>
            <div class="row text-center">
                <div class="col-md-12">
                    <h2>Personal health record service</h2>
                    <p>
                        The American Health Information Management Association (AHIMA) is a national non-profit 
                        professional association, founded in 1928, dedicated to the effective management of personal 
                        health information needed to deliver quality healthcare to the public.
                        AHIMA’s 71,000+ members are health information management professionals who specialize in
                         managing and protecting your personal health information and medical records in hospitals,
                         doctors’ offices, and other healthcare settings.
                       
                       Health information management professionals care for your
                         health by caring for your health information. Their job is to make sure that all the medical
                         information collected about you is complete, accurate, and protected, yet, readily available
                         for your healthcare providers when it’s needed.
                        </p>
                   <p>
                        AHIMA’s vision and values have always been people-centered. After all, the goal of effective 
                        HIM is to provide quality healthcare to the public. As part of our mission to serve as a 
                        resource for the public, AHIMA is working to help individuals become better managers of their
                         own personal health information by sponsoring a public service initiative that draws upon the 
                        unique expertise of AHIMA and its members.
                    
                        Personal health information is a valuable resource to individuals, their families, and the 
                        doctors, nurses, and other healthcare professionals who provide treatment and care. HIM 
                        professionals are reaching out—at the community level—to share their knowledge of health 
                        information and medical records directly with the public in order to help them better 
                        understand and manage their personal health information and thus improve the quality of care 
                        they receive.
                       </p>

                </div>

            </div>
            <div class="row text-center space-pad">
                <div class="col-md-3  ">

                    <div class="about-div color2 img_width">

                        <i class="fa fa-camera fa-4x color-blue"></i>
                        <h3>30+ Clients </h3>
                    </div>

                </div>
                <div class="col-md-3 ">

                    <div class="about-div color2 img_width">

                        <i class="fa fa-briefcase fa-4x color-blue"></i>


                        <h3>90+ Projects  </h3>
                        

                    </div>

                </div>
                <div class="col-md-3 ">

                    <div class="about-div color2 img_width">

                        <i class="fa fa-desktop fa-4x color-blue"></i>


                        <h3>40+ Offices </h3>
                        

                    </div>

                </div>
                <div class="col-md-3 ">

                    <div class="about-div color2 img_width">

                        <i class="fa fa-folder fa-4x color-blue"></i>


                        <h3>10+ Countries </h3>
                      

                    </div>

                </div>
            </div>
            
        </div>




        <!--THREE TIRE -->
         <!--ROW 2 ENDS -->

    <div class="container ">
        <div class="row pad_row">
            <div class="col-lg-4 borderR">
                <h3>Useful links</h3>
                 <ul>
                   <li class="line_bottom">Curabitur euismod risus vitaesl facilisis vitae</li>
                   <li class="line_bottom">Aenean sed nunc id metus pulvinar rutrum</li>
                   <li class="line_bottom">Fusce vitae ante nisi, eleifend lobortis diam</li>
                 </ul>
            </div>
            <div class="col-lg-4 borderR">
                <h3>Follow us</h3>
              <div class="row">
                  <div class="col-lg-3">
                      <span class="pad_follow_us">
                          <a href="#XYZ">
                         <i class="fa fa-twitter">
                         </i>
                             </a>
                         
                      </span>
                  </div>
                   <div class="col-lg-3">
                       <span class="pad_follow_us">
                           <a href="#XYZ">
                                <i class="fa fa-facebook"></i>
                           </a>
                       </span>
                  </div>
                   <div class="col-lg-3">
                         <span class="pad_follow_us">
                         <a href="#XYZ">
                             <i class="fa fa-linkedin"></i>
                         </a>
                         </span>
                  </div>
                  <div class="col-lg-3">
                         <span class="pad_follow_us">
                             <a href="#XYZ">
                                <i class="fa fa-instagram"></i>
                             </a>
                         </span>
                  </div>
              </div>
             <br/>
            </div>
            <div class="col-lg-4 ">
                <h3>FAQ</h3>
                 <ul>
                   <li class="line_bottom">Curabitur euismod risus vitaesl facilisis vitae</li>
                   <li class="line_bottom">Aenean sed nunc id metus pulvinar rutrum</li>
                   <li class="line_bottom">Fusce vitae ante nisi, eleifend lobortis diam</li>
                 </ul>
            </div>
        </div>
        </div>
<!--ENDS THREE TIRE-->




         <!--FOOTER-->
     <footer class="footer ">
        <div class="container">
            <p class="text-muted">
                 <center  class="color4">Copyright  2016 Infogain. All rights reserved</center>
            </p>
        </div>
    </footer>
    <!--Footer ENDs-->
    </form>
</body>
</html>
