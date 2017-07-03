<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Calculator.aspx.cs" Inherits="Calculator" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        Enter Number1 :&nbsp;&nbsp;&nbsp;
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <br />
        <br />
        Enter Num2 :&nbsp;&nbsp;&nbsp;
        <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
        <br />
        <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
        <br />
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="+" />
    
    </div>
    </form>
</body>
</html>
