<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cache.aspx.cs" Inherits="Cache" %>
<%@ OutputCache CacheProfile="cachefor20" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:Label ID="Label1" runat="server"></asp:Label>
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" />
    
    &nbsp;&nbsp;<br />
        Id:&nbsp;
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
    
        <br />
    
        <br />
        Name:<asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
    
        <br />
        <br />
        <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True">
            <asp:ListItem>India</asp:ListItem>
            <asp:ListItem>USA</asp:ListItem>
            <asp:ListItem>UK</asp:ListItem>
        </asp:DropDownList>
    
    </div>
    </form>
</body>
</html>
