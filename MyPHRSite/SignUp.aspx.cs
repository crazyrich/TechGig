using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

public partial class SignUp : System.Web.UI.Page
{
    int result, result1;
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
    {

        Calendar1.Visible = true;
    }

    protected void Calendar1_SelectionChanged(object sender, EventArgs e)
    {

        lbl_dob.Text = Calendar1.SelectedDate.ToLongDateString();
        Calendar1.Visible = true;
    }
   
  

    private void InsertAddress(BL bl, SqlCommand cmd1, string phrNo)
    {
        cmd1.CommandText = "insert into Address values(@PHRno,@add,@city,@state,@country)";
        cmd1.Parameters.Add("PHRno", phrNo);
        cmd1.Parameters.Add("@add", txt_address.Text);
        cmd1.Parameters.Add("@city", txt_city.Text);
        cmd1.Parameters.Add("@state", txt_state.Text);
        cmd1.Parameters.Add("@country", txt_country.Text);

        result1 = bl.ExecuteNonQuery(cmd1);

        if (result > 0 && result1 > 0)
        {

            Session["id"] = txt_Username.Text;
            Session["phr"] = "!! Your PHR NO. is: " + phrNo;
            Response.Redirect("profile_1.aspx");

        }
    }

    
   
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (Page.IsValid)
        {

            BL bl = new BL();
            SqlCommand cmd = new SqlCommand();
            SqlCommand cmd1 = new SqlCommand();
            SqlDataReader dr;


            Random ran = new Random();
            string phrNo = Convert.ToString(ran.Next(999999));

            cmd.CommandText = "insert into SignUp values(@FirstName,@LastName,@Gender,@DOB,@Phone,@Email,@UserName,@Password,@Role,@PHRno)";
            cmd.Parameters.Add("FirstName", txt_firstname.Text);
            cmd.Parameters.Add("LastName", txt_lastname.Text);
            cmd.Parameters.Add("Gender", RadioButtonList1.SelectedItem.ToString());
            cmd.Parameters.Add("DOB", lbl_dob.Text);
            cmd.Parameters.Add("Phone", txt_phone.Text);
            cmd.Parameters.Add("Email", txt_emailid.Text);

            cmd.Parameters.Add("UserName", txt_Username.Text);
            cmd.Parameters.Add("Password", txt_pswd.Text);
            cmd.Parameters.Add("Role", ddl_usertype.Text);
            cmd.Parameters.Add("PHRno", txt_Username.Text+phrNo);


            //==========================check if username already exists==========
            cmd1.CommandText = "select UserName from SignUp where UserName=@un";
            cmd1.Parameters.Add("@un", txt_Username.Text);
            dr = bl.ExecuteReader(cmd1);


            if (dr.Read())
            {
                Response.Write("<script>alert('Username already exists...:(')</script>");
            }
            else
            {
                bl.closeCon();
                result = bl.ExecuteNonQuery(cmd);
                InsertAddress(bl, cmd1, phrNo);

            }

        }
    }
}