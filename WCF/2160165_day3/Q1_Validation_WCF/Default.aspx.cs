using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        ServiceReference1.Interface1Client client = new ServiceReference1.Interface1Client();
        if (client.Login(TextBox1.Text, TextBox2.Text))
        {
            Response.Redirect("<script>alert('WELCOME !')</script>");
        }
        else
        {
            Response.Redirect("<script>alert('Fail !')</script>");


        }
    }
}