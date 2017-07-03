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
        if(!IsPostBack)
        {
            Random r = new Random();
            int rand = r.Next(10, 9999);
            txt_billid.Text = Convert.ToString(rand);
        }
        //con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        //adapter = new SqlDataAdapter("SELECT * from menu",con);
        //dataSet = new DataSet();
        //adapter.Fill(dataSet);
        //ddl_items.DataSource = dataSet;
        //ddl_items.DataTextField = "name";
        //ddl_items.DataValueField ="name";
        //ddl_items.DataBind();
    }
    protected void TextBox2_TextChanged(object sender, EventArgs e)
    {
       
    }
    protected void btn_saveOrder_Click(object sender, EventArgs e)
    {
        btn_generatebill.Visible = true;
        txt_invisible.Text = txt_billid.Text;
        if (Page.IsValid)
        {
            DataBase db = new DataBase();
           
            List<int> list=new List<int>();
            
           
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "INSERT INTO bill values(@billid,@itemName,@quantity,@custName,@contact)";
            cmd.Parameters.AddWithValue("@billid",txt_billid.Text); 
            cmd.Parameters.AddWithValue("@itemName", ddl_items.SelectedValue);
            cmd.Parameters.AddWithValue("@quantity", txt_quant.Text);
            cmd.Parameters.AddWithValue("@custName", txt_name.Text);
            cmd.Parameters.AddWithValue("@contact", txt_contact.Text);
           //list.Add(rand);
           
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
    protected void TextBox1_TextChanged(object sender, EventArgs e)
    {

    }
    protected void txt_billid_TextChanged(object sender, EventArgs e)
    {
     
    }


    protected void btn_generatebill_Click(object sender, EventArgs e)
    {
        //int index = e.NewSelectedIndex;
        //string oid = GridView1.Rows[index].Cells[1].Text;
        //HiddenField1.Value = str;
        DataBase db = new DataBase();
        MenuServices obj = new MenuServices();

        Response.Write(txt_finalbillid.Text);

        // con = new SqlConnection(ConfigurationManager.ConnectionStrings["con"].ConnectionString);
        cmd = new SqlCommand();
        cmd.CommandText = "SELECT itemName,quantity from bill where billID=@billID";
        //   cmd.Connection = con;
        cmd.Parameters.AddWithValue("@billID", txt_invisible.Text);
        SqlDataReader reader = db.ExecuteReader(cmd);
        int quantity = 0;
        string name;
        int sum = 0;
        while (reader.Read())
        {
            
            name = reader[0].ToString();
            quantity = Convert.ToInt32(reader[1].ToString());
            foreach (var i in obj.itemMenu)
            {
                if (i.itemName == name)
                {
                    this.price = i.itemPrice;
                }
                sum+= (quantity*Convert.ToInt32(price));
                break;
            }
            txt_finalbill.Text = sum.ToString();
            


        }



    }
    protected void GridView1_SelectedIndexChanging(object sender, GridViewSelectEventArgs e)
    {
        
            
    }
    protected void GridView1_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
    protected void Gr(object sender, GridViewSelectEventArgs e)
    {

    }
    protected void GridView1_SelectedIndexChanged1(object sender, EventArgs e)
    {

    }
}