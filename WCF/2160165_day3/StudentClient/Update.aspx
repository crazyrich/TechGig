<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Update.aspx.cs" Inherits="Update" %>

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
            width: 182px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">Enter ID :</td>
                <td>
                    <asp:TextBox ID="txt_ID" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Student Name :</td>
                <td>
                    <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Student CLass: </td>
                <td>
                    <asp:TextBox ID="txt_class" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Student Course :</td>
                <td>
                    <asp:TextBox ID="txt_course" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Update" />
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
