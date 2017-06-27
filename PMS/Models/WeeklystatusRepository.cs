using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace PortfolioWebApp.Models
{
    public class WeeklystatusRepository : IWeeklystatus
    {
        public IEnumerable<Weeklystatus> GetAll()
        {
            List<Weeklystatus> weeklylist = new List<Weeklystatus>();

            string query = @"SELECT 
                            W.WeeklyStatus_Id,
                            W.Project_Id,
                            W.Program_Id,
                            W.P_Desc,
                            W.Resource_Id,
                            W.Status,
                            W.KeyAccomplishments,
                            W.KeyIssues,
                            W.FuturePlan,
                            W.Comments,
                            PRG.Program_Name,
                            PRJ.Project_Name,
                            RM.Resource_Name,
                            REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, W.TRDATE,   1), 111), '/', '-') TRDATE,
                            (case when W.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'CurrentWeek' WHEN W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PreviousWeek' WHEN W.TRDATE >  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PostWeek' end) WEEKSTATUS
                            FROM WEEKLY_STATUS W LEFT JOIN Program_Master PRG ON W.PROGRAM_ID=PRG.PROGRAM_ID
                             LEFT JOIN PROJECT_MASTER PRJ ON W.PROJECT_ID=PRJ.PROJECT_ID
                             LEFT JOIN ResourceDetails RM ON W.RESOURCE_ID=RM.RESOURCE_ID";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Weeklystatus weeklystatus = new Weeklystatus();

                        weeklystatus.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];

                        weeklystatus.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

                        weeklystatus.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

                        weeklystatus.Project_Name = reader["Program_Name"] == System.DBNull.Value ? null : (string)reader["Program_Name"];

                        weeklystatus.Project_Desc = reader["P_Desc"] == System.DBNull.Value ? null : (string)reader["P_Desc"];

                        weeklystatus.Resource_Id = reader["Resource_Id"] == System.DBNull.Value ? default(int) : (int)reader["Resource_Id"];

                        weeklystatus.Resource_Name = reader["Resource_Name"] == System.DBNull.Value ? null : (string)reader["Resource_Name"];

                        weeklystatus.Status = reader["Status"] == System.DBNull.Value ? null : (string)reader["Status"];

                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];

                        weeklystatus.KeyIssues = reader["KeyIssues"] == System.DBNull.Value ? null : (string)reader["KeyIssues"];

                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];

                        weeklystatus.Comments = reader["Comments"] == System.DBNull.Value ? null : (string)reader["Comments"];

                        weeklystatus.TRDATE = reader["TRDATE"] == System.DBNull.Value ? null : (string)reader["TRDATE"];

                        weeklystatus.WEEKSTATUS = reader["WEEKSTATUS"] == System.DBNull.Value ? null : (string)reader["WEEKSTATUS"];

                        

                        weeklylist.Add(weeklystatus);
                    }
                    con.Close();
                }
            }
            return weeklylist.ToArray();
        }

        public Weeklystatus Get(string ID)
        {
            Weeklystatus weeklystatus = new Weeklystatus();

            string query = @"SELECT 
                            W.WeeklyStatus_Id,
                            W.Project_Id,
                            W.Program_Id,
                            W.P_Desc,
                            W.Resource_Id,
                            W.Status,
                            W.KeyAccomplishments,
                            W.KeyIssues,
                            W.FuturePlan,
                            W.Comments,
                            PRG.Program_Name,
                            PRJ.Project_Name,
                            RM.Resource_Name,
 REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, W.TRDATE,   1), 111), '/', '-') TRDATE,
                            (case when W.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) AND W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'CurrentWeek' WHEN W.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PreviousWeek' WHEN W.TRDATE >  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate())) then 'PostWeek' end) WEEKSTATUS
                            FROM WEEKLY_STATUS W LEFT JOIN Program_Master PRG ON W.PROGRAM_ID=PRG.PROGRAM_ID
                             LEFT JOIN PROJECT_MASTER PRJ ON W.PROJECT_ID=PRJ.PROJECT_ID
                             LEFT JOIN Resource_Master RM ON W.RESOURCE_ID=RM.RESOURCE_ID " +
                "  WHERE WeeklyStatus_Id = '" + ID + "'";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        weeklystatus.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];

                        weeklystatus.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

                        weeklystatus.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

                        weeklystatus.Project_Name = reader["Program_Name"] == System.DBNull.Value ? null : (string)reader["Program_Name"];

                        weeklystatus.Project_Desc = reader["P_Desc"] == System.DBNull.Value ? null : (string)reader["P_Desc"];

                        weeklystatus.Resource_Id = reader["Resource_Id"] == System.DBNull.Value ? default(int) : (int)reader["Resource_Id"];

                        weeklystatus.Resource_Name = reader["Resource_Name"] == System.DBNull.Value ? null : (string)reader["Resource_Name"];

                        weeklystatus.Status = reader["Status"] == System.DBNull.Value ? null : (string)reader["Status"];

                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];

                        weeklystatus.KeyIssues = reader["KeyIssues"] == System.DBNull.Value ? null : (string)reader["KeyIssues"];

                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];

                        weeklystatus.Comments = reader["Comments"] == System.DBNull.Value ? null : (string)reader["Comments"];

                        weeklystatus.TRDATE = reader["TRDATE"] == System.DBNull.Value ? null : (string)reader["TRDATE"];
                        weeklystatus.WEEKSTATUS = reader["WEEKSTATUS"] == System.DBNull.Value ? null : (string)reader["WEEKSTATUS"];
                    }
                    con.Close();
                }
            }
            return weeklystatus;


        }


        public bool UpdateKeyAccomplishments(Weeklystatus item)
        {

            string query = string.Empty;
            string KeyAccomplishments = item.KeyAccomplishments;
            Int32 WeeklyStatus_Id = item.WeeklyStatus_Id;


            //Procedure Works As IF-ELSE
            query = "prcUpdateKeyAccomplishments";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@WeeklyStatus_Id", Convert.ToInt32(WeeklyStatus_Id));
                    cmd.Parameters.AddWithValue("@KeyAccomplishments", Convert.ToString(KeyAccomplishments));
                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;


 
        }

        public bool UpdateKeyIssues(Weeklystatus item)
        {
            string query = string.Empty;
            string KeyIssues = item.KeyIssues;
            Int32 WeeklyStatus_Id = item.WeeklyStatus_Id;


            //Procedure Works As IF-ELSE
            query = "prcUpdateKeyIssues";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@WeeklyStatus_Id", Convert.ToInt32(WeeklyStatus_Id));
                    cmd.Parameters.AddWithValue("@KeyIssues", Convert.ToString(KeyIssues));
                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;


        }

        public bool UpdateFuturePlan(Weeklystatus item)
        {

            string query = string.Empty;
            string FuturePlan = item.FuturePlan;
            Int32 WeeklyStatus_Id = item.WeeklyStatus_Id;


            //Procedure Works As IF-ELSE
            query = "prcUpdateFuturePlan";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@WeeklyStatus_Id", Convert.ToInt32(WeeklyStatus_Id));
                    cmd.Parameters.AddWithValue("@FuturePlan", Convert.ToString(FuturePlan));
                    cmd.Connection = con;

                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;


        }

        public bool UpdateProjectStatus(Weeklystatus item)
        {
            string query = string.Format("UPDATE WEEKLY_STATUS " +
                    " SET Status= '{0}' " +
                    " WHERE WeeklyStatus_Id = '{1}' ", item.Status, item.WeeklyStatus_Id);

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

        public string UpdateComments(Weeklystatus item)
        {
            string wID = string.Empty;
            using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                try
                {
                    conn.Open();
                    string strQry = "procUpdateComments";
                    SqlCommand command = new SqlCommand(strQry, conn);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Program_id", item.Program_Id);
                    command.Parameters.AddWithValue("@Project_id", item.Project_Id);
                    command.Parameters.AddWithValue("@WeeklyStatus_Id", item.WeeklyStatus_Id);
                    command.Parameters.AddWithValue("@status", "G");
                    command.Parameters.AddWithValue("@Comments", item.Comments);
                    command.Parameters.AddWithValue("@TrDate", DateTime.Now.Date.ToString("yyyy-MM-dd"));
                    SqlParameter id = new SqlParameter("@id", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
                    command.Parameters.Add(id);
                    command.ExecuteNonQuery();
                    wID= id.Value.ToString();

                    conn.Close();
                }
                catch (Exception ex)
                {
                    throw ex;
                    // module to logg the exception
                }
            }

            return wID;



            //string query = string.Empty;
            //if (item.WeeklyStatus_Id != 0)
            //{
            //    query = string.Format("UPDATE WEEKLY_STATUS " +
            //            " SET Comments= '{0}' " +
            //            " WHERE WeeklyStatus_Id = '{1}' ", item.Comments, item.WeeklyStatus_Id);
            //}
            //else
            //{
            //    query = string.Format("insert into WEEKLY_STATUS(Program_id,Project_id,status,Comments,TrDate) values("+item.Program_Id+","+item.Project_Id+",'G','"+item.Comments+"','"+DateTime.Now.Date.ToString("yyyy-MM-dd") + "')");
            //}

            //using (SqlConnection con =
            //        new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            //{
            //    using (SqlCommand cmd = new SqlCommand(query, con))
            //    {
            //        con.Open();
            //        cmd.ExecuteNonQuery();
            //        con.Close();
            //    }
            //}

            //return true;
        }

        public Weeklystatus GetKeyAccomplishMent(string level, int PID)
        {
            Weeklystatus weeklystatus = new Weeklystatus();

            string query = "prcGetKeyAccomplishment";

            using (SqlConnection con =
                  new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                     cmd.Parameters.AddWithValue("@level", level);
                     cmd.Parameters.AddWithValue("@PID", Convert.ToSingle(PID));

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];
                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];
                        weeklystatus.WeeklyStatus_Id = Convert.ToInt32(reader["WeeklyStatus_Id"]);
                        weeklystatus.Comments = Convert.ToString(reader["Comments"]);
                    }
                    con.Close();
                }
            }

            return weeklystatus;
        }

        public List<Weeklystatus> GetAllKeyAccomplishMent(int PID)
        {


            string query = "Execute prcGetAllKeyAccomplishment " + PID.ToString() + "";
            List<Weeklystatus> _lst = new List<Weeklystatus>();
            using (SqlConnection con =
                  new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Weeklystatus weeklystatus = new Weeklystatus();
                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];
                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];
                        weeklystatus.WeeklyStatus_Id = Convert.ToInt32(reader["WeeklyStatus_Id"]);
                        weeklystatus.Status = Convert.ToString(reader["WeekStatus"]);
                        weeklystatus.TRDATE = Convert.ToDateTime(reader["TrDate"]).ToString("yyyy-MM-dd");
                        weeklystatus.WeekNumber = Convert.ToString(reader["WeekNumber"]);
                        _lst.Add(weeklystatus);
                    }
                    con.Close();
                }
            }

            return _lst;
        }

        public IEnumerable<Weeklystatus> GetWeeklyStatusByUserName(string UserName ,string ID)
        {
            List<Weeklystatus> weeklylist = new List<Weeklystatus>();

            string query = "prcGetWeeklyStatus";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", Convert.ToString(UserName));
                    cmd.Parameters.AddWithValue("@ParentID", Convert.ToInt32(ID));
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Weeklystatus weeklystatus = new Weeklystatus();

                        weeklystatus.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];

                        weeklystatus.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

                        weeklystatus.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

                        weeklystatus.Project_Name = reader["Program_Name"] == System.DBNull.Value ? null : (string)reader["Program_Name"];

                        weeklystatus.Project_Desc = reader["P_Desc"] == System.DBNull.Value ? null : (string)reader["P_Desc"];

                        weeklystatus.Resource_Id = reader["Resource_Id"] == System.DBNull.Value ? default(int) : (int)reader["Resource_Id"];

                        weeklystatus.Resource_Name = reader["Resource_Name"] == System.DBNull.Value ? null : (string)reader["Resource_Name"];

                        weeklystatus.Status = reader["Status"] == System.DBNull.Value ? null : (string)reader["Status"];

                        weeklystatus.KeyAccomplishments = reader["KeyAccomplishments"] == System.DBNull.Value ? null : (string)reader["KeyAccomplishments"];

                        weeklystatus.KeyIssues = reader["KeyIssues"] == System.DBNull.Value ? null : (string)reader["KeyIssues"];

                        weeklystatus.FuturePlan = reader["FuturePlan"] == System.DBNull.Value ? null : (string)reader["FuturePlan"];

                        weeklystatus.Comments = reader["Comments"] == System.DBNull.Value ? null : (string)reader["Comments"];

                        weeklystatus.TRDATE = reader["TRDATE"] == System.DBNull.Value ? null : (string)reader["TRDATE"];

                        weeklystatus.WEEKSTATUS = reader["WEEKSTATUS"] == System.DBNull.Value ? null : (string)reader["WEEKSTATUS"];

                        weeklylist.Add(weeklystatus);
                    }
                    con.Close();
                }
            }
            return weeklylist.ToArray();
        }
           

    }
}