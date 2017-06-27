using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class DoctorProfile : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
    protected void btn_upload_Click(object sender, EventArgs e)
    {
        if (FileUpload1.HasFile)
        {
            string filename = "";
            if (Session["id"] != null)
            {
                filename = Session["id"].ToString();
            }
            string path = Server.MapPath("~/upload");
            FileUpload1.SaveAs(path + "/" + filename);
            Label1.Text = "Certificates uploaded successfully..!!";

            //****************************************//
            //byte[] Image = null;
            //Image = new byte[FileUpload1.PostedFile.ContentLength];
            //cmd.Parameters.Add(new SqlParameter("@certification", SqlDbType.Image));
            //cmd.Parameters["@certification"].Value = Image;
            //********************************************//

            //=====================into database==========///

            BL bl = new BL();
            SqlCommand cmd = new SqlCommand();
                    

            cmd.CommandText = "insert into DoctorProfile values(@PHRno,@speciality,@experience,@certification)";
            cmd.Parameters.Add("@PHRno",Session["phr"]);
            cmd.Parameters.Add("@speciality",ddl_speciality.Text);
            cmd.Parameters.Add("@experience",txt_experience.Text);
            cmd.Parameters.Add("@certification", filename);
            
            

            int result = bl.ExecuteNonQuery(cmd);

            if (result > 0 )
            {
                Response.Write("<script>alert('Upload successful')</script>");
                Label1.Text = "Certificates uploaded successfully..!!";
            }
        }
        else
        {
            Label1.Text = "select file to upload..!!";
        }
    }
    protected void btn_ViewMedHisByDoc_Click(object sender, EventArgs e)
    {
        Response.Redirect("MedicalHistory.aspx?xyz="+txt_ViewMedHisByDoc.Text);
    }
}