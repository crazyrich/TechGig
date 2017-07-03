using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
public partial class LoginCookies : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btn_login_Click(object sender, EventArgs e)
    {
        BL bl=new BL();
        
        SqlCommand cmd = new SqlCommand();
        cmd.CommandText = "Select * from login where LoginID=@uid and Password=@pwd";
        cmd.Parameters.AddWithValue("@uid",txt_name.Text);
        cmd.Parameters.AddWithValue("@pwd", txt_pass.Text);
       
        SqlDataReader dr = bl.ExecuteReader(cmd);
       
        if(dr.Read())
        {
            string LoginID = dr[0].ToString();
            string Password = dr[1].ToString();
            bl.closeCon();
           // Response.Write(LoginID);
            Session["id"] = LoginID;
            Session["password"] = Password;

            
            Response.Redirect("HomeCookies.aspx");
        }
     
    }

    
}