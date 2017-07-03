<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AJAXPage1.aspx.cs" Inherits="AJAXPage1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
            background-color: #99CCFF;
        }
        .auto-style2 {
            height: 41px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    
        <table class="auto-style1">
            <tr>
                <td>
                    <asp:ScriptManager ID="ScriptManager1" runat="server">
                    </asp:ScriptManager>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td class="auto-style2">
                    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
                        <ContentTemplate>
                            <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Text="Inside Update Panel" />
                            &nbsp;&nbsp;&nbsp;
                            <asp:Label ID="Label2" runat="server" Text="Label"></asp:Label>
                            <asp:Button ID="Button4" runat="server" Text="trigger" />
                            &nbsp;trigger will update conditional update panel also<asp:Button ID="Button5" runat="server" Text="Button" />
                            <br />
                        </ContentTemplate>
                       
                        <Triggers>
                            <asp:PostBackTrigger ControlID="Button5" />
                        </Triggers>
                       
                    </asp:UpdatePanel><br />
                    <asp:UpdatePanel ID="UpdatePanel2" runat="server" UpdateMode="Conditional">
                        <ContentTemplate>
                            <asp:Button ID="Button3" runat="server" OnClick="Button2_Click" Text="Inside Update Panel 2" />
                            &nbsp;&nbsp;&nbsp;
                            <asp:Label ID="Label3" runat="server" Text="Label"></asp:Label>
                            &nbsp;this is condtional block<br />
                        </ContentTemplate>
                         <Triggers>
                            <asp:AsyncPostBackTrigger ControlID="Button4" EventName="Click" />
                        </Triggers>
                    </asp:UpdatePanel>
                </td>
            </tr>
            <tr>
                <td>
                    <asp:Button ID="Button1" runat="server" Text="Outside Update Panel" OnClick="Button1_Click" />
&nbsp;&nbsp;&nbsp;&nbsp;
                    <asp:Label ID="Label1" runat="server" Text="Label"></asp:Label>
                    <br />
                    <br />
                    <br />
                    <asp:UpdateProgress ID="UpdateProgress1" runat="server" AssociatedUpdatePanelID="UpdatePanel1">
                        <ProgressTemplate>
                            Updating............
                        </ProgressTemplate>
                    </asp:UpdateProgress>
                    <br />
                    <br />
                </td>
            </tr>
        </table>
    
    </div>
    </form>
</body>
</html>
