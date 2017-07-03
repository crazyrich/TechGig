<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="TakeOrder.aspx.cs" Inherits="TakeOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .auto-style3 {
            width: 100%;
            background-color: #C0C0C0;
        }
        .auto-style4 {
            width: 119px;
        }
        .auto-style5 {
            width: 236px;
        }
        .auto-style6 {
            width: 119px;
            height: 30px;
        }
        .auto-style7 {
            width: 236px;
            height: 30px;
        }
        .auto-style8 {
            height: 30px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table class="auto-style3">
        <tr>
            <td class="auto-style4">
                <asp:Label ID="Label1" runat="server" Text="Item Name"></asp:Label>
            </td>
            <td class="auto-style5">
                <asp:DropDownList ID="ddl_items" runat="server" OnSelectedIndexChanged="ddl_items_SelectedIndexChanged">
                </asp:DropDownList>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="Label2" runat="server" Text="Quantity"></asp:Label>
            </td>
            <td class="auto-style5">
                <asp:TextBox ID="txt_quant" runat="server"></asp:TextBox>
            </td>
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_quant" ErrorMessage="Quantity Required !"></asp:RequiredFieldValidator>
                <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="txt_quant" ErrorMessage="Invalid Quantity !" MaximumValue="100" MinimumValue="1" Type="Integer"></asp:RangeValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="Label3" runat="server" Text="CustomerName"></asp:Label>
            </td>
            <td class="auto-style5">
                <asp:TextBox ID="txt_name" runat="server" OnTextChanged="TextBox2_TextChanged"></asp:TextBox>
            </td>
            <td>
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_name" ErrorMessage="Name Required !"></asp:RequiredFieldValidator>
                <asp:CustomValidator ID="CustomValidator1" runat="server" ControlToValidate="txt_name" ErrorMessage="Invalid Name !" OnServerValidate="CustomValidator1_ServerValidate"></asp:CustomValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style4">
                <asp:Label ID="Label4" runat="server" Text="Contact Number"></asp:Label>
            </td>
            <td class="auto-style5">
                <asp:TextBox ID="txt_contact" runat="server"></asp:TextBox>
            </td>
            <td>
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txt_contact" ErrorMessage="Enter 10 Digit Phone #  !" ValidationExpression="\d{10}"></asp:RegularExpressionValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style6">
                <asp:Button ID="btn_saveOrder" runat="server" OnClick="btn_saveOrder_Click" Text="Save Order" />
            </td>
            <td class="auto-style7">
                <asp:TextBox ID="txt_totalbill" runat="server" Visible="False"></asp:TextBox>
            </td>
            <td class="auto-style8"></td>
        </tr>
    </table>
</asp:Content>

