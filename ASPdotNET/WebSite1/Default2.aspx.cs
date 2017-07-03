using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Diagnostics;

public partial class Default2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Debug.WriteLine("LOAD");

        if (Request.QueryString["name"] != null)
        {

            Label1.Text = "Welcome" + Request.QueryString["name"].ToString();
        }
    }
    protected void Page_Init(object sender, EventArgs e)
    {
        Debug.WriteLine("Init");
    }
    protected void Page_PreRender(object sender, EventArgs e)
    {
        Debug.WriteLine("Render");
    }
    protected void Page_Unload(object sender, EventArgs e)
    {
        Debug.WriteLine("unLOAD");
    }





    protected void Button1_Click(object sender, EventArgs e)
    {
        Debug.WriteLine("Post BACK");

       
    }
}