using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class AdvancedGrid : System.Web.UI.Page
{

    SqlConnection con1;
    SqlCommand cmd;
    DataSet dataSet;
    SqlDataAdapter adapter;
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            con1 = new SqlConnection(ConfigurationManager.ConnectionStrings["adcon"].ConnectionString);
            adapter = new SqlDataAdapter("select * from [Production].[ProductCategory]",con1);
            dataSet = new DataSet();
            adapter.Fill(dataSet);

            DropDownList1.DataSource = dataSet;
            DropDownList1.DataTextField = "Name";
            DropDownList1.DataValueField = "ProductCategoryID";
            DropDownList1.DataBind();

        }
    }
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        con1 = new SqlConnection(ConfigurationManager.ConnectionStrings["adcon"].ConnectionString);
        adapter = new SqlDataAdapter("select * from [Production].[ProductSubcategory] where ProductCategoryID="+DropDownList1.SelectedValue, con1);
        dataSet = new DataSet();
        adapter.Fill(dataSet);

        DropDownList2.DataSource = dataSet;
        DropDownList2.DataTextField = "Name";
        DropDownList2.DataValueField = "ProductSubcategoryID";
        DropDownList2.DataBind();
    }
    protected void DropDownList2_SelectedIndexChanged(object sender, EventArgs e)
    {
        con1 = new SqlConnection(ConfigurationManager.ConnectionStrings["adcon"].ConnectionString);
        adapter = new SqlDataAdapter("select * from [Production].[Product] where ProductSubcategoryID=" + DropDownList2.SelectedValue, con1);
        dataSet = new DataSet();
        adapter.Fill(dataSet);
        GridView1.DataSource = dataSet;
        GridView1.DataBind();
    }
    protected void GridView2_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        int i = e.NewSelectedIndex;
        string str = GridView2.Rows[i].Cells[2].Text;
        HiddenField1.Value = str;

    }
}