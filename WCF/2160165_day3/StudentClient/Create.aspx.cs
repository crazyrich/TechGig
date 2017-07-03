using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;

public partial class Create : System.Web.UI.Page
{
    StudentClient client = new StudentClient();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        Student obj = new Student()
        {
            Id=Convert.ToInt32(txt_ID.Text),
            StudentName=txt_Name.Text,
            StudentClass=txt_Class.Text,
            StudentCourse=txt_course.Text,
        };
      
        client.AddStudent(obj);
        Response.Write("<script>alert('Added Successfully !! ')</script>");
        
    }
}