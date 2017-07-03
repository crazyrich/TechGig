using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace Ques1_Items_DataFromTable
{

    class Item
    {
        int itemID;
        string itemName;

        static SqlConnection connection;
        static SqlCommand command;
        static SqlDataAdapter adapter;
        static DataSet dataSet;
     
        static DataRow dataRow;
        static DataTable dataTable;
      
        Item()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
            Console.WriteLine("COnnected");
            adapter = new SqlDataAdapter("SELECT * FROM Items", connection);
            
            dataSet = new DataSet();
           adapter.Fill(dataSet, "Items");
            dataTable = dataSet.Tables[0];
        }
        #region SHOW_ALL
        public void ShowAll()
        {
            int count = 0;
            while (count < dataTable.Rows.Count)
            {
                dataRow = dataTable.Rows[count];
                Console.WriteLine(dataRow[0]+" ");
                Console.WriteLine(dataRow[1] + " ");
                Console.WriteLine(dataRow[2] + " ");
                count++;
            }
        
        }
        #endregion

        #region FIND

        public void FindItem()
        {
            Console.WriteLine("Enter item Name you want to search>> ");
            itemID=Convert.ToInt32(Console.ReadLine());
            int count=0;
            bool flag = false;
           
            while (count < dataTable.Rows.Count)
            {
             
                 dataRow = dataTable.Rows[count];
                 if (itemID == (int)dataRow[0])
                 {
                     Console.WriteLine("Item Found Details>>>  ");
                     Console.WriteLine(dataRow[0] + " ");
                     Console.WriteLine(dataRow[1] + " ");
                     Console.WriteLine(dataRow[2] + " ");
                     flag = true;
                     break;
                 }
                 else
                 {
                     count++;
                     continue;
                 }
             
            }
            if (flag == true)
            {
                Console.WriteLine("ITEM FOUND!!!");
            }
            else
            {

                Console.WriteLine("NOT FOUND!!");
            }
        }
        #endregion

        #region UPDATE
        public void UpdateItem()
        {
            int count = 0;
            Console.WriteLine("Enter Item ID you Want to Update");
            int id=Convert.ToInt32(Console.ReadLine());
            while (count < dataTable.Rows.Count)
            {

                if (id == (int)dataTable.Rows[count][0])
                {
                    dataRow = dataTable.Rows[count];
                    break;
                }
                else
                {
                    count++;
                    continue;
                }

            }
            Console.WriteLine("Enter Updated Name:: ");
            dataRow[1]=Console.ReadLine();

            Console.WriteLine("Enter Updated PreprationTime:: ");
            dataRow[2] =Convert.ToInt32(Console.ReadLine());

            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Items");
           
        }
        #endregion

        #region ADD
        public void AddItem()
        {
    
            dataRow = dataTable.NewRow();
            Console.WriteLine("Enter ID ");
            dataRow[0] = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Name ");
            dataRow[1] = Console.ReadLine();
            Console.WriteLine("Enter PreprationTime ");
            dataRow[2] = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine(" " + dataRow[1] + " " + dataRow[0]);

            dataTable.Rows.Add(dataRow);

            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Items");
           
        }

        #endregion

        #region DELETE ONE
        public void DeleteItem()
        {
            int count = 0;
            Console.WriteLine("Enter ID You Want to DELETE::  ");
            int id= Convert.ToInt32(Console.ReadLine());

            while (count < dataTable.Rows.Count)
            {

                if (id == (int)dataTable.Rows[count][0])
                {
                    dataRow = dataTable.Rows[count];
                    break;
                }
                else
                {
                    count++;
                    continue;
                }

            }
            dataRow.Delete();
            Console.WriteLine("Row Deleted!!");

            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Items");
           
        }

        #endregion

        #region DELETE ALL
        public void DeleteAll()
        {
            int count = 0;
            while (count < dataTable.Rows.Count)
            {
                dataRow = dataTable.Rows[count];
                dataRow.Delete();
                count++;
                Console.WriteLine("count"+ count);
            }
            Console.WriteLine("ALL DELETED!");


            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Items");
           
        }


        #endregion

        #region BULK UPDATE
        public void BulkUpdate()
        {
            int count = 0;
            Console.WriteLine("Enter the rise percentage>>  ");
            double rise = Convert.ToDouble(Console.ReadLine());
            double rise1 = rise / 100;
            bool flag = false;
            while (count < dataTable.Rows.Count)
            {
                flag = true;
                    dataRow = dataTable.Rows[count];
                    Console.WriteLine("" + dataRow[3]);
                    decimal a=(decimal)rise1*(decimal)dataRow[3]+(decimal)dataRow[3];
                    Console.WriteLine(" "+a);
                    dataRow[3]=a;
                    count++;

            }
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Items");
          
            if (flag == true)
            {
                SqlConnection connection2;
                SqlDataAdapter adapter2;
                DataSet dataSet2;
                DataTable dataTable2;
                DataRow dataRow2;
                connection2 = new SqlConnection();

                connection2.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
                adapter2 = new SqlDataAdapter("select *  from logTbale", connection2);
                dataSet2 = new DataSet();
                adapter2.Fill(dataSet2,"logTbale");
                dataTable2 = dataSet2.Tables[0];
                
                dataRow2 = dataTable2.NewRow();

                dataRow2[0] = count;
                dataRow2[1] = DateTime.Now.Date;
                dataRow2[2] = DateTime.Now.TimeOfDay;
                dataTable2.Rows.Add(dataRow2);
                //merging

                dataTable.Merge(dataTable2);
                int count2 = 0;
                while (count2 < dataTable.Rows.Count)
                {
                   
                    dataRow = dataTable.Rows[count];
                    Console.WriteLine("" + dataTable.Columns.Count);
                   
                    count++;

                }
                //merging ends
               

                SqlCommandBuilder builder2 = new SqlCommandBuilder(adapter2);
                adapter2.Update(dataSet2, "logTbale");

            }
            else
            {
                Console.WriteLine("");
            }
          
        }

        #endregion

        static void Main(string[] args)
        {
            bool Flag=true;
            while (Flag)
            {
                Console.WriteLine("CHoose The Options Below>>  ");
                Console.WriteLine("a) Show all Items");
                Console.WriteLine("b) Find an Item");
                Console.WriteLine("c) Update an item");
                Console.WriteLine("d) Add an item");
                Console.WriteLine("e) Delete an Item");
                Console.WriteLine("f) Delete All Items");
                Console.WriteLine("g) EXIT");

                Item obj = new Item();
                char choice = Convert.ToChar(Console.ReadLine());
                switch (choice)
                {
                    case 'a':
                        obj.ShowAll();
                        break;
                    case 'b':
                        obj.FindItem();
                        break;
                    case 'c':
                        obj.UpdateItem();
                        break;
                    case 'd':
                        obj.AddItem();
                        break;
                    case 'e':
                        obj.DeleteItem();
                        break;
                    case 'f':
                        obj.DeleteAll();
                        break;
                    case 'g':
                        Flag = false;
                        break;
                    default:
                        Console.WriteLine("Choose Valid Option!!");
                       break;

                }
            }
        }
    }
}
