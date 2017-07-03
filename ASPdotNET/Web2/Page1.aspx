<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Page1.aspx.cs" Inherits="Page1" %>
<style type="text/css">
    #form1 {
        height: 377px;
    }
</style>
//page object needs to be there ....min property language is required
 
<!DOCTYPE html>

    <form id="form1" runat="server">
        <asp:Label ID="Label1" runat="server" Text="Label" ViewStateMode="Disabled"></asp:Label>
    <div>
    
        <asp:DropDownList ID="DropDownList1" runat="server" Height="42px">
        </asp:DropDownList>
    
    </div>
    </form>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    </body>
</html>
