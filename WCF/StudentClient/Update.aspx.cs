using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;

public partial class Update : System.Web.UI.Page
{
    StudentClient client = new StudentClient();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Student obj = new Student();
        obj = client.GetStudentById(Convert.ToInt32(txt_ID.Text));

    }
}