using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;
public partial class Default2 : System.Web.UI.Page
{
    RestaurantServiceClient client = new RestaurantServiceClient("BasicHttpBinding_IRestaurantService");

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            loadDropdownlist();
        }
    }

    private void loadDropdownlist()
    {
        DropDownList1.DataSource = client.GetAllRestaurnat();
        DropDownList1.DataTextField = "Name";
        DropDownList1.DataValueField = "Id";
        DropDownList1.DataBind();
    }
    protected void DropDownList1_SelectedIndexChanged(object sender, EventArgs e)
    {
        Restaurant rest = new Restaurant();
        rest = client.GetRestaurnat( Convert.ToInt32(DropDownList1.Text));
        TextBox1.Text = rest.Name;
        TextBox2.Text = rest.EmailAddress;
        TextBox3.Text = rest.MobileNumber;
        TextBox4.Text = rest.City;
    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        try
        {
            Restaurant rest = new Restaurant();
            rest.Name = TextBox1.Text;
            rest.EmailAddress = TextBox2.Text;
            rest.MobileNumber = TextBox3.Text;
            rest.City = TextBox4.Text;
            client.EditRestaurant(Convert.ToInt32(DropDownList1.Text), rest);
            

            Response.Write("data updated !!");
            loadDropdownlist();
        }
        catch (Exception ex)
        {
            Response.Write(ex.Message);
        }
    }
}