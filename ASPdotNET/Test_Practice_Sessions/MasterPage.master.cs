using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LinkButton1.Text = "LogOut";
        if(Response.Cookies["myCook"]!=null)
        {
            lbl_lastVisit.Text = Request.Cookies["myCook"].Value;
        }
    }
    protected void Timer1_Tick(object sender, EventArgs e)
    {
        Label1.Text = DateTime.Now.ToString("hh : mm : ss tt");
    }
    public void WriteCookie()
    {
        HttpCookie cookie = new HttpCookie("myCook");
        cookie.Value = DateTime.Now.ToString();
        cookie.Expires.AddDays(2);
        Response.Cookies.Add(cookie);
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        if (LinkButton1.Text == "Login")
        {
            LinkButton1.Text = "Login";
            Response.Redirect("Login.aspx");
        }
        else if (LinkButton1.Text == "LogOut")
        {
            WriteCookie();
            LinkButton1.Text = "Login";
            Response.Redirect("Login.aspx");
        }
    }
}
