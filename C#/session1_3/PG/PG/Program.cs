
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Threading;

namespace Product_Sales
{
    #region  PRODUCT Class
    class Product
    {
        #region PRODUCT 

        public int productID;
        public string customerName;
        public int qty;
        public float price;
        public float totalPrice;
        public string email;
        public int phone;
        public static void ShowMenu()
        {
            Console.WriteLine("Products Available are:::::");
            Console.WriteLine("1:: Mouse");
            Console.WriteLine("2:: KeyBoard");
            Console.WriteLine("3:: Pendrive");
            Console.WriteLine("Product ID:::");
        }
    }
    #endregion
    #endregion
    #region II Program
    class Program
    {
        public delegate void del1();

      
        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter;
        DataSet dataSet;
        DataTable dataTable;
        DataRow dataRow;
        public Program()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
            connection.Open();
            //Stored Procedure::::DISCONNECTED
            adapter = new SqlDataAdapter();
            command = new SqlCommand("Proc1",connection);
            command.CommandType = CommandType.StoredProcedure;
            dataTable = new DataTable();
            adapter.SelectCommand = command;
            dataSet = new DataSet();
            adapter.Fill(dataSet);
            //adapter=new SqlDataAdapter("Sales",connection);
          
            //new SqlCommand=command.CommandType = CommandType.StoredProcedure;
           // adapter.Fill(dataSet,"Sales");
            Console.WriteLine("CONNECted");
            dataTable = dataSet.Tables[0];
                             
        }
        public float? CalcPrice(Product p)
        {
            if (p.productID == 1)
            {
                p.price = 500;
                p.totalPrice = p.qty * p.price;
            }
            else if (p.productID == 2)
            {
                p.price = 800;
                p.totalPrice = p.qty * p.price;

            }
            else if (p.productID == 3)
            {
               p.price = 300;
                p.totalPrice = p.qty * p.price;
            }
            return p.totalPrice;
        }
        public List<Product> InputFromUser()
        {
            List<Product> list = new List<Product>();
            Product p = new Product();
            p.productID = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Quantity:::");
            p.qty = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Customer Name:::");
            p.customerName = Console.ReadLine();
            Console.WriteLine("Email:::");
            p.email = Console.ReadLine();
            Console.WriteLine("phone");
            p.phone = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine(CalcPrice(p));
            list.Add(p);
            return list;
        }
        public void InsertToDB()
        {
            Product.ShowMenu();
            List<Product> list=InputFromUser();
            dataRow = dataTable.NewRow();
            foreach (var i in list)
            {
                dataRow[2] = i.customerName;
                dataRow[1] = i.productID;
                dataRow[3] = i.qty;
                dataRow[4] = i.price;
                dataRow[5] = i.totalPrice;
                dataRow[6] = i.email;
                dataRow[7] = i.phone;
                Console.WriteLine("  "+dataRow[7]);
                dataTable.Rows.Add(dataRow);
            }
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataTable);
        }

        public void FetchFromDB()
        {
            int count=0;
            while (dataTable.Rows.Count > count)
            {
                Console.WriteLine("::::");
                dataRow = dataTable.Rows[count];
                //if (!DBNull.Value.Equals(dataRow[3]))
                //{
                //    //dataRow[3]=null; ERROR
                //}
                //else { Console.WriteLine("NULL2"); }
                Console.WriteLine("Sales ID"+dataRow[0]+"  "+dataRow[1]+"  "+dataRow[2]+"  ");
                WriteToFile();
                count++;
            }
        
        }

        public void WriteToFile()
        {
            FileStream fs = new FileStream("D:\\C#\\fh\\FromDB.txt",FileMode.Append,FileAccess.Write,FileShare.Write);
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine("Sales ID" + dataRow[0] + "  " + dataRow[1] + "  " + dataRow[2] + "  ");
            sw.Close();
            fs.Close();
        }
        static void Main(string[] args)
        {
            Program p = new Program();
            
            //del1 delobj = new del1(p.InsertToDB);
            //delobj = new del1(p.WriteToFile);
            //Console.WriteLine("Written to file also!");
            //delobj = new del1(p.FetchFromDB);
            //delobj();

            ThreadStart ts1 = new ThreadStart(p.InsertToDB);
            ThreadStart ts2 = new ThreadStart(p.FetchFromDB);

            Thread t1 = new Thread(ts1);
            Thread t2 = new Thread(ts2);
            t1.Start();
            t1.Join();
            t2.Start();

        }
    }
}
        #endregion