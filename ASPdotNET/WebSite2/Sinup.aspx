<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Sinup.aspx.cs" Inherits="Sinup" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 80%;
            border: 1px solid #CCCCFF;
            background-color: #C0C0C0;
        }
        .auto-style2 {
            width: 300px;
            height: 348px;
        }
        .auto-style3 {
            width: 262px;
        }
        .auto-style10 {
            width: 262px;
            height: 102px;
        }
        .auto-style11 {
            height: 102px;
        }
        .auto-style16 {
            width: 64px;
        }
        .auto-style17 {
            height: 102px;
            width: 64px;
        }
        .auto-style20 {
            width: 262px;
            height: 126px;
        }
        .auto-style21 {
            height: 126px;
            width: 64px;
        }
        .auto-style22 {
            height: 126px;
        }
        .auto-style23 {
            width: 262px;
            height: 115px;
        }
        .auto-style24 {
            height: 115px;
            width: 64px;
        }
        .auto-style25 {
            height: 115px;
        }
    </style>
</head>
<body style="height: 375px">
    <form id="form1" runat="server">
        <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;</p>
        <table border="1" class="auto-style1">
            <tr>
                <td class="auto-style3">
                    <img alt="" class="auto-style2" src="img/1.png" /></td>
                <td class="auto-style16">&nbsp;</td>
                <td>&nbsp;&nbsp;&nbsp; &nbsp;<asp:Label ID="Label5" runat="server" ForeColor="Black" Text="SINUP"></asp:Label>
                </td>
            </tr>
            <tr>
                <td class="auto-style10">
                    <asp:Label ID="Label1" runat="server" Text="FirstName"></asp:Label>
&nbsp;
                    <asp:TextBox ID="TextBox1" runat="server" Width="116px"></asp:TextBox>
                </td>
                <td class="auto-style17">
                    <asp:Label ID="Label3" runat="server" Text="Location"></asp:Label>
                </td>
                <td class="auto-style11">
                    <asp:DropDownList ID="DropDownList1" runat="server" style="margin-left: 1px">
                        <asp:ListItem>Noida</asp:ListItem>
                        <asp:ListItem>New Delhi</asp:ListItem>
                        <asp:ListItem>Chandigarh</asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td class="auto-style20">
                    <asp:Label ID="Label2" runat="server" Text="LastName"></asp:Label>
                    <asp:TextBox ID="TextBox2" runat="server"></asp:TextBox>
                </td>
                <td class="auto-style21">
                    <asp:Label ID="Label4" runat="server" Text="Gender"></asp:Label>
                </td>
                <td class="auto-style22">
                    <asp:RadioButtonList ID="RadioButtonList1" runat="server" Width="136px">
                        <asp:ListItem>Male</asp:ListItem>
                        <asp:ListItem>Female</asp:ListItem>
                    </asp:RadioButtonList>
                </td>
            </tr>
            <tr>
                <td class="auto-style23">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Button ID="Button1" runat="server" BackColor="#FFCC99" Font-Bold="False" Font-Size="X-Large" Height="73px" Text="SINUP" Width="174px" />
                </td>
                <td class="auto-style24"></td>
                <td class="auto-style25">&nbsp;&nbsp;<asp:Button ID="Button2" runat="server" BackColor="#FFCC99" Font-Size="X-Large" Height="63px" style="margin-top: 0px" Text="RESET" Width="154px" />
                </td>
            </tr>
            <tr>
                <td class="auto-style3">
                    <img alt="" class="auto-style2" src="img/1.png" /></td>
                <td class="auto-style16">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    </form>
</body>
</html>
