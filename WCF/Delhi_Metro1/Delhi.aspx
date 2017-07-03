<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Delhi.aspx.cs" Inherits="Delhi" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <p>
        Source Station : 
        <asp:DropDownList ID="DropDownList1" runat="server"></asp:DropDownList>

    </p>
        <p>
            Destination Station :<asp:DropDownList ID="DropDownList2" runat="server">
            </asp:DropDownList>

    </p>
        <p>
            Count :
            <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>

    </p>
        <p>
            <asp:Label ID="Label1" runat="server"></asp:Label>

    </p>
        <p>
            <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" />

    </p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    <p>
        &nbsp;</p>
    </form>
</body>
</html>
