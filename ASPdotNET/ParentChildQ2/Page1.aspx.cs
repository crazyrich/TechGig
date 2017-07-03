using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Page1 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        richEntities3 db = new richEntities3();
        SmartPhone smart = new SmartPhone()
        {

            MobileID = 1001,
           
            Price = 10000,
            ModelNo = "123.12.1",
            AndroidVer = "KitKat",
            
        };
        //db.Mobiles.Add(smart);
        db.Mobiles.Add(smart);
        db.SaveChanges();
    }
}