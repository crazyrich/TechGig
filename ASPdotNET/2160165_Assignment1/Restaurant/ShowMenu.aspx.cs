using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class ShowMenu : System.Web.UI.Page
{
    SqlConnection con;
    SqlCommand cmd;
    SqlDataAdapter adapter;
    DataSet dataSet; 
    protected void Page_Load(object sender, EventArgs e)
    {
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        adapter = new SqlDataAdapter("SELECT * from menu",con);
        dataSet = new DataSet();
        adapter.Fill(dataSet);
        GridView1.DataSource = dataSet;
        GridView1.DataBind();
    }
}