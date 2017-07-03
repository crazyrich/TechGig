<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="TakeOrder.aspx.cs" Inherits="TakeOrder" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
    <style type="text/css">
        .auto-style5 {
            width: 64px;
        }
        .auto-style11 {
            width: 100%;
            background-color: #008080;
        }
        .auto-style12 {
            height: 57px;
            width: 284px;
        }
        .auto-style13 {
            width: 388px;
            height: 57px;
        }
        .auto-style14 {
            height: 28px;
            width: 284px;
        }
        .auto-style15 {
            width: 388px;
            height: 28px;
        }
        .auto-style16 {
            height: 29px;
            width: 284px;
        }
        .auto-style17 {
            width: 388px;
            height: 29px;
        }
        .auto-style18 {
            height: 10px;
            width: 284px;
        }
        .auto-style19 {
            width: 388px;
            height: 10px;
        }
        .auto-style20 {
            height: 57px;
            width: 100px;
        }
        .auto-style21 {
            height: 28px;
            width: 100px;
        }
        .auto-style22 {
            height: 29px;
            width: 100px;
        }
        .auto-style23 {
            height: 10px;
            width: 100px;
        }
        .auto-style24 {
            width: 100px;
        }
        .auto-style25 {
            width: 388px;
        }
        .auto-style26 {
            width: 284px;
        }
        .auto-style27 {
            width: 100%;
            background-color: #C0C0C0;
        }
        .auto-style28 {
            width: 168px;
        }
        .auto-style32 {
            width: 168px;
            height: 15px;
        }
        .auto-style33 {
            height: 15px;
        }
        .auto-style34 {
            width: 168px;
            height: 2px;
        }
        .auto-style35 {
            height: 2px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
   
     <table class="auto-style11">
        <tr>
            <td class="auto-style12">
                <asp:Label ID="Label1" runat="server" Text="Item Name"></asp:Label>
            </td>
            <td class="auto-style13">
                <asp:DropDownList ID="ddl_items" runat="server" OnSelectedIndexChanged="ddl_items_SelectedIndexChanged" style="height: 22px" DataSourceID="SqlDataSource1" DataTextField="name" DataValueField="name">
                    <asp:ListItem></asp:ListItem>
                    <asp:ListItem></asp:ListItem>
                </asp:DropDownList>
                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" SelectCommand="SELECT * FROM [menu]"></asp:SqlDataSource>
            </td>
            <td class="auto-style20">Bill ID:&nbsp;
                <asp:TextBox ID="txt_billid" runat="server" OnTextChanged="txt_billid_TextChanged"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style14">
                <asp:Label ID="Label2" runat="server" Text="Quantity"></asp:Label>
            </td>
            <td class="auto-style15">
                <asp:TextBox ID="txt_quant" runat="server"></asp:TextBox>
            </td>
            <td class="auto-style21">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" ControlToValidate="txt_quant" ErrorMessage="Quantity Required !"></asp:RequiredFieldValidator>
                <asp:RangeValidator ID="RangeValidator1" runat="server" ControlToValidate="txt_quant" ErrorMessage="Invalid Quantity !" MaximumValue="100" MinimumValue="1" Type="Integer"></asp:RangeValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style16">
                <asp:Label ID="Label3" runat="server" Text="CustomerName"></asp:Label>
            </td>
            <td class="auto-style17">
                <asp:TextBox ID="txt_name" runat="server" OnTextChanged="TextBox2_TextChanged"></asp:TextBox>
            </td>
            <td class="auto-style22">
                <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" ControlToValidate="txt_name" ErrorMessage="Name Required !"></asp:RequiredFieldValidator>
                <asp:CustomValidator ID="CustomValidator1" runat="server" ControlToValidate="txt_name" ErrorMessage="Invalid Name !" OnServerValidate="CustomValidator1_ServerValidate"></asp:CustomValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style18">
                <asp:Label ID="Label4" runat="server" Text="Contact Number"></asp:Label>
            </td>
            <td class="auto-style19">
                <asp:TextBox ID="txt_contact" runat="server"></asp:TextBox>
            </td>
            <td class="auto-style23">
                <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ControlToValidate="txt_contact" ErrorMessage="Enter 10 Digit Phone #  !" ValidationExpression="\d{10}"></asp:RegularExpressionValidator>
            </td>
        </tr>
        <tr>
            <td class="auto-style26">
                <asp:Button ID="btn_saveOrder" runat="server" OnClick="btn_saveOrder_Click" Text="Add To Cart" />
            </td>
            <td class="auto-style25">
                <asp:TextBox ID="TextBox1" runat="server" Enabled="False" OnTextChanged="TextBox1_TextChanged" Visible="False"></asp:TextBox>
            </td>
            <td class="auto-style24">
                &nbsp;&nbsp;
                <asp:TextBox ID="txt_invisible" runat="server"></asp:TextBox>
            </td>
        </tr>
        <tr>
            <td class="auto-style9" colspan="3">
                <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" BackColor="White" BorderColor="#DEDFDE" BorderStyle="None" BorderWidth="1px" CellPadding="4" DataSourceID="SqlDataSource3" GridLines="Vertical" Width="76%" ForeColor="Black" style="margin-top: 3px; margin-right: 0px;" ViewStateMode="Disabled" AllowSorting="True" DataKeyNames="oid" Height="101px" OnSelectedIndexChanged="GridView1_SelectedIndexChanged1">
                    <AlternatingRowStyle BackColor="White" />
                    <Columns>
                        <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" ShowSelectButton="True" />
                        <asp:BoundField DataField="oid" HeaderText="oid" SortExpression="oid" InsertVisible="False" ReadOnly="True" />
                        <asp:BoundField DataField="billID" HeaderText="billID" SortExpression="billID" />
                        <asp:BoundField DataField="itemName" HeaderText="itemName" SortExpression="itemName" />
                        <asp:BoundField DataField="quantity" HeaderText="quantity" SortExpression="quantity" />
                        <asp:BoundField DataField="cusName" HeaderText="cusName" SortExpression="cusName" />
                        <asp:BoundField DataField="contact" HeaderText="contact" SortExpression="contact" />
                    </Columns>
                    <FooterStyle BackColor="#CCCC99" />
                    <HeaderStyle BackColor="#6B696B" Font-Bold="True" ForeColor="White" />
                    <PagerStyle BackColor="#F7F7DE" ForeColor="Black" HorizontalAlign="Right" />
                    <RowStyle BackColor="#F7F7DE" />
                    <SelectedRowStyle BackColor="#CE5D5A" Font-Bold="True" ForeColor="White" />
                    <SortedAscendingCellStyle BackColor="#FBFBF2" />
                    <SortedAscendingHeaderStyle BackColor="#848384" />
                    <SortedDescendingCellStyle BackColor="#EAEAD3" />
                    <SortedDescendingHeaderStyle BackColor="#575357" />
                </asp:GridView>
                <asp:SqlDataSource ID="SqlDataSource3" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" SelectCommand="SELECT * FROM [bill] WHERE ([billID] = @billID)" DeleteCommand="DELETE FROM [bill] WHERE [oid] = @original_oid" InsertCommand="INSERT INTO [bill] ([billID], [itemName], [quantity], [cusName], [contact]) VALUES (@billID, @itemName, @quantity, @cusName, @contact)" UpdateCommand="UPDATE [bill] SET [billID] = @billID, [itemName] = @itemName, [quantity] = @quantity, [cusName] = @cusName, [contact] = @contact WHERE [oid] = @original_oid" OldValuesParameterFormatString="original_{0}">
                    <DeleteParameters>
                        <asp:Parameter Name="original_oid" Type="Int32" />
                    </DeleteParameters>
                    <InsertParameters>
                        <asp:Parameter Name="billID" Type="Int32" />
                        <asp:Parameter Name="itemName" Type="String" />
                        <asp:Parameter Name="quantity" Type="Int32" />
                        <asp:Parameter Name="cusName" Type="String" />
                        <asp:Parameter Name="contact" Type="Decimal" />
                    </InsertParameters>
                    <SelectParameters>
                        <asp:ControlParameter ControlID="txt_billid" Name="billID" PropertyName="Text" Type="Int32" />
                    </SelectParameters>
                    <UpdateParameters>
                        <asp:Parameter Name="billID" Type="Int32" />
                        <asp:Parameter Name="itemName" Type="String" />
                        <asp:Parameter Name="quantity" Type="Int32" />
                        <asp:Parameter Name="cusName" Type="String" />
                        <asp:Parameter Name="contact" Type="Decimal" />
                        <asp:Parameter Name="original_oid" Type="Int32" />
                    </UpdateParameters>
                </asp:SqlDataSource>
                <asp:SqlDataSource ID="SqlDataSource2" runat="server" ConnectionString="<%$ ConnectionStrings:masterConnectionString %>" DeleteCommand="DELETE FROM [bill] WHERE [oid] = @oid" InsertCommand="INSERT INTO [bill] ([billID], [itemName], [quantity], [cusName], [contact]) VALUES (@billID, @itemName, @quantity, @cusName, @contact)" SelectCommand="SELECT * FROM [bill] WHERE ([billID] = @billID2)" UpdateCommand="UPDATE [bill] SET [billID] = @billID, [itemName] = @itemName, [quantity] = @quantity, [cusName] = @cusName, [contact] = @contact WHERE [oid] = @oid">
                    <DeleteParameters>
                        <asp:Parameter Name="oid" Type="Int32" />
                    </DeleteParameters>
                    <InsertParameters>
                        <asp:Parameter Name="billID" Type="Int32" />
                        <asp:Parameter Name="itemName" Type="String" />
                        <asp:Parameter Name="quantity" Type="Int32" />
                        <asp:Parameter Name="cusName" Type="String" />
                        <asp:Parameter Name="contact" Type="Decimal" />
                    </InsertParameters>
                    <SelectParameters>
                        <asp:ControlParameter ControlID="txt_billid" Name="billID2" PropertyName="Text" Type="Int32" />
                    </SelectParameters>
                    <UpdateParameters>
                        <asp:Parameter Name="billID" Type="Int32" />
                        <asp:Parameter Name="itemName" Type="String" />
                        <asp:Parameter Name="quantity" Type="Int32" />
                        <asp:Parameter Name="cusName" Type="String" />
                        <asp:Parameter Name="contact" Type="Decimal" />
                        <asp:Parameter Name="oid" Type="Int32" />
                    </UpdateParameters>
                </asp:SqlDataSource>
                <asp:Button ID="btn_generatebill" runat="server" Height="30px" OnClick="btn_generatebill_Click" Text="Generate Bill" Width="107px" Visible="False" />
                <br />
                <table class="auto-style27">
                    <tr>
                        <td class="auto-style32">
                            <asp:Label ID="Label5" runat="server" Text="Bill ID:"></asp:Label>
                        </td>
                        <td class="auto-style33">
                            <asp:TextBox ID="txt_finalbillid" runat="server" Enabled="False"></asp:TextBox>
                        </td>
                        <td class="auto-style33"></td>
                    </tr>
                    <tr>
                        <td class="auto-style34">
                        </td>
                        <td class="auto-style35">
                        </td>
                        <td class="auto-style35"></td>
                    </tr>
                    <tr>
                        <td class="auto-style28">
                            <asp:Label ID="Label7" runat="server" Text="Total Amount To Pay :"></asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="txt_finalbill" runat="server" Enabled="False"></asp:TextBox>
                        </td>
                        <td>&nbsp;</td>
                    </tr>
                </table>
                <br />
                <br />
                <asp:HiddenField ID="HiddenField1" runat="server" />
            </td>
        </tr>
        <tr>
            <td class="auto-style26">
                &nbsp;</td>
            <td class="auto-style25">
                &nbsp;</td>
            <td class="auto-style24">
                &nbsp;</td>
        </tr>
        <tr>
            <td class="auto-style26">
                &nbsp;</td>
            <td class="auto-style25">
                &nbsp;</td>
            <td class="auto-style24">&nbsp;</td>
        </tr>
    </table>
   
</asp:Content>

