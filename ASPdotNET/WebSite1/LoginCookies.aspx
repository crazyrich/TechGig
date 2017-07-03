<%@ Page Title="" Language="C#" MasterPageFile="~/sinup.MasterPage.master" AutoEventWireup="true" CodeFile="LoginCookies.aspx.cs" Inherits="LoginCookies" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
    .auto-style3 {
        width: 100%;
    }
    .auto-style4 {
        width: 153px;
    }
    .auto-style5 {
        width: 507px;
    }
</style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table class="auto-style3">
    <tr>
        <td class="auto-style4">
            <asp:Label ID="lbl_username" runat="server" Text="UserName"></asp:Label>
        </td>
        <td class="auto-style5">
            <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
        </td>
        <td>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_name" ErrorMessage=" UserID Required ">*</asp:RequiredFieldValidator>
        </td>
    </tr>
    <tr>
        <td class="auto-style4">
            <asp:Label ID="lbl_pass" runat="server" Text="Password"></asp:Label>
        </td>
        <td class="auto-style5">
            <asp:TextBox ID="txt_pass" runat="server"></asp:TextBox>
        </td>
        <td>
            <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_pass" ErrorMessage="Password Required">*</asp:RequiredFieldValidator>
        </td>
    </tr>
    <tr>
        <td class="auto-style4">&nbsp;</td>
        <td class="auto-style5">
            <asp:Button ID="btn_login" runat="server" OnClick="btn_login_Click" Text="Login" />
        </td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="auto-style4">&nbsp;</td>
        <td class="auto-style5">
            <asp:ValidationSummary ID="ValidationSummary1" runat="server" />
        </td>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td class="auto-style4">&nbsp;</td>
        <td class="auto-style5">&nbsp;</td>
        <td>&nbsp;</td>
    </tr>
</table>
</asp:Content>

