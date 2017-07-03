using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Calculator1 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    
    }
    protected void TextBox1_TextChanged(object sender, EventArgs e)
    {

    }
    protected void btn_1_Click(object sender, EventArgs e)
    {

    }
    protected void btn_2_Click(object sender, EventArgs e)
    {
        
    }
    protected void btn_3_Click(object sender, EventArgs e)
    {
        
    }
    protected void btn_1_Command(object sender, CommandEventArgs e)
    {
        Button btn = sender as Button;
        if (btn.ID == "btn_1")
        { 
            txt_value3.Text=((Convert.ToInt32(txt_value1.Text))+Convert.ToInt32(txt_value2.Text)).ToString();
        }
        else if (btn.ID == "btn_2")
        {
            txt_value3.Text = ((Convert.ToInt32(txt_value1.Text)) - Convert.ToInt32(txt_value2.Text)).ToString();
        }
        else 
        {
            txt_value3.Text = ((Convert.ToInt32(txt_value1.Text)) * Convert.ToInt32(txt_value2.Text)).ToString();
        }

   }
}