<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Index.aspx.cs" Inherits="Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyPHR-Home</title>
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
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top cust_nav " role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand no_pad " href="#XYZ"> <img src="images/ico.png" /></a>
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
    <!--Starts Crousel
     <%-- <div class="container wid img_width">
        <div class="row">
                <img class="wid"src="images/Jual-Obat-Aborsi-Banner.jpg" />
        </div>
    </div> --%>
     -->

    <!--starts Accordion-->
   <div class="accordian">
    <ul>
      <li>
        <div class="image_title">
          <a href="index.aspx">Home</a>
        </div>
        <a>
          <img src="images/4.jpg" />
        </a>
      </li>
      <li>
        <div class="image_title">
          <a href="AboutUs.aspx"  >About Us </a>
        </div>
        <span>
          <img src="images/5.jpg" />
        </span>
      </li>
      <li>
        <div class="image_title">
          <a href="ContactUs.aspx" >Contact Us</a>
        </div>
        <span>
          <img src="images/12.jpg" />
        </span>
      </li>
      <li>
        <div class="image_title">
          <a href="FAQ.aspx">FAQ</a>
        </div>
        <span>
          <img src="images/3.jpg" />
        </span>
      </li>
      <li>
        <div class="image_title">
          <a href="#XYZ">Fifth Image</a>
        </div>
        <a href="#XYZ">
          <img src="images/10.jpg" />
        </a>
      </li>
    </ul>
  </div>
  <!--ends accordion-->
    <!--myphr heading-->
    <div class="container">
        <div class="row ">
            <div class="col-lg-12 fix_back2">
               <center><h1>myPHR</h1></center>
                
            </div>
        </div>
    </div>
    <!--myphr heading ends-->
        
       
       
    <form runat="server" id="form1">

    <!--ROW 2 --->
    <div class="container color2">
        <div class="row pad_row ">
            <div class="col-lg-6">
               
                <div class ="row borderR">
                    
                        <img   src="images/18.jpg" />
                    
                   
                </div>
            </div>
            <div class="col-lg-6 pad_top_left">

                 <div class="row pad_row">
                     <div class="col-lg-12">
                        <p>
                            MyPHR is a personal health record service that allows users to create and 
                            store health records online.MyPHR reduces hospital paperwork—no more signing
                             up of medical form every time you visit a hospital or clinic. Your MyPHR ID 
                            allows medical  MyPHR is a personal health record service that allows users to create and 
                            store health records online.
                        </p>
                         <p class="pad_bottom">
                              MyPHR is a personal health record service that allows users to create and 
                            store health records online.MyPHR reduces hospital paperwork—no more signing
                             up of medical form every time you visit a hospital or clinic. Your MyPHR ID 
                            allows......
                         </p>
                        <center><asp:LinkButton ID="LinkButton1"   class="btn btn-default "  runat="server" CausesValidation="False" PostBackUrl="~/AboutUs.aspx">More Info</asp:LinkButton></center>
                    </div>
                  </div>
            </div>
         
        </div>
    </div>
    <!--MIDDLE IMAGE-->
   
    <div class="container" id="login-bar">
        <div class="row ">
            <div class="col-lg-12 no_pad">
                <img class="wide fix_back1 for-full-back2 " />
            </div>
               <div class="col-lg-12 wid">
                 <h2> Already Have Account?</h2>
                   
                
                   <asp:TextBox ID="txt_username" class="form-control" placeholder="Enter Username" required="required" runat="server"></asp:TextBox>
                  <br/>
                   
                        <asp:TextBox ID="txt_password" class="form-control" placeholder="Enter Password" required="required" runat="server"></asp:TextBox>
                   <br/>
                        <asp:Button ID="btn_login" class="btn btn-default" runat="server" Text="Login" OnClick="btn_login_Click" />
                  
                        <span>
                            <a class="link_color" href="SignUp.aspx">New User?</a>
                        </span>

               </div> 
                   
        </div>
         
    </div>     
        
    
    <!--ENDS MIDDLE IMAGE-->
    <!--ROW 2 ENDS -->

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

    <!--FOOTER-->
    <footer class="footer">
        <div class="container">
            <p class="text-muted">
                 <center class="color4">Copyright  2016 Infogain. All rights reserved</center>
            </p>
        </div>
    </footer>
    <!--Footer ENDs-->
 </form>

</body>
</html>