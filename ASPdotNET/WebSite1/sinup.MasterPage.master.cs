using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class sinup_MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Request.Cookies["mycookie"] != null)
        {
            lbl_datetime.Text = "Last VIsited :" + Request.Cookies["mycookie"].Value;
        }
        if(Application["counter"] != null)
        {
            lbl_totaluser.Text = " Count: " + Application["counter"].ToString();
        }
        if (Session["id"] != null && Session["password"] != null)
        {
            lbl_msg.Text = " Welcome " + Session["id"].ToString();
            link_btn_login.Text = "Logout";
        }
        else
        {
            lbl_msg.Text = "Welcome Guest !";
            link_btn_login.Text = "Login";
            lbl_datetime.Text = "";
        }
    }
    private void WriteCookie()
    {
        HttpCookie xyz = new HttpCookie("mycookie");
        xyz.Value = DateTime.Now.ToString("dd- MM- yy,hh - mm- ss tt");
        xyz.Expires.AddDays(7);
        Response.Cookies.Add(xyz);
    
    }
    protected void link_btn_login_Click(object sender, EventArgs e)
    {   
        if (link_btn_login.Text == "Logout")
        {
           WriteCookie();//saves current date and time in cookie on logout
           //Session.Abandon();
           Session.Remove("id");
           Session.Remove("password");
            Response.Redirect("LoginCookies.aspx");
        }
        else 
        {
            Response.Redirect("LoginCookies.aspx");
        }
    }
    protected void Timer1_Tick(object sender, EventArgs e)
    {
        lbl_timer.Text = DateTime.Now.ToString("hh : mm : ss tt");
    }
}
   