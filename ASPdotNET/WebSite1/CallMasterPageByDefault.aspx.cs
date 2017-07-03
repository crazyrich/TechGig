using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data;
using System.Data.SqlClient;
using System.Configuration;

public partial class CallMasterPageByDefault : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void list_qual_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
    protected void imgbtn_dob_Click(object sender, ImageClickEventArgs e)
    {
        cal_dob.Visible = true;
    }
    protected void cal_dob_SelectionChanged(object sender, EventArgs e)
    {
        lbl_cal.Text = cal_dob.SelectedDate.ToShortDateString();
        cal_dob.Visible = false;
    }
    protected void btn_sinup_Click(object sender, EventArgs e)
    {
        if (IsValid)
        {
            BL bl = new BL();
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "insert into register values(@name,@age,@gender,@qual,@dob,@cell,@email,@address)";
            cmd.Parameters.Add("name", txt_name.Text);
            cmd.Parameters.Add("age", txt_age.Text);
            cmd.Parameters.Add("gender", (rd_male.Checked == true ? "Male" : "Female"));
            cmd.Parameters.Add("qual", ddl_qual.Text);
            cmd.Parameters.Add("dob", lbl_cal.Text);
            cmd.Parameters.Add("cell", txt_cellno.Text);
            cmd.Parameters.Add("email", txt_email.Text);
            cmd.Parameters.Add("address", txt_address.Text);


            int result = bl.ExecuteNonQuery(cmd);
            if (result > 0)
            {
                Response.Write("<script> alert('WELCOME')</script>");
            }

        }
    }
    protected void CustomValidator1_ServerValidate(object source, ServerValidateEventArgs args)
    {
        bool flag1 = false, flag2 = false, flag3 = false;
        string str = args.Value;
        if (str.Length >= 5)
        {
            foreach (char i in str)
            {
                if (char.IsLower(i))
                {
                    flag1 = true;
                }
                if (char.IsUpper(i))
                {
                    flag2 = true;
                }
                if (char.IsDigit(i))
                {
                    flag3 = true;
                }
            }
            if (flag1 && flag2 && flag3)
            {
                args.IsValid = true;

            }
        }
        else
        {
            args.IsValid = true;
        
        }
    }
}