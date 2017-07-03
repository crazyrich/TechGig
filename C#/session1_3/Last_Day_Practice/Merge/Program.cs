using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace Merge
{
    class Program
    {
        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter;
        DataSet dataSet;
        DataTable dataTable;
        DataRow dataRow;

        SqlConnection connection2;
        SqlCommand command2;
        SqlDataAdapter adapter2;
        DataSet dataSet2;
        DataTable dataTable2;
        DataRow dataRow2;
        public void connection1()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
            connection.Open();
            //Stored Procedure::::
            adapter = new SqlDataAdapter();
            command = new SqlCommand("Proc1", connection);
            command.CommandType = CommandType.StoredProcedure;
            dataTable = new DataTable();
            dataSet = new DataSet();
            adapter.SelectCommand = command;
            adapter.Fill(dataSet);
            //adapter=new SqlDataAdapter("Sales",connection);
            //dataSet = new DataSet();
            //new SqlCommand=command.CommandType = CommandType.StoredProcedure;
            // adapter.Fill(dataSet,"Sales");
            Console.WriteLine("CONNECted");
            dataTable = dataSet.Tables[0];
      

        }
        public void connection01()
        {
            connection2 = new SqlConnection();
            connection2.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
            connection2.Open();
            //Stored Procedure::::
            adapter2 = new SqlDataAdapter();
            command2 = new SqlCommand("Proc1", connection2);
            command2.CommandType = CommandType.StoredProcedure;
            dataTable2 = new DataTable();
            dataSet = new DataSet();
            adapter2.SelectCommand = command2;
            adapter2.Fill(dataSet);
            //adapter=new SqlDataAdapter("Sales",connection);
            
            //new SqlCommand=command.CommandType = CommandType.StoredProcedure;
            // adapter.Fill(dataSet,"Sales");
            Console.WriteLine("CONNECted");
            dataTable = dataSet.Tables[0];
            Console.WriteLine(dataTable.Columns.Count+" ");

            Program obj = new Program();
            obj.connection1();
            dataTable.Merge(obj.dataTable2);
            Console.WriteLine(dataTable.Columns.Count + " ");
            int count = 0;
            Console.WriteLine("::::");
            SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataTable);

            while (dataTable.Rows.Count > count)
            {
                Console.WriteLine("::::");
                dataRow = dataTable.Rows[count];
                //if (!DBNull.Value.Equals(dataRow[3]))
                //{
                //    //dataRow[3]=null; ERROR
                //}
                //else { Console.WriteLine("NULL2"); }
                Console.WriteLine("Sales ID" + dataRow[0] + "  " + dataRow[1] + "  " + dataRow[2] + "  ");
              
                count++;
            }
           
        }
        static void Main(string[] args)
        {
            Program obj = new Program();
            obj.connection01();

        }
    }
}
