using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using PortfolioWebApp.Models;
using System.Data.OleDb;
using System.IO;
using System.Data;

namespace PortfolioWebApp.Models
{
    public class FinanceRepository : IFinanceRepository
    {
        string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        string strQry;
        public IEnumerable<Finance> GetAll(string ID, string UserName)
        {

            List<Finance> Finances = new List<Finance>();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    string PrgId = ID;
                    strQry = "prcGetFinance";
                    SqlCommand command = new SqlCommand(strQry, conn);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@PrgID", PrgId);
                    command.Parameters.AddWithValue("@UserName", UserName);
                    SqlDataReader reader = command.ExecuteReader();


                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Finance Finance = new Finance();

                            //   Finance.FinanceID = Convert.ToInt32(reader["FinanceID"]);
                            Finance.ProgramID = Convert.ToInt32(reader["PID"]);
                            Finance.AllocatedBudget = Convert.ToDouble(reader["AllocatedBudget"]);
                            Finance.UsedBudget = Convert.ToDouble(reader["UsedBudget"]);
                            Finance.RevisedBudget = Convert.ToDouble(reader["RevisedBudget"]);
                           //  Finance.CreatedDate = Convert.ToString(reader["CreatedDate"]);
                            //  Finanace.UpdatedDate = Convert.ToString(reader["UpdatedDate"]);
                           //  Finanace.Comments = Convert.ToString(reader["Comments"]);
                            Finance.ProgramName = Convert.ToString(reader["PName"]);
                            Finances.Add(Finance);
                        }
                    }

                    conn.Close();
                }
                catch (Exception ex)
                {
                    throw ex;
                    // module to logg the exception
                }
            } //end using

            return Finances.ToArray();

        }

        public IEnumerable<Finance> GetFinanceDetails(string ID)
        {

            List<Finance> Finances = new List<Finance>();

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    string PID = ID;
                    strQry = "prcGetFinanceDetails";
                    SqlCommand command = new SqlCommand(strQry, conn);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@PID", PID);
                    SqlDataReader reader = command.ExecuteReader();


                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Finance Finance = new Finance();

                            Finance.FinanceID = Convert.ToInt32(reader["FinanceID"]);
                            Finance.ProjectID = Convert.ToInt32(reader["PID"]);
                            Finance.ProgramID = Convert.ToInt32(reader["ParentID"]);
                            Finance.AllocatedBudget = Convert.ToDouble(reader["AllocatedBudget"]);
                            Finance.UsedBudget = Convert.ToDouble(reader["UsedBudget"]);
                            Finance.RevisedBudget = Convert.ToDouble(reader["RevisedBudget"]);
                            Finance.CreatedDate = Convert.ToString(reader["CreatedDate"]);
                            Finance.UpdatedDate = Convert.ToString(reader["UpdatedDate"]);
                            Finance.Comments = Convert.ToString(reader["Comments"]);
                            Finance.ProgramName = Convert.ToString(reader["ProgrammeName"]);
                            Finance.ProjectName = Convert.ToString(reader["ProjectName"]);

                            Finances.Add(Finance);
                        }
                    }

                    conn.Close();
                }
                catch (Exception ex)
                {
                    throw ex;
                    // module to logg the exception
                }
            } //end using

            return Finances.ToArray();

        }

        public Finance Get(int ID)
        {
            Finance Finance = new Finance();

            strQry = "select f.FinanceID,f.ProgramID,p.Program_Name,f.AllocatedBudget,f.UsedBudget,f.RevisedBudget,f.Comments,f.CreatedDate,f.UpdatedDate";
            strQry += "from FinanceMaster f,Program_Master p where p.Program_Id=f.ProgramID and f.ProgramID=" + ID;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    SqlCommand command = new SqlCommand(strQry, conn);
                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Finance.FinanceID = Convert.ToInt32(reader["FinanceID"]);
                            Finance.ProgramID = Convert.ToInt32(reader["ProgramID"]);
                            Finance.AllocatedBudget = Convert.ToDouble(reader["AllocatedBudget"]);
                            Finance.UsedBudget = Convert.ToDouble(reader["UsedBudget"]);
                            Finance.RevisedBudget = Convert.ToDouble(reader["RevisedBudget"]);
                            Finance.CreatedDate = Convert.ToString(reader["CreatedDate"]);
                            Finance.UpdatedDate = Convert.ToString(reader["UpdatedDate"]);
                            Finance.Comments = Convert.ToString(reader["Comments"]);
                            Finance.ProgramName = Convert.ToString(reader["ProgramName"]);

                        }
                    }
                    conn.Close();
                } //end try
                catch (Exception ex)
                {
                    throw ex;
                    // module to logg the exception
                }
            }//end using

            return Finance;
        }

        public bool UpdateFinance(Finance item)
        {
            string strQry = "";
            if (item.FinanceID != 0)
            {
                strQry = string.Format("UPDATE FinanceMaster " +
                         " SET AllocatedBudget= '{0}' ,UsedBudget= '{1}',RevisedBudget= '{2}'" +
                         " WHERE PID = '{3}' ", item.AllocatedBudget, item.UsedBudget, item.RevisedBudget, item.ProjectID);
            }
            else if (item.FinanceID == 0)
            {
                if (item.ProjectID != 0)
                {
                    strQry = string.Format("Insert into FinanceMaster(PID,AllocatedBudget,UsedBudget,RevisedBudget,Comments,CreatedDate,UpdatedDate) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}')",
                        item.ProjectID, item.AllocatedBudget, item.UsedBudget, item.RevisedBudget, null, null,null);
                }
            }

            bool isSuccess = false;

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    if (strQry != "")
                    {
                        using (SqlCommand cmd = new SqlCommand(strQry, conn))
                        {

                            conn.Open();
                            cmd.ExecuteNonQuery();
                            conn.Close();
                            isSuccess = true;
                        }
                    }
                    else{
                    isSuccess = true;
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                    // module to logg the exception
                }
            }

            return isSuccess;
        }


    }
}