<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ContactUs.aspx.cs" Inherits="ContactUs" %>

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
                <img class="wid2"src="images/4.jpg" />
        </div>
    </div>   
         <!--myphr heading-->
    <div class="container">
        <div class="row ">
            <div class="col-lg-12 fix_back2">
               <center><h1>Contact Us</h1></center>
                
            </div>
        </div>
    </div>
       
    <!--myphr heading ends--> 
    
    <!-- Contact us Data--> 
    <div class="container color2">
        <div class="row pad_row">
            <div class="col-lg-8">
                <div class="alert alert-success" role="alert">
                   <div class="row">
                       <div class="col-lg-6">
                           <br />
                           <div class="form-group">
                               <asp:TextBox ID="txt_name" class="form-control" required="required" placeholder="Enter NAME" runat="server"></asp:TextBox>
                           </div>
                            <br/>
                           <div class="form-group">
                                    <asp:TextBox ID="TextBox1" class="form-control" runat="server" required="required" placeholder="Email Address"></asp:TextBox>
                            </div>
                           <br/>
                           <div class="form-group">
                               <asp:TextBox ID="TextBox2" runat="server" class="form-control" required="required" placeholder="Subject" ></asp:TextBox>
                           </div>
                           <br/>
                       </div>
                       <div class="col-lg-6">
                           <br />
                           <div class="form-group">
                               <asp:TextBox ID="TextBox3" runat="server" TextMode="MultiLine"  required="required" class="form-control" rows="5" placeholder="Message"></asp:TextBox>
                           </div>
                           <div class="form-group">
                               <asp:Button ID="Button1" runat="server" Text="Submit Request " class="btn btn-primary"  type="submit" />
                           </div>
                       </div>
                           

                   </div>
                </div>
            </div>
            <div class="col-lg-4">
                <h3>
                    <i class="glyphicon glyphicon-globe">
                    <span class="font1">OUR LOCATION</span> 
                </i>
                </h3>
               
                        <span><i class="fa fa-home"></i>&nbsp; Address: Noida</span>
                        <br>
                        <br>
                        <span><i class="fa fa-phone"></i>&nbsp;Phone: 82-230-567-899</span>
                        <br>
                        <br>
                        <span><i class="fa fa-envelope-o"></i>&nbsp;E-Mail: info@infogain.com</span>
                        <br>
                        <br>                       
                        <span><i class="fa fa-globe"></i>&nbsp;Web: www.infogain.com</span>
                        <br> <br>
                
            </div>
        </div>
        </div>
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
