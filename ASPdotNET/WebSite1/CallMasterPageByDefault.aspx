<%@ Page Title="" Language="C#" MasterPageFile="~/sinup.MasterPage.master" AutoEventWireup="true" CodeFile="CallMasterPageByDefault.aspx.cs" Inherits="CallMasterPageByDefault" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .auto-style3 {
            width: 100%;
            background-color: #C0C0C0;
        }
        .auto-style4 {
            width: 149px;
        }
        .auto-style5 {
            width: 149px;
            height: 165px;
        }
        .auto-style6 {
            height: 165px;
        }
        .auto-style7 {
            width: 149px;
            height: 23px;
        }
        .auto-style8 {
            height: 23px;
        }
        .auto-style9 {
            width: 149px;
            height: 119px;
        }
        .auto-style10 {
            height: 119px;
        }
        .auto-style13 {
        width: 323px;
    }
        .auto-style14 {
            height: 119px;
            width: 323px;
        }
        .auto-style15 {
            height: 23px;
            width: 323px;
        }
        .auto-style17 {
            height: 165px;
            width: 323px;
        }
        .auto-style18 {
            width: 149px;
            height: 15px;
        }
        .auto-style19 {
            height: 15px;
            width: 323px;
        }
        .auto-style20 {
            height: 15px;
        }
        .auto-style21 {
            width: 149px;
            height: 25px;
        }
        .auto-style22 {
            height: 25px;
            width: 323px;
        }
        .auto-style23 {
            height: 25px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table class="auto-style3">
        <tr>
            <td class="auto-style4">
                <asp:Label ID="lbl_name" runat="server" Text="Name"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:TextBox ID="txt_name" runat="server"></asp:TextBox>
            </td>
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_name" ErrorMessage="Name is Required !">*</asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style9">
                <asp:Label ID="lbl_age" runat="server" Text="Age"></asp:Label>
            </td>
            <td class="auto-style14">
                <asp:TextBox ID="txt_age" runat="server" MaxLength="2"></asp:TextBox>
            </td>
            <td class="auto-style10">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_age" ErrorMessage="Age is Required !">*</asp:RequiredFieldValidator>
                <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="txt_age" ErrorMessage="Age should be positive and cannot exceed 100 !" MaximumValue="100" MinimumValue="1" Type="Integer">*</asp:RangeValidator>
                <asp:CompareValidator ID="CompareValidator1" runat="server" ControlToValidate="txt_age" ErrorMessage="Invalid !" Operator="DataTypeCheck" Type="Integer">*</asp:CompareValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style7">
                <asp:Label ID="lbl_gender" runat="server" Text="Gender"></asp:Label>
            </td>
            <td class="auto-style15">
                <asp:RadioButton ID="rd_male" runat="server" Checked="True" GroupName="gender" Text="Male" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:RadioButton ID="rd_female" runat="server" GroupName="gender" Text="Female" />
            </td>
            <td class="auto-style8"></td>
        </tr>
        <tr>
            <td class="auto-style18">
                <asp:Label ID="lbl_qual" runat="server" Text="Qualification"></asp:Label>
            </td>
            <td class="auto-style19">
                <asp:DropDownList ID="ddl_qual" runat="server" Width="121px">
                    <asp:ListItem>Select</asp:ListItem>
                    <asp:ListItem>BE</asp:ListItem>
                    <asp:ListItem>ME</asp:ListItem>
                    <asp:ListItem>BCA</asp:ListItem>
                    <asp:ListItem>MCA</asp:ListItem>
                    <asp:ListItem>P.hd</asp:ListItem>
                </asp:DropDownList>
            </td>
            <td class="auto-style20">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" ControlToValidate="ddl_qual" ErrorMessage="Select Qualification" InitialValue="Select">*</asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style5">
                <asp:Label ID="lbl_dob" runat="server" Text="DOB"></asp:Label>
            </td>
            <td class="auto-style17">
                <asp:Label ID="lbl_cal" runat="server" Text="Label"></asp:Label>
&nbsp;
                <asp:ImageButton ID="imgbtn_dob" runat="server" Height="24px" ImageUrl="~/img/Capture.PNG" OnClick="imgbtn_dob_Click" Width="32px" CausesValidation="False" />
                <asp:Calendar ID="cal_dob" runat="server" Height="16px" OnSelectionChanged="cal_dob_SelectionChanged" style="margin-bottom: 0px" Visible="False"></asp:Calendar>
            </td>
            <td class="auto-style6">
                <asp:CustomValidator ID="CustomValidator1" runat="server" ControlToValidate="txt_pwd" ErrorMessage="CustomValidator" OnServerValidate="CustomValidator1_ServerValidate"></asp:CustomValidator>
                <br />
            </td>
        </tr>
        <tr>
            <td class="auto-style21">
                <asp:Label ID="lbl_cellno" runat="server" Text="CellNo"></asp:Label>
            </td>
            <td class="auto-style22">
                <asp:TextBox ID="txt_cellno" runat="server"></asp:TextBox>
            </td>
            <td class="auto-style23">
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txt_cellno" ErrorMessage="enter 10 digit cell no." ValidationExpression="\d{10}">*</asp:RegularExpressionValidator>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator4" runat="server" ControlToValidate="txt_cellno" ErrorMessage="Required Field !">*</asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="lbl_email" runat="server" Text="Email"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:TextBox ID="txt_email" runat="server"></asp:TextBox>
            </td>
            <td>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator2" runat="server" ControlToValidate="txt_email" ErrorMessage="Invaild Email !" ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*">*</asp:RegularExpressionValidator>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator5" runat="server" ControlToValidate="txt_email" ErrorMessage="Required Email">*</asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="lbl_address" runat="server" Text="Address"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:TextBox ID="txt_address" runat="server" Columns="20" Rows="5" TextMode="MultiLine"></asp:TextBox>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="lbl_pwd" runat="server" Text="Password"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:TextBox ID="txt_pwd" runat="server" TextMode="Password"></asp:TextBox>
            </td>
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator6" runat="server" ControlToValidate="txt_pwd" ErrorMessage="Required  !">*</asp:RequiredFieldValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="lbl_repwd" runat="server" Text="Confirm Password"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:TextBox ID="txt_repwd" runat="server" TextMode="Password"></asp:TextBox>
            </td>
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator7" runat="server" ControlToValidate="txt_repwd" ErrorMessage="Re-Enter !">*</asp:RequiredFieldValidator>
                <asp:CompareValidator ID="CompareValidator2" runat="server" ControlToCompare="txt_pwd" ControlToValidate="txt_repwd" ErrorMessage="Not Matching !">*</asp:CompareValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">&nbsp;</td>
            <td class="auto-style13">
                <asp:Button ID="btn_sinup" runat="server" Text="SinUP" Width="131px" OnClick="btn_sinup_Click" />
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style4">&nbsp;</td>
            <td class="auto-style13">&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style4">&nbsp;</td>
            <td class="auto-style13">
                <asp:ValidationSummary ID="ValidationSummary1" runat="server" Height="39px" />
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style4">&nbsp;</td>
            <td class="auto-style13">&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </table>
</asp:Content>

