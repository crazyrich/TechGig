using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class Sinup : System.Web.UI.Page
{
    SqlConnection con;
    SqlCommand cmd;

    protected void Page_Load(object sender, EventArgs e)
    {
        con = new SqlConnection();
        if(con.State==ConnectionState.Closed)
        {
            con.Open();
        }
        con.ConnectionString = (ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        cmd = new SqlCommand("Insert into ",con);


        if (con.State == ConnectionState.Open)
        {
            con.Close();
        }

    }
}