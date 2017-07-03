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
    RestaurantServiceClient client = new RestaurantServiceClient("BasicHttpBinding_IRestaurantService");

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GridView1.DataSource = client.GetAllRestaurnat();
            GridView1.DataBind();
        }
    }
    protected void LinkButton1_Click1(object sender, EventArgs e)
    {
        try
        {
           // int Id = Convert.ToInt32((sender as LinkButton).Text);
            int Id = 56;
            client.GetRestaurnat(Id);
            List<Restaurant> list = new List<Restaurant>();
            list.Add(client.GetRestaurnat(Id));
            GridView2.DataSource = list;
            GridView2.DataBind();

        }
        catch (FaultException<MyException> ex)
        {
            Response.Write(ex.Detail.Msg + " " + ex.Detail.StackTrace +" "+ex.Detail.LineNumber);            

        }
    }
    protected void LinkButton2_Click1(object sender, EventArgs e)
    {
        int Id = Convert.ToInt32((sender as LinkButton).Text);
        client.RemoveRestaurant(Id);
        GridView1.DataSource = client.GetAllRestaurnat();
        GridView1.DataBind();
    }
    protected void GridView1_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
}