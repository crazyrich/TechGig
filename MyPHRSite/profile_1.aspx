<%@ Page Language="C#" AutoEventWireup="true" CodeFile="profile_1.aspx.cs" Inherits="profile_1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyPHR-Home</title>
    <link href="css/bootstrap.css" rel="stylesheet" />
    <!-- FONTAWESOME STYLE CSS -->
    <link href="css/font-awesome.min.css" rel="stylesheet" />
    <!-- CUSTOM STYLE CSS -->
    <link href="css/styl.css" rel="stylesheet" />
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
                <a class="navbar-brand" href="#XYZ"> <img src="images/unnamed.png" /></a>
            </div>
            <!-- Collect the nav links for toggling -->
            <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="index.aspx">HOME</a>
                    </li>
                    <li><a href="ContactUs.aspx">CONTACT US</a>
                    </li>
                    <li><a href="AboutUs.aspx">ABOUT US</a>
                    </li>
                     <li><a href="FAQ.aspx">FAQ</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <!--End Navigation -->
       
        <%-- <!--STARTS top PROFILE BAR-->
        <div class="container pad_row2">
            <div class="row">
                <ul class="nav nav-tabs">
                    <li role="presentation" ><a href="#"><i class="glyphicon glyphicon-home"></i>&nbsp;Home</a></li>
                    <li role="presentation"><a href="#"><i class="glyphicon glyphicon-user  "></i> &nbsp; Profile</a></li>
                    <li role="presentation"><a href="#"> <i class="glyphicon glyphicon-envelope"></i> Messages<span class="badge">3</span>&nbsp;</a></li>
                </ul>
            </div>
        </div>
        <!--ENDS TOP PROFILE BAR-->--%>
        
        <!--CONTAINER-->
        <div class="container pad_row2">
            <div class="row ">
                <!--LEFT-->
                <div class="col-lg-3">
                  <!--starts top profile image row-->
                    <div class="row b1">
                        <img class="img_wide" src="images/img8.jpg" />
                        <ul>
                            <li class="left_li"><a href="#"><i class="glyphicon glyphicon-home"></i>&nbsp;Home</a></li>
                            <li class="left_li"><a href="#"><i class="glyphicon glyphicon-user  "></i>&nbsp;Profile</a></li>
                            <li class="left_li"><a href="#"> <i class="glyphicon glyphicon-envelope"></i> Messages&nbsp;</a><span class="badge">3</span></li>
                            <li class="left_li"><a href="#"> <i class="glyphicon glyphicon-cog"></i> &nbsp;Settings</a></li>
                        </ul>
                    </div>
                </div>
                <!--LEFT ENDS-->

                <!--RIGHT-->
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-lg-8 pad_left_right">
                           <h3>Joe Tribbiani</h3>
                                <p>
                                    MyPHR is a personal health record service that allows users to create and 
                                    store health records online.MyPHR reduces hospital paperwork—no more signing
                                     up of medical form every time you visit a hospital or clinic. Your MyPHR ID 
                                    allows medical up of medical form every time you visit a hospital or clinic. Your MyPHR ID 
                                    allows medical 
                                </p>

                        </div>
                     
                      
                            <div class="col-lg-4 box_right ">
                                <h4>Basic Details</h4>
                                <div class="row">
                                    <div class="col-lg-6 color5">
                                         Full Name :
                                    </div>
                                    <div class="col-lg-6 "> Joey Francis Tribbiani</div>
                                </div>
                                <br />
                                <div class="row">
                                    <div class="col-lg-6 color5">
                                         Phone :
                                    </div>
                                    <div class="col-lg-6"> 9968754606</div>
                                </div>
                                <br />
                                <div class="row pad_bottom">
                                    <div class="col-lg-6 color5">
                                         Email :
                                    </div>
                                    <div class="col-lg-6"> jft@gmail.com</div>
                                </div>
                                
                            </div>
                        </div>
                </div>
                <!--RIGHT ENDS-->
            </div>
        </div>
        <!--CONTAINER ENDS-->
        <br />
        <!-- starts three column --> 
    
    <div class="container color2">
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

    <!-- ENds three column --> 
  <!--FOOTER-->
    <footer class="footer">
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
