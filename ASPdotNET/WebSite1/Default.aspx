<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 80%;
            height: 28px;
            margin-left: 80px;
            background-color: #ffd800;
        }
        .auto-style2 {
            width: 100%;
            height: 200px;
        }
        .auto-style3 {
            height: 21px;
        }
        .auto-style4 {
            height: 109px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
    </div>
    <table align="center" class="auto-style1">
        <tr>
            <td>
                <img id="imgHeader" alt="" class="auto-style2" src="img/header.png" runat="server"/></td>
        </tr>
        <tr>
            <td class="auto-style3">
                <asp:Menu ID="Menu1" runat="server" Orientation="Horizontal" RenderingMode="Table" Width="100%">
                    <Items>
                        <asp:MenuItem NavigateUrl="~/Default.aspx" Text="Home" Value="Home"></asp:MenuItem>
                        <asp:MenuItem NavigateUrl="~/Login.aspx" Text="About Us" Value="About Us"></asp:MenuItem>
                        <asp:MenuItem NavigateUrl="~/Login.aspx" Text="Contact Us" Value="Contact Us"></asp:MenuItem>
                        <asp:MenuItem NavigateUrl="~/Login.aspx" Text="Code Snippet" Value="Code Snippet"></asp:MenuItem>
                    </Items>
                </asp:Menu>
            </td>
        </tr>
        <tr>
            <td class="auto-style4" style="background-color: #C0C0C0"></td>
        </tr>
        <tr>
            <td>
                <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Button" />
            </td>
        </tr>
    </table>
    </form>
    <p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </p>
</body>
</html>
