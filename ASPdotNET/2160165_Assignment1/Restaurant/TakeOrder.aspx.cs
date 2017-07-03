using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class TakeOrder : System.Web.UI.Page
{
    SqlConnection con;
    SqlCommand cmd;
    SqlDataAdapter adapter;
    DataSet dataSet;
    double price;
    protected void Page_Load(object sender, EventArgs e)
    {
        con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        adapter = new SqlDataAdapter("SELECT * from menu",con);
        dataSet = new DataSet();
        adapter.Fill(dataSet);
        ddl_items.DataSource = dataSet;
        ddl_items.DataTextField = "name";
        ddl_items.DataValueField = "name";
        ddl_items.DataBind();
    }
    protected void TextBox2_TextChanged(object sender, EventArgs e)
    {

    }
    protected void btn_saveOrder_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {
            DataBase db = new DataBase();
            MenuServices obj = new MenuServices();
            
            foreach(var i in obj.itemMenu)
            {
                if(i.itemName==ddl_items.Text)
                {
                    this.price=i.itemPrice;
                }
            }

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO bill values(@itemName,@quatity,@custName,@contact,@totalBill)";
            cmd.Parameters.AddWithValue("@itemName", ddl_items.SelectedValue);
            cmd.Parameters.AddWithValue("@quatity", txt_quant.Text);
            cmd.Parameters.AddWithValue("@custName", txt_name.Text);
            cmd.Parameters.AddWithValue("@contact", txt_contact.Text);
            txt_totalbill.Text = (Convert.ToInt32(txt_quant.Text) * this.price).ToString();
            cmd.Parameters.AddWithValue("@totalBill",txt_totalbill.Text);

            int result = db.ExecuteNonQuery(cmd);
            if (result > 0)
            {
                Response.Write("INSERTED INTO BILL TABLE !");
            }
        }
        else
        {
            Response.Write("<script>alert('Invalid')</script>");
        }
    }
    protected void CustomValidator1_ServerValidate(object source, ServerValidateEventArgs args)
    {
        string name=args.Value;
        if (name.Length >= 3)
        {
            args.IsValid = true;
        }
        else
        {
            args.IsValid = false;
        }
    }
    protected void ddl_items_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
}