using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class MasterPage : System.Web.UI.MasterPage
{
    SqlDataReader reader;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["username"] != null)
        {
            LinkButton1.Text = "Logout";
            Label1.Text = "WELCOME " + Request.QueryString["username"];
            Session["username"] = Request.QueryString["username"];

        }
        else
        {
            Label1.Text = "WELCOME Guest User ! ";
            LinkButton1.Text = "Login";
        }
    }
    protected void Menu1_MenuItemClick(object sender, MenuEventArgs e)
    {
        
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        if (LinkButton1.Text == "Logout")
        {
            Label1.Text = "WELCOME Guest User ! ";
            Response.Redirect("Login.aspx");
        }
        else
        {
            Label1.Text = "WELCOME Guest User ! ";
            Response.Redirect("Login.aspx");
           
        }
    }
}
