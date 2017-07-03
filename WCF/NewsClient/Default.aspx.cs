using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ServiceReference1;

public partial class _Default : System.Web.UI.Page
{
    NewsClient client = new NewsClient();
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            GridView1.DataSource = client.GetNews();
            GridView1.DataBind();
        }
    }
    protected void TextBox6_TextChanged(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {
        News obj = new News()
        {
        Id=Convert.ToInt32(txt_id.Text),
        NewHeadLine=txt_headline.Text,
        ReportName=txt_reportName.Text,
        NewsType= txt_type.Text,
        NewsDescription=txt_desc.Text,
        NewsDate=txt_date.Text,
        };
        client.AddNews(obj);

        //client.Id = id;
        //client.NewHeadLine = head;
        //client.NewsDate = date;
        //client.NewsDescription = desc;
        //client.ReportName = report;
        //client.NewsType = type;


        //List<News> list = new List<News>();
        //list.Add(obj);

        
    }
}