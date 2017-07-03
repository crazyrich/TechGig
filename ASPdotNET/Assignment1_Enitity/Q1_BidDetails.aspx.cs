using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;

public partial class Q1_BidDetails : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btn_insert_Click(object sender, EventArgs e)
    {
        DataContext db = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
        Table<BidDetail> table = db.GetTable<BidDetail>();
        BidDetail bd = new BidDetail()
        {
            BID = Convert.ToInt32(txt_bid.Text),
            Domain = txt_domain.Text,
            Name = txt_name.Text,
            ProjectDuration = Convert.ToInt32(txt_duration.Text),
            TeamRequired = Convert.ToInt32(txt_team.Text),
        };
        table.InsertOnSubmit(bd);
        db.SubmitChanges();
    }
}