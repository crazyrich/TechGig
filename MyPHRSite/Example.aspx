<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Example.aspx.cs" Inherits="Example" %>

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

     <div class="accordian">
    <ul>
      <li>
        <div class="image_title">
          <a href="#">First Image</a>
        </div>
        <a href="#">
          <img src="1.jpg" />
        </a>
      </li>
      <li>
        <div class="image_title">
          <a href="#">Second Image</a>
        </div>
        <a href="#">
          <img src="2.jpg" />
        </a>
      </li>
      <li>
        <div class="image_title">
          <a href="#">Third Image</a>
        </div>
        <a href="#">
          <img src="3.jpg" />
        </a>
      </li>
      <li>
        <div class="image_title">
          <a href="#">Fourth Image</a>
        </div>
        <a href="#">
          <img src="4.jpg" />
        </a>
      </li>
      <li>
        <div class="image_title">
          <a href="#">Fifth Image</a>
        </div>
        <a href="#">
          <img src="4.jpg" />
        </a>
      </li>
    </ul>
  </div>



















    <form id="form1" runat="server">
   
    <!---->
    <div class="container">
  <h2>Modal Example</h2>
  <!-- Trigger the modal with a button -->
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

  <!-- Modal -->

    
     <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Edit Profile</p>
            <div class="row">
                                    <div class="col-lg-6 color5">
                                         Full Name :
                                    </div>
                                    <div class="col-lg-6 ">
                                        <asp:TextBox ID="TextBox1" class="form-control" runat="server"></asp:TextBox>
                                    </div>
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
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
      </div>
  


    </form>



</body>
</html>
