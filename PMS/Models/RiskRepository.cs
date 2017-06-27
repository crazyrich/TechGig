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
    public class RiskRepository : IRiskRepository
    {

        private string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        private string strQry = "";

        //public IEnumerable<Risk> GetAll()
        //{
        //    List<Risk> risks = new List<Risk>();

        //    using (SqlConnection conn = new SqlConnection(connString))
        //    {
        //        try
        //        {
        //            conn.Open();

        //            strQry = " SELECT RiskID,RiskTitle,ProjectID,ResourceID,Status,Description,RiskResponsePlan,MitigationLog,StatusReportUpdate,";
        //            strQry += " flgMonProgIng,flgTueProgExe,flgKPPDXDXMeet,ItemType,Path FROM Risk ";

        //            SqlCommand command = new SqlCommand(strQry, conn);
        //            SqlDataReader reader = command.ExecuteReader();

        //            if (reader.HasRows)
        //            {
        //                while (reader.Read())
        //                {
        //                    Risk risk = new Risk();
        //                    risk.RiskID = Convert.ToInt32(reader["RiskID"]);
        //                    risk.RiskTitle = Convert.ToString(reader["RiskTitle"]);
        //                    risk.ProjectID = Convert.ToInt64(reader["ProjectID"]);
        //                  //  risk.Program_ID = Convert.ToInt64(reader["Program_ID"]);
        //                    risk.ResourceID = Convert.ToInt64(reader["ResourceID"]);
        //                    risk.Status = Convert.ToInt32(reader["Status"]);
        //                    risk.Description = Convert.ToString(reader["Description"]);
        //                    risk.StatusReportUpdate = Convert.ToString(reader["StatusReportUpdate"]);
        //                    risk.RiskResponseActionPlan = Convert.ToString(reader["RiskResponsePlan"]);
        //                    risk.MitigationLog = Convert.ToString(reader["MitigationLog"]);
        //                    risk.FlagforMonProgramIntgMtg = Convert.ToInt32(reader["flgMonProgIng"]);
        //                    risk.FlagforTuesExecMtg = Convert.ToInt32(reader["flgTueProgExe"]);
        //                    risk.FlagforKPPDXMeeting = Convert.ToInt32(reader["flgKPPDXDXMeet"]);
        //                    risk.ItemType = Convert.ToString(reader["ItemType"]);
        //                    risk.Path = Convert.ToString(reader["Path"]);



        //                    risks.Add(risk);
        //                }
        //            }

        //            conn.Close();
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //            // module to logg the exception
        //        }
        //    } //end using

        //    return risks.ToArray();
        //}

        //public Risk Get(string ID)
        //{
        //    Risk risk = new Risk();

        //    strQry = " SELECT RiskID,RiskTitle,ProjectID,ResourceID,Status,Description,RiskResponsePlan,MitigationLog,StatusReportUpdate, ";
        //    strQry += " flgMonProgIng,flgTueProgExe,flgKPPDXDXMeet,ItemType,Path FROM Risk where RiskID = " + ID + " ";

        //    using (SqlConnection conn = new SqlConnection(connString))
        //    {
        //        try
        //        {
        //            conn.Open();
        //            SqlCommand command = new SqlCommand(strQry, conn);
        //            SqlDataReader reader = command.ExecuteReader();

        //            if (reader.HasRows)
        //            {
        //                while (reader.Read())
        //                {
        //                    risk.RiskID = Convert.ToInt32(reader["RiskID"]);
        //                    risk.RiskTitle = Convert.ToString(reader["RiskTitle"]);
        //                    risk.ProjectID = Convert.ToInt64(reader["ProjectID"]);
        //                   // risk.Program_ID = Convert.ToInt64(reader["Program_ID"]);
        //                    risk.ResourceID = Convert.ToInt64(reader["ResourceID"]);
        //                    risk.Status = Convert.ToInt32(reader["Status"]);
        //                    risk.Description = Convert.ToString(reader["Description"]);
        //                    risk.StatusReportUpdate = Convert.ToString(reader["StatusReportUpdate"]);
        //                    risk.RiskResponseActionPlan = Convert.ToString(reader["RiskResponsePlan"]);
        //                    risk.MitigationLog = Convert.ToString(reader["MitigationLog"]);
        //                    risk.FlagforMonProgramIntgMtg = Convert.ToInt32(reader["flgMonProgIng"]);
        //                    risk.FlagforTuesExecMtg = Convert.ToInt32(reader["flgTueProgExe"]);
        //                    risk.FlagforKPPDXMeeting = Convert.ToInt32(reader["flgKPPDXDXMeet"]);
        //                    risk.ItemType = Convert.ToString(reader["ItemType"]);
        //                    risk.Path = Convert.ToString(reader["Path"]);

        //                }
        //            }
        //            conn.Close();
        //        } //end try
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //            // module to logg the exception
        //        }
        //    }//end using

        //    return risk;
        //}

        public bool UpdateRisk(Risk item)
        {
            string strQry = string.Empty;

            int ID = Convert.ToInt32(item.RiskID);
            string RiskTitle = item.RiskTitle.Trim();
            Int64 ProjectID = Convert.ToInt32(item.ProjectID);
            int Status = Convert.ToInt32(item.Status);
            string Description = item.Description.Trim();
         //   string RiskResponsePlan = item.RiskResponseActionPlan.Trim();
            string Impact = item.Impact.Trim();
            int ItemType = item.ItemType;

            strQry = "procUpdateRisk";

            using (SqlConnection con =
                     new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RiskTitle",Convert.ToString(RiskTitle));
                    cmd.Parameters.AddWithValue("@ProjectID",Convert.ToInt32(ProjectID));
                    cmd.Parameters.AddWithValue("@Status",Convert.ToInt32(Status));
                    cmd.Parameters.AddWithValue("@Description",Convert.ToString(Description));
                    cmd.Parameters.AddWithValue("@Impact",Convert.ToString(Impact));
                    cmd.Parameters.AddWithValue("@ID",Convert.ToInt32(ID));
                    cmd.Parameters.AddWithValue("@ItemType",Convert.ToInt32(ItemType));
                   
                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;

        }

        public IEnumerable<Risk> GetRiskByUserId(int ProgramId, string UserId)
        {
            List<Risk> risks = new List<Risk>();

            strQry = "procGetAllRiskByUserID";

            using (SqlConnection conn = new SqlConnection(connString))
            {
                try
                {
                    conn.Open();
                    SqlCommand command = new SqlCommand(strQry, conn);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@PrgID", Convert.ToInt32(ProgramId));
                    command.Parameters.AddWithValue("@UserName",Convert.ToString(UserId));

                    SqlDataReader reader = command.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            Risk risk = new Risk();
                            risk.RiskID = Convert.ToInt32(reader["RiskID"]);
                            risk.RiskTitle = Convert.ToString(reader["RiskTitle"]);
                            risk.ProjectID = Convert.ToInt64(reader["ProjectID"]);
                            risk.Program_ID = Convert.ToInt32(reader["ParentID"]);
                            risk.ResourceID = Convert.ToInt64(reader["ResourceID"]);
                            risk.Status = Convert.ToInt32(reader["Status"]);
                            risk.Description = Convert.ToString(reader["Description"]);
                            risk.StatusReportUpdate = Convert.ToString(reader["StatusReportUpdate"]);
                            risk.RiskResponseActionPlan = Convert.ToString(reader["RiskResponsePlan"]);
                            risk.MitigationLog = Convert.ToString(reader["MitigationLog"]);
                            risk.FlagforMonProgramIntgMtg = reader["flgMonProgIng"] == System.DBNull.Value ? default(Int32) : (Int32)reader["flgMonProgIng"];
                            risk.FlagforTuesExecMtg = reader["flgTueProgExe"] == System.DBNull.Value ? default(Int32) : (Int32)reader["flgTueProgExe"];
                            risk.FlagforKPPDXMeeting = reader["flgKPPDXDXMeet"] == System.DBNull.Value ? default(Int32) : (Int32)reader["flgKPPDXDXMeet"];
                            risk.ItemType = Convert.ToInt32(reader["ItemType"]);
                            risk.ItemName = Convert.ToString(reader["ItemName"]);
                            risk.Path = Convert.ToString(reader["Path"]);
                            risk.Impact = Convert.ToString(reader["Impact"]);


                            risk.ProjectName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
                            risk.ProgramName = Convert.ToString(reader["ProgramName"]);
                            risks.Add(risk);
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

            return risks.ToArray();
        }

        public bool DeleteRisk(Risk item)
        {
            string query = string.Empty;


            query = @"DELETE FROM Risk " +
                " WHERE RiskID = " + item.RiskID + " ";


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

        public IEnumerable<UserPrograms> GetPrograms(int Id)
        {
            List<UserPrograms> programData = new List<UserPrograms>();

            SqlConnection con = new SqlConnection(connString);


            string query = string.Empty;

            query = "select Distinct PName ,pm.PID ,ISNULL(pm.ParentID,0) as ParentID From ProgramUserMapping pum, ProgrammeManager pm where pum.PID=pm.PID and UserID = 1 ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    UserPrograms UserPrograms = new UserPrograms();

                    UserPrograms.PID = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                    UserPrograms.PName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];

                    programData.Add(UserPrograms);
                }

                return programData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public IEnumerable<UserProjects> GetProjects(int Id)
        {
            List<UserProjects> projectData = new List<UserProjects>();

            SqlConnection con = new SqlConnection(connString);


            string query = string.Empty;

            query = "select Distinct PName,pm.PID,pm.ParentID From ProjectUserMapping pum, ProgrammeManager pm where pum.PID=pm.PID and UserID = 1 and pum.ParentID = 1  ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    UserProjects UserProjects = new UserProjects();

                    UserProjects.PID = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                    UserProjects.PName = reader["PName"] == System.DBNull.Value ? default(string) : (string)reader["PName"];
                    UserProjects.ParentID = reader["ParentID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ParentID"];

                    projectData.Add(UserProjects);
                }

                return projectData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public IEnumerable<ItemType> GetItemType()
        {
            List<ItemType> itemTypeData = new List<ItemType>();

            SqlConnection con = new SqlConnection(connString);


            string query = string.Empty;

            query = "select ItemID,ItemName from ItemType ";
            SqlCommand cmd = new SqlCommand(query);
            cmd.CommandType = CommandType.Text;
            cmd.Connection = con;
            try
            {
                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    ItemType itemType = new ItemType();

                    itemType.ItemID = reader["ItemID"] == System.DBNull.Value ? default(int) : (int)reader["ItemID"];
                    itemType.ItemName = reader["ItemName"] == System.DBNull.Value ? default(string) : (string)reader["ItemName"];

                    itemTypeData.Add(itemType);
                }

                return itemTypeData;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
            }
        }

        public Risk GetRiskCount(string level, string UserName)
        {
            Risk oRisk = new Risk();
            string strQuery = "prcGetRiskCount";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQuery, con))
                {

                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName",Convert.ToString(UserName));
                    cmd.Parameters.AddWithValue("@Level",Convert.ToString(level));
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        oRisk.RiskCount = Convert.ToString(reader["RiskCount"]);
                    }
                }

            }

            return oRisk;

        }
    }
}