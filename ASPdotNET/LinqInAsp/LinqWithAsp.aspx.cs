using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Data.Linq;
using System.Web.UI.WebControls;

public partial class LinqWithAsp : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btn_Insert_Click(object sender, EventArgs e)
    {
        DataContext db = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=master;uid=sa;pwd=info123!;");

        Table<Employee> table = db.GetTable<Employee>();
        Employee obj = new Employee()
        {
            Id = "E001",
            Name = "Ayushi",
            Phone = "1234567890123",
            Email = "Ashok.gmail.com,",
            Salary = 1000,
        };
        table.InsertOnSubmit(obj);
        db.SubmitChanges();
    }


    protected void btn_Update_Click(object sender, EventArgs e)
    {
        
    }
    protected void btn_Delete_Click(object sender, EventArgs e)
    {
        DataContext db = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=master;uid=sa;pwd=info123!;");

        Table<Employee> table = db.GetTable<Employee>();
        
        var result = from emp1 in table
                     select emp1;
        foreach (Employee i in result)
        {
            if (i.Id.Trim() == "E001")
            {
                table.DeleteOnSubmit(i);
            }
        }
        db.SubmitChanges();

    }
}