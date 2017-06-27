using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class IssueRepository :IIssue
    {

        private string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private string strQry = "";

        public IEnumerable<Issue> GetIssueByUserId(int ProgramId, string UserId)
        {
            List<Issue> issues = new List<Issue>();

            strQry = "procGetAllIssueByUserID";

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    SqlCommand command = new SqlCommand(strQry, conn);
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@PrgID",Convert.ToInt32(ProgramId));
                    command.Parameters.AddWithValue("@UserName",Convert.ToString(UserId));

                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Issue issue = new Issue();
                            issue.IssueID = Convert.ToInt32(reader["IssueID"]);
                            issue.IssueTitle = Convert.ToString(reader["IssueTitle"]);
                            issue.ProjectID = Convert.ToInt64(reader["ProjectID"]);
                            issue.ProgramID = Convert.ToInt32(reader["ParentID"]);
                            issue.ResourceID = Convert.ToInt64(reader["ResourceID"]);
                            issue.Status = Convert.ToInt32(reader["Status"]);
                            issue.Description = Convert.ToString(reader["Description"]);
                            issue.ItemType = Convert.ToInt32(reader["ItemType"]);
                            issue.ItemName = Convert.ToString(reader["ItemName"]);
                            //issue.CreatedDate = Convert.ToString(reader["CreatedDate"]);
                            //issue.UpdatedDate = Convert.ToString(reader["UpdatedDate"]);

                            issue.CreatedDate = reader["CreatedDate"] == System.DBNull.Value ? null : (string)reader["CreatedDate"];
                            issue.UpdatedDate = reader["UpdatedDate"] == System.DBNull.Value ? null : (string)reader["UpdatedDate"];

                            issue.Severity = Convert.ToString(reader["Severity"]);
                            issue.Aging = Convert.ToInt32(reader["Aging"]);
                            

                            issue.ProjectName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
                            issue.ProgramName = Convert.ToString(reader["ProgramName"]);
                            issues.Add(issue);
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

            return issues.ToArray();
        }

        public bool UpdateIssue(Issue item)
        {
            string strQry = string.Empty;

            int ID = Convert.ToInt32(item.IssueID);
            string IssueTitle = item.IssueTitle.Trim();
            Int64 ProjectID = Convert.ToInt32(item.ProjectID);
            int Status = Convert.ToInt32(item.Status);
            string Description = item.Description.Trim();
          //string RiskResponsePlan = item.RiskResponseActionPlan.Trim();
            string Impact = item.Severity.Trim();
            int ItemType = Convert.ToInt32(item.ItemType);
            string CreatedDate = item.CreatedDate.Trim();
            string UpdatedDate = item.UpdatedDate.Trim();
            
            strQry = "procUpdateIssue"; 

            using (SqlConnection con =
                     new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry,con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@IssueTitle",Convert.ToString(IssueTitle));
                    cmd.Parameters.AddWithValue("@ProjectID",Convert.ToInt32(ProjectID));
                    cmd.Parameters.AddWithValue("@Status",Convert.ToInt32(Status));
                    cmd.Parameters.AddWithValue("@Description",Convert.ToString(Description));
                    cmd.Parameters.AddWithValue("@Impact",Convert.ToString(Impact));
                    cmd.Parameters.AddWithValue("@ID",Convert.ToInt32(ID));
                    cmd.Parameters.AddWithValue("@ItemType",Convert.ToInt32(ItemType));
                    cmd.Parameters.AddWithValue("@CreatedDate",Convert.ToString(CreatedDate));
                    cmd.Parameters.AddWithValue("@UpdatedDate", Convert.ToString(UpdatedDate));

                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;
        }
        
        public bool DeleteIssue(Issue item)
        {
            string query = string.Empty;


            query = @"DELETE FROM Issue " +
                " WHERE IssueID = " + item.IssueID + " ";


            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;
        }

        public Issue GetIssueCount(string level, string UserName)
        {
            Issue oIssue = new Issue();
            string strQuery = "prcGetIssueCount";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQuery, con))
                {

                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Level",Convert.ToString(level));
                    cmd.Parameters.AddWithValue("@UserName", Convert.ToString(UserName));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        //oIssue.IssueCount = "0"; //Convert.ToString(reader["IssueCount"]);
                        oIssue.IssueCount = Convert.ToString(reader["IssueCount"]);
                    }
                }

            }

            return oIssue;

        }
    
    }
}