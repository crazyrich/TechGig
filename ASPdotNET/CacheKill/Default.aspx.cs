using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Caching;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class _Default : System.Web.UI.Page
{
    SqlConnection con;
    SqlCommand cmd;
    SqlDataAdapter adapter;
    DataSet dataSet;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Cache["db"] == null)
        {
            con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
            adapter = new SqlDataAdapter("SELECT * FROM Employee", con);
            dataSet = new DataSet();
            adapter.Fill(dataSet);
            GridView1.DataSource = dataSet; GridView2.DataSource = dataSet;
            //Cache.Insert("db",dataSet,null,DateTime.Now.AddSeconds(20),TimeSpan.Zero);
            Cache.Insert("db",dataSet,new SqlCacheDependency("mydb1","Employee"));
            GridView1.DataBind();
            GridView2.DataBind();
          
            Response.Write("from db");

        }
        else
        {
            GridView1.DataSource = Cache["db"];
            GridView1.DataBind();
            Response.Write("From cahe");
        }
    
    
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        Cache.Remove("db");
    }
    protected void Button1_Click(object sender, EventArgs e)
    {

    }
}