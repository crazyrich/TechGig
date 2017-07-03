using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Page1 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        List<string> list = new List<string>
        {
            "India","USA", "Indonesia","Uk"
        };

        DropDownList1.DataSource = list;
        DropDownList1.DataBind();

        DropDownList1.Items.Add("Germany");

        if(IsPostBack)
        {
            Response.Write("POST");
        }
        else
        {
            Response.Write("GET");
        }
        Response.Write("LOAD");

        Label1.BackColor = System.Drawing.Color.FromName("Black");
    }
}