using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Delhi : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        ServiceReference1.WebServiceSoapClient client = new ServiceReference1.WebServiceSoapClient();
        if(!IsPostBack)
        {
            DropDownList1.DataSource = client.Source();
            DropDownList2.DataSource = client.Destination();
            DropDownList1.DataBind();
            DropDownList2.DataBind();
        }
        
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        ServiceReference1.WebServiceSoapClient client = new ServiceReference1.WebServiceSoapClient();
        Label1.Text = client.Cal_Fare(Convert.ToInt32(TextBox1.Text),DropDownList1.SelectedValue, DropDownList2.SelectedValue).ToString();
    }
}