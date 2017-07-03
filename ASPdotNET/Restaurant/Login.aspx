<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
            height: 120px;
            background-color: #FF9999;
        }
        .auto-style2 {
            width: 114px;
        }
        .auto-style3 {
            width: 114px;
            height: 48px;
        }
        .auto-style4 {
            height: 48px;
        }
    </style>
</head>
<body style="height: 27px">
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style3">LOGIN </td>
                <td class="auto-style4"></td>
                <td class="auto-style4"></td>
            </tr>
            <tr>
                <td class="auto-style2">UserName :</td>
                <td>
                    <asp:TextBox ID="txt_username" runat="server"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">Password :</td>
                <td>
                    <asp:TextBox ID="txt_password" runat="server"></asp:TextBox>
                    <br />
                    <br />
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Login" />
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
