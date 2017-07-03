<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
            background-color: #C0C0C0;
        }
        .auto-style2 {
            width: 122px;
        }
        .auto-style3 {
            width: 171px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label1" runat="server" Text="USERNAME"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_username" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_username" ErrorMessage="*"></asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label2" runat="server" Text="PASSWORD"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_password" runat="server"></asp:TextBox>
                </td>
                <td>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_password" ErrorMessage="*"></asp:RequiredFieldValidator>
                    <asp:CustomValidator ID="CustomValidator1" runat="server" ErrorMessage="Password Should have a UpperCase Character,Symbol  and Digit"></asp:CustomValidator>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Button ID="btn_login" runat="server" OnClick="btn_login_Click" Text="Login" />
                </td>
                <td class="auto-style3">
                    <asp:Button ID="btn_SignUp" runat="server" CausesValidation="False" OnClick="btn_SignUp_Click" Text="SignUp" />
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
