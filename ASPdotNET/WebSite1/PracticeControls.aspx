<%@ Page Title="" Language="C#" MasterPageFile="~/sinup.MasterPage.master" AutoEventWireup="true" CodeFile="PracticeControls.aspx.cs" Inherits="PracticeControls" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .auto-style4 {
            width: 100%;
            border: 1px solid #808000;
            background-color: #FFCCCC;
        }
        .auto-style5 {
            width: 200px;
        }
        .auto-style6 {
            width: 481px;
        }
        .auto-style7 {
            width: 200px;
            height: 23px;
        }
        .auto-style8 {
            width: 481px;
            height: 23px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <table class="auto-style4">
        <tr>
            <td class="auto-style5">
                <asp:Label ID="Label1" runat="server" Text="Upload"></asp:Label>
            </td>
            <td class="auto-style6">
                <asp:FileUpload ID="FileUpload1" runat="server" />
&nbsp;&nbsp;&nbsp;&nbsp;
                <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Upload" />
                <asp:Label ID="Label2" runat="server"></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style5">Start Date :</td>
            <td class="auto-style6">End Date :</td>
        </tr>
        <tr>
            <td class="auto-style5">
                <asp:Calendar ID="Calendar1" runat="server" OnDayRender="Calendar1_DayRender" OnSelectionChanged="Calendar1_SelectionChanged" Visible="False"></asp:Calendar>
            </td>
            <td class="auto-style6">
                <asp:Calendar ID="Calendar2" runat="server" OnDayRender="Calendar2_DayRender" OnSelectionChanged="Calendar2_SelectionChanged" Visible="False"></asp:Calendar>
            </td>
        </tr>
        <tr>
            <td class="auto-style5">
                <asp:ImageButton ID="ImageButton1" runat="server" ImageUrl="~/img/Capture.PNG" OnClick="ImageButton1_Click" />
                <asp:Label ID="Label3" runat="server"></asp:Label>
            </td>
            <td class="auto-style6">
                <asp:ImageButton ID="ImageButton2" runat="server" ImageUrl="~/img/Capture.PNG" OnClick="ImageButton2_Click" />
                <asp:Label ID="Label4" runat="server"></asp:Label>
            </td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style5"></td>
            <td class="auto-style6"></td>
        </tr>
        <tr>
            <td class="auto-style7"></td>
            <td class="auto-style8"></td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">
                <asp:AdRotator ID="AdRotator1" runat="server" AdvertisementFile="~/XMLFile.xml" KeywordFilter="a" />
                <asp:XmlDataSource ID="Xml" runat="server"></asp:XmlDataSource>
            </td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">&nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style5">&nbsp;</td>
            <td class="auto-style6">&nbsp;</td>
        </tr>
    </table>
</asp:Content>

