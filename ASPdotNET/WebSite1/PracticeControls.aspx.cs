using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class PracticeControls : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        if (FileUpload1.HasFile)
        {
            int size = FileUpload1.PostedFile.ContentLength;
            if(size> (1024*50))
            {
                Label2.Text = "File Sze is greater than 50 kb !";
                return;
            
            }
            string filename = FileUpload1.FileName;

            if (filename.ToLower().EndsWith(".png") || filename.ToLower().EndsWith(".jpg"))
            {
                string path = Server.MapPath("~/Upload");
                FileUpload1.SaveAs(path + "/" + filename);
                Label2.Text = "File Uploaded !";
            }
            else 
            {
                Label2.Text = "Image should be png or jpg !";
            }
        }
        else
        {
            Label2.Text = "Select a File !";
        }
    }
    protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
    {
        Calendar1.Visible = true;
    }
    protected void Calendar1_SelectionChanged(object sender, EventArgs e)
    {
        Label3.Text = Calendar1.SelectedDate.ToLongDateString();
        Calendar1.Visible = false;
    }
    protected void Calendar1_DayRender(object sender, DayRenderEventArgs e)
    {
        if(e.Day.Date < DateTime.Now.Date)
        {
            e.Day.IsSelectable = false;

        }
    }
    protected void ImageButton2_Click(object sender, ImageClickEventArgs e)
    {
        if (Label3.Text != "")
        {
            Calendar2.Visible = true;
        }
        else
        {
            Label4.Text = "Please select start date !";
        }
       
    }
    protected void Calendar2_SelectionChanged(object sender, EventArgs e)
    {
        Label4.Text = Calendar2.SelectedDate.ToLongDateString();
        Calendar2.Visible = false;
    }
    protected void Calendar2_DayRender(object sender, DayRenderEventArgs e)
    {
        if (e.Day.Date < Calendar1.SelectedDate.Date)
        {
            e.Day.IsSelectable = false;

        }
    }
}