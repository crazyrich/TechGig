using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AJAXPage1 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        System.Threading.Thread.Sleep(1000);
        Label1.Text = DateTime.Now .ToString();
        Label2.Text = DateTime.Now.ToString();
        Label3.Text = DateTime.Now.ToString();

    }
    protected void Button2_Click(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {

    }
}