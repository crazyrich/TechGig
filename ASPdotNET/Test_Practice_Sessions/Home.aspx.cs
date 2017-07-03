using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Home : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(Session["UserName"]!= null && Session["Password"]!= null)
        {
            lbl_fromSession.Text = "WELCOME !"+ Session["UserName"];    
            
            if (Request.QueryString["UserName"] != null && Request.QueryString["Password"]!=null)
            {
                lbl_fromRequest.Text = "WELCOME !"+ Request.QueryString["UserName"].ToString();    
            }
        }
        
        
    }
}