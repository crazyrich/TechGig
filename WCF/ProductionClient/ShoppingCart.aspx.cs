using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;
using System.ServiceModel;

public partial class ShoppingCart : System.Web.UI.Page
{
    ShoppingClient client = new ShoppingClient("BasicHttpBinding_IShopping");
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        client.UpdateShopping(Convert.ToInt32(txt_id.Text),Convert.ToInt32(txt_uints.Text));
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
        GridView1.DataSource = client.GetProducts();
        GridView1.DataBind();
    }
    protected void Button3_Click(object sender, EventArgs e)
    {
        try
        {
            List<Product> list = new List<Product>();
            list.Add(client.GetProductsbyid(Convert.ToInt32(txt_id.Text)));
            GridView2.DataSource = list;
            GridView2.DataBind();
        }
        catch(FaultException<MyException> exception)
        {
            Response.Write(exception.Detail.Msg+ " "+exception.Detail.LineNumber+ " "+exception.Detail.StackTrace);
        }
    }
}