using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;

public partial class Default2 : System.Web.UI.Page
{
    RestaurantClient client = new RestaurantClient("BasicHttpBinding_IRestaurant");
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            LoadDropDownList();

        }
    }

    private void LoadDropDownList()
    {
        DropDownList1.DataSource = client.GetAllRestaurant();
        DropDownList1.DataTextField = "Name";
        DropDownList1.DataValueField = "Id";
        DropDownList1.DataBind();
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        try
        {
            Restaurant rest = new Restaurant();

            rest.Name = txt_name.Text;
            rest.City = txt_city.Text;
            rest.EmailAddress = txt_email.Text;
            rest.MobileNumber = txt_mobile.Text;
            client.EditRestaurant(Convert.ToInt32(DropDownList1.Text),rest);

            LoadDropDownList();

        }
        catch(Exception es)
        {
            Response.Write(es.Message);
        }

       
    }
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        Restaurant rest = new Restaurant();
        rest = client.GetRestaurant(Convert.ToInt32(DropDownList1.Text));
        txt_name.Text = rest.Name;
        txt_city.Text = rest.City;
        txt_email.Text = rest.EmailAddress;
        txt_mobile.Text = rest.MobileNumber;
    }
}