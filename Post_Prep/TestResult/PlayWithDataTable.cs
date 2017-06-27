using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestResult
{
    class PlayWithDataTable
    {
        
       
        static void Main(string[] args)
        {
            
            DataTable dataTable = new DataTable();
            dataTable.Columns.Add("ID", typeof(int));
            dataTable.Columns.Add("Title", typeof(string));
            dataTable.Columns.Add("State", typeof(string));

            for (int i = 1; i < 20;i++ )
            {
                DataRow dr = dataTable.NewRow();
                dr["ID"] = 1;
                dr["Title"] = "Title";
                if (i % 2 == 0)
                {
                    dr["State"] = "Passed";
                }
                else { dr["State"] = "Failed"; }
                dataTable.Rows.Add(dr);
            }


            DataTable resultTable = new DataTable();
            resultTable.Columns.Add("ID", typeof(int));
            resultTable.Columns.Add("Title", typeof(string));
            resultTable.Columns.Add("Total", typeof(int));
            resultTable.Columns.Add("Passed", typeof(int));
            resultTable.Columns.Add("Failed", typeof(int));

            int iPassed = 0;
            int iFailed = 0;
            int iTotal = 0;
            List<string> ignoreList = new List<string>();
            for (int i = 0; i < dataTable.Rows.Count;i++ )
            {
                if (!ignoreList.Contains(dataTable.Rows[i]["ID"].ToString()))
                {
                string ID;
                ID = dataTable.Rows[i]["ID"].ToString();
                ignoreList.Add(ID);
               
                for (int j = 0; j < dataTable.Rows.Count; j++)
                {
                    if (dataTable.Rows[j]["ID"].ToString() == dataTable.Rows[i]["ID"].ToString())
                    {
                         if (dataTable.Rows[j]["State"].ToString().Contains("Passed"))
                        {
                            iPassed++;
                        }
                        else if (dataTable.Rows[j]["State"].ToString().Contains("Failed"))
                        {
                             iFailed++;
                        }
                         iTotal++;
                    }
                }
                DataRow dr = resultTable.NewRow();
                dr["ID"] = ID;
                dr["Passed"] = iPassed;
                dr["Failed"] = iFailed;
                dr["Total"] = iTotal;

                resultTable.Rows.Add(dr);
                }
            
            }
           
        }
    }
}
