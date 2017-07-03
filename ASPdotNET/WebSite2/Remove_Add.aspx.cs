using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Remove_Add : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Button1_Click(object sender, EventArgs e)
    {

        for (int i = ListBox1.Items.Count-1; i >= 0;i-- )
        {
            if (ListBox1.Items[i].Selected)
            {
                //for (int j = ListBox2.Items.Count-1; j >= 0; j--)
                //{
                if (ListBox2.Items.Contains(ListBox1.Items[i]))
                {
                    break;
                }
                else
                {
                    ListBox2.Items.Add(ListBox1.Items[i]);
                    ListBox1.Items.Remove(ListBox1.Items[i]);
                }
                //}

            }
        }
    }
    protected void Button2_Click(object sender, EventArgs e)
    {

        for (int i = ListBox1.Items.Count - 1; i >= 0; i--)
        {
                //for (int j = ListBox2.Items.Count-1; j >= 0; j--)
                //{
                if (ListBox2.Items.Contains(ListBox1.Items[i]))
                {
                    break;
                }
                else
                {
                    ListBox2.Items.Add(ListBox1.Items[i]);
                    ListBox1.Items.Remove(ListBox1.Items[i]);
                }
                //}

            
        }
    }
}
