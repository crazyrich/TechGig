using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Index : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

   

    protected void btn_login_Click(object sender, EventArgs e)
    {
        BL bl = new BL();
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "select * from SignUp where UserName=@uid and Password=@pwd";
        cmd.Parameters.Add("@uid", txt_username.Text);
        cmd.Parameters.Add("@pwd", txt_password.Text);


        SqlDataReader dr = bl.ExecuteReader(cmd);
        if (dr.Read())
        {
            Session["id"] = txt_username.Text;
            Session["phr"] = (string)dr[10];

            if ((string)dr[9] == "Doctor")
            {
                Response.Redirect("ContactUs.aspx");
            }
            else
            {
                Response.Redirect("ContactUs.aspx");
            }

        }
        else
        {
            Response.Write("<script> alert('Invalid user')</Script>");
        }
    }
}