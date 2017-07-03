using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Calculator : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        ServiceReference1.WebServiceSoapClient client = new ServiceReference1.WebServiceSoapClient();
        Label1.Text = (client.Add(Convert.ToInt32(TextBox1.Text),(Convert.ToInt32(TextBox2.Text)))).ToString();
    }
}