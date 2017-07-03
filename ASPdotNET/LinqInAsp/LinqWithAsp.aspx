<%@ Page Language="C#" AutoEventWireup="true" CodeFile="LinqWithAsp.aspx.cs" Inherits="LinqWithAsp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <asp:Button ID="btn_Insert" runat="server" Text="Insert" OnClick="btn_Insert_Click" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="btn_Update" runat="server" Text="Update" OnClick="btn_Update_Click" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="btn_Delete" runat="server" Text="Delete" OnClick="btn_Delete_Click" />
    
    </div>
    </form>
</body>
</html>
