<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Q1_BidDetails.aspx.cs" Inherits="Q1_BidDetails" %>

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
            width: 113px;
        }
        .auto-style3 {
            width: 251px;
        }
        .auto-style4 {
            width: 113px;
            height: 26px;
        }
        .auto-style5 {
            width: 251px;
            height: 26px;
        }
        .auto-style6 {
            height: 26px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label1" runat="server" Text="BID"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_bid" runat="server"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style4">
                    <asp:Label ID="Label2" runat="server" Text="Domain"></asp:Label>
                </td>
                <td class="auto-style5">
                    <asp:TextBox ID="txt_domain" runat="server"></asp:TextBox>
                </td>
                <td class="auto-style6"></td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label3" runat="server" Text="Name"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label4" runat="server" Text="ProjectDuration"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_duration" runat="server"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Label ID="Label5" runat="server" Text="TeamRequired"></asp:Label>
                </td>
                <td class="auto-style3">
                    <asp:TextBox ID="txt_team" runat="server"></asp:TextBox>
                </td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">&nbsp;</td>
                <td class="auto-style3">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:Button ID="btn_insert" runat="server" OnClick="btn_insert_Click" Text="Insert" />
                </td>
                <td class="auto-style3">&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
