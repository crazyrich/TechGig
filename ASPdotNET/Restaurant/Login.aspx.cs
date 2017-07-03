using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        string username = txt_username.Text;
        string password = txt_password.Text;
        if((username=="User1" ) && (password=="123"))
        {
            Response.Redirect("Index.aspx?username="+username);
        }
    }
}