<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Insert.aspx.cs" Inherits="Insert" %>

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
            width: 139px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">Enter Product ID :</td>
                <td>
                    <asp:TextBox ID="txt_id" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Enter Product Name : </td>
                <td>
                    <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Enter Price : </td>
                <td>
                    <asp:TextBox ID="txt_price" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">Enter Units : </td>
                <td>
                    <asp:TextBox ID="txt_uints" runat="server"></asp:TextBox>
                </td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Insert" Width="124px" />
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
