using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
public partial class Login : System.Web.UI.Page
{
     SqlConnection con;
      SqlCommand cmd;
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btn_login_Click(object sender, EventArgs e)
    {
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
            cmd=new SqlCommand();
            cmd.Connection=con;
            cmd.CommandText="Select * from login where userid=@id and  pass=@pass";
            cmd.Parameters.AddWithValue("@id", TextBox1.Text);
            cmd.Parameters.AddWithValue("@pass", TextBox2.Text);
            SqlDataReader dr=cmd.ExecuteReader();
            if(dr.Read())
            {
                string fullname=dr[2].ToString();
                Server.Transfer("Default2.aspx?name="+ fullname);
            }
            else
            {
            
                Response.Write("<script> alert('welcome') </script>");
                Label3.Text=" ";
            }
            if (con.State == ConnectionState.Open)
            {
                con.Close();
            }
        
        
    }
}