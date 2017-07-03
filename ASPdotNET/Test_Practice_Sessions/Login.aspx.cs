using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btn_login_Click(object sender, EventArgs e)
    {
        if(Page.IsValid)
        {
            DataContext db = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich2;uid=sa;pwd=info123!");
            Table<LoginClass> table = db.GetTable<LoginClass>();
            var result = from signup in table
                         select signup;
            foreach(LoginClass i in result)
            {
                if (i.Username.Trim() == txt_username.Text && i.PAssword.Trim() == txt_password.Text)
                {
                    Session["UserName"] = txt_username.Text;
                    Session["Password"] = txt_password.Text;
                    Response.Redirect("Home.aspx?UserName="+txt_username.Text+"&Password="+txt_password.Text);
                }
                else
                {
                    Response.Write("Load");
                }
            }
        }
    }
    protected void btn_SignUp_Click(object sender, EventArgs e)
    {
        Response.Redirect("SignUp.aspx");
    }
}