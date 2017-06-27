<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DoctorProfile.aspx.cs" Inherits="DoctorProfile" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .auto-style1 {
            width: 100%;
        }
        .auto-style2 {
            width: 940px;
            height: 250px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <img alt="" class="auto-style2" src="Myphr_img/Jual-Obat-Aborsi-Banner.jpg" /><br />
        <table class="auto-style1">
            <tr>
                <td>Speciality In</td>
                <td>
                    <asp:DropDownList ID="ddl_speciality" runat="server">
                        <asp:ListItem Selected="True">Select</asp:ListItem>
                        <asp:ListItem>Eye</asp:ListItem>
                        <asp:ListItem>Child</asp:ListItem>
                        <asp:ListItem>Ortho</asp:ListItem>
                    </asp:DropDownList>
                </td>
            </tr>
            <tr>
                <td>Years Of Experience:</td>
                <td>
                    <asp:TextBox ID="txt_experience" runat="server"></asp:TextBox>
                    <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_experience" ErrorMessage="Enter Experience..!!" ForeColor="Red">*</asp:RequiredFieldValidator>
                </td>
            </tr>
            <tr>
                <td>Upload Certification:</td>
                <td>
                    <asp:FileUpload ID="FileUpload1" runat="server" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <asp:Button ID="btn_upload" runat="server" OnClick="btn_upload_Click" Text="Upload" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label>
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
            <tr>
                <td>View Patient Medical History:</td>
                <td>
                    <asp:TextBox ID="txt_ViewMedHisByDoc" runat="server"></asp:TextBox>
                    <asp:Button ID="btn_ViewMedHisByDoc" runat="server" OnClick="btn_ViewMedHisByDoc_Click" Text="View" />
                </td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    &nbsp;</td>
            </tr>
        </table>
    </form>
</body>
</html>
