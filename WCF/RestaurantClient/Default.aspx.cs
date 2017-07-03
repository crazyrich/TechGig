using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;
using System.ServiceModel;

public partial class _Default : System.Web.UI.Page
{
    RestaurantClient client = new RestaurantClient("BasicHttpBinding_IRestaurant");

    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            GridView1.DataSource = client.GetAllRestaurant();
            GridView1.DataBind();
        }
    }
    protected void LinkButton1_Click(object sender, EventArgs e)
    {
        try
        {
            //int Id = Convert.ToInt32((sender as LinkButton).Text);
            int Id = 23;
            client.GetRestaurant(Id);

            List<Restaurant> list = new List<Restaurant>();
            list.Add(client.GetRestaurant(Id));
            GridView2.DataSource = list;
            GridView2.DataBind();
        }
        catch (FaultException<MyException> ex)
        {
            Response.Write(ex.Detail.Msg+" "+ex.Detail.LineNumber +" "+ex.Detail.StackTrace);
        }

       
    }
    protected void LinkButton2_Click(object sender, EventArgs e)
    {
        int Id = Convert.ToInt32((sender as LinkButton).Text);
        client.RemoveRestaurant(Id);
        GridView1.DataSource = client.GetAllRestaurant();
        GridView1.DataBind();
    }
}