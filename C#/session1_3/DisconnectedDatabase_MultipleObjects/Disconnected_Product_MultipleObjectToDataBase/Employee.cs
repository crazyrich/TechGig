using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Disconnected_Product_BySir
{
    class Employee
    {
        int id;
        string name;
        int phone;
        string email;
        string project;

        static SqlConnection connection;
        static SqlCommand command;
        static SqlDataAdapter adapter;
        static DataSet dataSet;
        static DataTable dataTable;
        static DataRow dataRow;
        List<Employee> list = new List<Employee>();

        #region CONSTRUCTOR

        public Employee()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            adapter = new SqlDataAdapter("SELECT * FROM Employee3", connection);
            dataSet = new DataSet();
            adapter.Fill(dataSet, "Employee3");
            dataTable = dataSet.Tables[0];
        }
        #endregion

        #region INSERT

        public void InsertRecords()
        {
            bool flag=true;
            while (flag)
            {
               

                Employee e = new Employee();
                Console.WriteLine("ENter ID::");
                e.id = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("ENter name::");
                e.name = Console.ReadLine();
                Console.WriteLine("ENter phone::");
                e.phone = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("ENter email::");
                e.email = Console.ReadLine();
                Console.WriteLine("ENter project::");
                e.project = Console.ReadLine();
                list.Add(e);
                bool flag3 = true;
                while (flag3)
                {
                    Console.WriteLine("Do you want to enter Another Employee? Y/N");
                    char result2 = Convert.ToChar(Console.ReadLine());
                    if (result2 == 'y')
                    {
                        //flag1 = false;
                        break;
                    }
                    if (result2 == 'n')
                    {
                        flag = false;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("CHoose Valid Option!");
                        continue;
                    }
                }
            }
           // Console.WriteLine("INSERTED!");
            //
           
            foreach(var i in list)
            {
                dataRow = dataTable.NewRow();
                dataRow[0] = i.id;
                dataRow[1] = i.name;
                dataRow[2] = i.phone;
                dataRow[3] = i.email;
                dataRow[4] = i.project;

                dataTable.Rows.Add(dataRow);
                SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
                adapter.Update(dataSet, "Employee3"); 
            }
           

        }
        #endregion

        #region UPDATE
        public void UpdateRecords()
        {
            Employee e = new Employee();
            Console.WriteLine("ENter ID::");
            e.id=Convert.ToInt32(Console.ReadLine());
           
            int count=dataTable.Rows.Count;
            for (int i = 0; i < count; i++)
            {
                if (e.id == (int)dataTable.Rows[i][0])
                {
                    Console.WriteLine("ENTER UPDATED VALUES>>>>>>>>");
                    Console.WriteLine("ENter name::");
                    e.name = Console.ReadLine();
                    Console.WriteLine("ENter phone::");
                    e.phone = Convert.ToInt32(Console.ReadLine());
                    Console.WriteLine("ENter email::");
                    e.email = Console.ReadLine();
                    Console.WriteLine("ENter project::");
                    e.project = Console.ReadLine();

                    dataTable.Rows[i][1] = e.name;
                    dataTable.Rows[i][2] = e.phone;
                    dataTable.Rows[i][3] = e.email;
                    dataTable.Rows[i][4] = e.project;
                     Console.WriteLine(" name::" +  dataTable.Rows[i][1]);
                        //
                     SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
                     adapter.Update(dataSet, "Employee3"); 
                }
            }
        }
        #endregion

        #region MAIN
        static void Main(string[] args)
        {
            Employee e = new Employee();
           
            bool flag=true;
            while (flag)
            {
                Console.WriteLine("1 - Insert");
                Console.WriteLine("2 - Update");
                Console.WriteLine("3 - Update");
                Console.WriteLine("4 - Delete");
                Console.WriteLine("5 - Save Permanently To DataBase");
                int choice = Convert.ToInt32(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        e.InsertRecords();
                        break;
                    case 2:
                        e.UpdateRecords();
                        break;
                    default:
                        Console.WriteLine("Choose Valid Option!");
                        break;

                }
                bool flag2 = true;
                while (flag2)
                {
                    Console.WriteLine("DO You Want To Continue? Y/N");
                    char choice2 = Convert.ToChar(Console.ReadLine());
                    if (choice2 == 'y')
                    {
                        break;
                    }
                    if (choice2 == 'n')
                    {
                        flag = false;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Wrong Option !!");
                        continue;
                    }
                }
            }

        }
        #endregion
    }
}
