using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class Grid : System.Web.UI.Page
{
    SqlConnection con;
    SqlCommand cmd;
    SqlDataAdapter adapter;
    DataSet dataSet;

    protected void Page_Load(object sender, EventArgs e)
    {
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["adcon"].ConnectionString);
        adapter = new SqlDataAdapter("SELECT * from testemp",con);
        dataSet = new DataSet();
        adapter.Fill(dataSet);
        GridView1.DataSource = dataSet;
        GridView1.DataBind();

    }
    protected void GridView1_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
}