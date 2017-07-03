using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShowBalance
{
    public class ShowBalance : Interface1
    {
        SqlConnection con;
        SqlDataAdapter adapter;
        DataSet dataSet;
        DataRow dataRow;
        
        
        public string Check_Balance(int mobileNum)
        {
            con = new SqlConnection("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=TestMVCentity;uid=sa;pwd=info123!");
            Console.WriteLine("CONNECTED !");
            adapter = new SqlDataAdapter("SELECT Balance from ShowBalance where MobileNum=@num", con);
            //int num = Convert.ToInt32(Console.ReadLine());
            adapter.SelectCommand.Parameters.Add("num",mobileNum);
            dataSet = new DataSet();
            adapter.Fill(dataSet);
            DataTable dataTable = dataSet.Tables[0];
            dataRow = dataTable.Rows[0];
            return Convert.ToString(dataRow[1]);
           // Console.WriteLine("Balance is "+dataRow[1]);

        }

        public string Check_Validity(int mobileNum)
        {
            con = new SqlConnection("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=TestMVCentity;uid=sa;pwd=info123!");
            Console.WriteLine("CONNECTED !");
            adapter = new SqlDataAdapter("SELECT Balance from ShowBalance where MobileNum=@num", con);
            //int num = Convert.ToInt32(Console.ReadLine());
            adapter.SelectCommand.Parameters.Add("num", mobileNum);
            dataSet = new DataSet();
            adapter.Fill(dataSet);
            DataTable dataTable = dataSet.Tables[0];
            dataRow = dataTable.Rows[0];
            return Convert.ToString(dataRow[2]);
        }
    }
}
