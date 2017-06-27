<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SignUp.aspx.cs" Inherits="SignUp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MyPHR-SignUp</title>
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

        <!--SignUp HEADER -->
        <div class="accordion">
            <div class="row head_sign">
                <img src="images/Sign-up-Here.png" />
            </div>
        </div>
        <!--ENDS SignUp HEADER-->



        <!--SIgn Up DATA-->
         <div class="container"> 
            <!--First Name -->
            <div class="row">
                <div class="col-lg-6">
                    <div class="row img_width">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label1" runat="server" Text=" First Name"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_firstname" class="form-control" required="required" placeholder="Enter First Name" runat="server"></asp:TextBox>
                </div>
            </div>
             <br />
            <!--Last Name-->
             <div class=" row">
                 <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label2" runat="server" Text=" Last Name"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_lastname" class="form-control" required="required" placeholder="Enter Last Name" runat="server"></asp:TextBox>
                </div>
                  
            </div>
              <br />
            <!--Gender-->
             <div class=" row">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label3" runat="server" Text=" Gender"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:RadioButtonList ID="RadioButtonList1" runat="server" RepeatDirection="Horizontal">
                        <asp:ListItem Selected="True">Female &nbsp;</asp:ListItem>
                        <asp:ListItem>Male</asp:ListItem>
                    </asp:RadioButtonList>
                </div>
               
            </div>
            <!--DOB-->
             <br />
             <div class=" row">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label4" runat="server" Text=" Date Of Birth"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <span class="dob_img">
                            <img onclick="" id="dob_img_id"src="images/clock.PNG"/>
                    </span>
                    <asp:Label ID="lbl_dob" runat="server"></asp:Label>
                    <asp:Calendar ID="Calendar1" runat="server" OnSelectionChanged="Calendar1_SelectionChanged" BackColor="White" BorderColor="#3366CC" Font-Names="Verdana" Font-Size="8pt" ForeColor="#003399" Height="200px" Width="220px" BorderWidth="1px" CellPadding="1" DayNameFormat="Shortest">
                        <DayHeaderStyle ForeColor="#336666" Height="1px" BackColor="#99CCCC" />
                        <NextPrevStyle Font-Size="8pt" ForeColor="#CCCCFF" />
                        <OtherMonthDayStyle ForeColor="#999999" />
                        <SelectedDayStyle BackColor="#009999" ForeColor="#CCFF99" Font-Bold="True" />
                        <SelectorStyle BackColor="#99CCCC" ForeColor="#336666" />
                        <TitleStyle BackColor="#003399" Font-Bold="True" Font-Size="10pt" ForeColor="#CCCCFF" Height="25px" BorderColor="#3366CC" BorderWidth="1px" />
                        <TodayDayStyle BackColor="#99CCCC" ForeColor="White" />
                        <WeekendDayStyle BackColor="#CCCCFF" />
                    </asp:Calendar>
                </div>
               
            </div>
             <br />
                     <!--PHONE-->
             <div class=" row ">
                 <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label5" runat="server" Text="Phone"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_phone" runat="server" class="form-control" required="required" placeholder="Phone"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" ControlToValidate="txt_phone" ErrorMessage="Phone number should be of 10 digits!" ValidationExpression="\d{10}" ForeColor="Red">*</asp:RegularExpressionValidator>
                </div>
                 
            </div>
             <br />
                </div>

           
            

             <!--col 2-->
               <div class="col-lg-6 img_width">
                     
            <!--EMAIL-->
             <div class=" row">
                 <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label6" runat="server" Text="Email"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_emailid" runat="server" class="form-control" required="required" placeholder="Email"></asp:TextBox>
                    <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txt_emailid" ErrorMessage="Invalid Email Address!" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" ForeColor="Red">*</asp:RegularExpressionValidator>
                </div>
                 
            </div>
             <br />
            <!--ADDRESS-->
             <div class=" row">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label7" runat="server" Text="Address"></asp:Label>
                </div>
                <div class="col-lg-5">
                   
                     <asp:TextBox ID="txt_address"  class="form-control" required="required" placeholder="Address" runat="server" TextMode="MultiLine" Rows="3"></asp:TextBox>
                    <br />
                     <div class="row">
                        <div class="col-lg-4"><asp:TextBox ID="txt_city"  class="form-control" required="required" placeholder="City" runat="server"></asp:TextBox>
                    </div>
                        <div class="col-lg-4"><asp:TextBox ID="txt_state"  class="form-control" required="required" placeholder="State" runat="server"></asp:TextBox>
                    </div>
                        <div class="col-lg-4"><asp:TextBox ID="txt_country"  class="form-control" required="required" placeholder="Country" runat="server"></asp:TextBox>
                </div>
                    </div>
                    </div>
                  
            </div>
             <br />
               <!--USERNAME-->
             <div class=" row">
                 <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label8" runat="server" Text="Username"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_Username" runat="server" class="form-control" required="required" placeholder="Username"></asp:TextBox>
                </div>
            </div>
             <br />
              <!--PASSWORD-->
             <div class=" row">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label9" runat="server" Text="Password"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_pswd" runat="server" TextMode="Password" class="form-control" required="required" placeholder="Password"></asp:TextBox>
                </div>
            </div>
             <br />
             <!--Confirm PASSWORD-->
             <div class=" row">
                <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label10" runat="server" Text="Confirm Password"></asp:Label>
                </div>
                <div class="col-lg-5">
                    <asp:TextBox ID="txt_cpswd" runat="server" TextMode="Password" class="form-control" required="required" placeholder="Confirm Password"></asp:TextBox>
                </div>
            </div>
             <br />
             <br />
              <!--SELECT type-->
             <div class=" row">
                 <div class="col-lg-1"></div>
                <div class="col-lg-4">
                    <asp:Label ID="Label11" runat="server" Text="Profile Type"></asp:Label>
                </div>
                <div class="col-lg-5">
                     <asp:DropDownList ID="ddl_usertype" runat="server">
                        <asp:ListItem>Doctor</asp:ListItem>
                        <asp:ListItem>Patient</asp:ListItem>
                    </asp:DropDownList>
                </div>
            </div>
                 </div>  
                 </div>         
             <!--SUBMIT BUTTON-->
            
             <br />
            <!-- ENDS container-->
                    <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToCompare="txt_pswd" ControlToValidate="txt_cpswd" ErrorMessage="Password does not match!" ForeColor="Red"></asp:CompareValidator>

        </div>
        <div class="row">
            <div class="col-lg-12">
                
                    <asp:ValidationSummary ID="ValidationSummary1" runat="server" ShowMessageBox="True" Visible="False" />
                     <center><asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Submit" /></center>
                <br />
             </div>
         </div>
        
          <!--FOOTER-->
     <footer class="footer ">
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
