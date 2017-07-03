using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;

public partial class Insert : System.Web.UI.Page
{
    //Product prod;
    ProductionClient client = new ProductionClient("WS2007HttpBinding_IProduction");
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        
        bool flag = false;
        var res = client.GetAllProducts();
        foreach(var i in res)
        {
            if(i.ProductName.Trim()==txt_name.Text)
            {
                //this.prod= i;
                flag = true;
                break;
            }
            else
            {
                flag = false;
            }
        }
        if(flag)
        {
            client.Update(txt_name.Text,Convert.ToInt32(txt_uints.Text));
        }
        else
        {
            Product obj = new Product()
            {
                ProductID = Convert.ToInt32(txt_id.Text),
                ProductName = txt_name.Text,
                ProductPrice = Convert.ToInt32(txt_price.Text),
                Units = Convert.ToInt32(txt_uints.Text),
            };
            client.AddProduct(obj);
            //Response.Write("<script>alert('Add Valid Name !')</script>");
        }
        }
    }
