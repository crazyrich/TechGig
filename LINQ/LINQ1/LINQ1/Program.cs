using System;
using System.Collections.Generic;
using System.Linq;

using System.Data.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ1
{
    class Program
    {
        public static void ShowAll()
        {
            DataContext context = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
            Console.Write("CONNECTED !");
            Table<Product> table = context.GetTable<Product>();
            var result = from Products in table
                         select Products;
            foreach (Product i in result)
            {
                Console.WriteLine(i.ProductID + "<>" + i.NAME + "<>" + i.SUPPLIER + "<>" + i.BRAND + "<>" );
            }
        }
        public static void Insert()
        {
            DataContext context = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
            Console.Write("CONNECTED !");
            Table<Product> table = context.GetTable<Product>();
            Product prod = new Product();
            prod.ProductID = "P005";
            prod.NAME = "Keyboard 2";
            prod.SUPPLIER = "DELL";
            prod.BRAND = "DELL";
            

            table.InsertOnSubmit(prod);
            context.SubmitChanges();
            Console.WriteLine("INSERTED !");
        
        }
        public static void Update()
        {
            DataContext context = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
            Console.Write("CONNECTED !");
            Table<Product> table = context.GetTable<Product>();

            var result = from prod in table
                         select prod;
            foreach(Product i in result)
            {
                if(i.ProductID.Trim()=="P005")
                {
                    i.NAME = "CoCOo Drink";
                    
                }
            }
            context.SubmitChanges();
            Console.WriteLine("UPDATED !!");
        }

        public static void Delete()
        {
            DataContext context = new DataContext("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!");
            Console.Write("CONNECTED !");
            Table<Product> table = context.GetTable<Product>();

            var result = from prod in table
                         select prod;
            foreach (Product i in result)
            {
                if (i.ProductID.Trim() == "P005")
                {
                    table.DeleteOnSubmit(i);
                }
            }
            context.SubmitChanges();
            Console.WriteLine("Deleted !!");
        }
        static void Main(string[] args)
        {
            Delete();
           // Update();
           // ShowAll();
            //Insert();

        }
    }
}
