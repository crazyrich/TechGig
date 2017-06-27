using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace PortfolioWebApp.Models
{
    public class MileStoneRepository : IMileStoneRepository
    {

        public IEnumerable<MileStone> GetAllMileStone()
        {
            List<MileStone> MStone = new List<MileStone>();

//            string query = @"select MST_M.MileStoneId ,MST_M.Program_Id,MST_M.Project_Id,MST_M.Release,MST_M.Milestone_Description,
//REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.M_Date,   1), 111), '/', '-') as M_Date,
//REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.Revised_Date,   1), 111), '/', '-') as Revised_Date,
//MST_M.Priority,MST_M.Major_Minor,MST_M.Dependency,MST_M.Notes,PgmM.Program_Name,pjctM.Project_Name from Milestone_Master MST_M left join Program_Master PgmM on MST_M.program_id=PgmM.program_id  left join Project_Master pjctM on MST_M.project_id =pjctM.project_id";



            string query = @"select MST_M.MileStoneId ,MST_M.ProgrammeID,MST_M.Release,MST_M.Milestone_Description,
REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.CreatedDate,   1), 111), '/', '-') as CreatedDate,
REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.RevisedDate,   1), 111), '/', '-') as RevisedDate,
MST_M.Priority,MST_M.Major_Minor,MST_M.Dependency,MST_M.Notes,PgmM.PName,PgmM.PID,PgmM.ParentID  from Milestone MST_M
left join ProgrammeManager PgmM on MST_M.ProgrammeID=PgmM.PID";



            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        MileStone mileStone = new MileStone();
                        mileStone.MileStoneId = reader["MileStoneId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["MileStoneId"];
                        mileStone.Project_Id = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                        mileStone.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ParentID"];
                        mileStone.Project_Name = reader["PName"] == System.DBNull.Value ? null : (string)reader["PName"];
                        mileStone.Release = reader["Release"] == System.DBNull.Value ? null : (string)reader["Release"];
                        mileStone.Milestone_Description = reader["Milestone_Description"] == System.DBNull.Value ? null : (string)reader["Milestone_Description"];
                        mileStone.CreatedDate = reader["CreatedDate"] == System.DBNull.Value ? null : (string)reader["CreatedDate"];
                        mileStone.RevisedDate = reader["RevisedDate"] == System.DBNull.Value ? null : (string)reader["RevisedDate"];

                        mileStone.Priority = reader["Priority"] == System.DBNull.Value ? null : (string)reader["Priority"];
                        mileStone.Major_Minor = reader["Major_Minor"] == System.DBNull.Value ? null : (string)reader["Major_Minor"];
                        mileStone.Dependency = reader["Dependency"] == System.DBNull.Value ? null : (string)reader["Dependency"];
                        mileStone.Notes = reader["Notes"] == System.DBNull.Value ? null : (string)reader["Notes"];


                        MStone.Add(mileStone);
                    }
                    con.Close();
                }
            }

            return MStone;
        }


        public MileStone GetMileStone(string ID)
        {
            MileStone mileStone = new MileStone();

            string query = @"select MST_M.MileStoneId ,MST_M.Program_Id,MST_M.Project_Id,MST_M.Release,MST_M.Milestone_Description,
REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.M_Date,   1), 111), '/', '-') as M_Date,
REPLACE(CONVERT(VARCHAR(10), CONVERT(datetime, MST_M.Revised_Date,   1), 111), '/', '-') as Revised_Date,
MST_M.Priority,MST_M.Major_Minor,MST_M.Dependency,MST_M.Notes,PgmM.Program_Name,pjctM.Project_Name from Milestone_Master MST_M left join Program_Master PgmM on MST_M.program_id=PgmM.program_id  left join Project_Master pjctM on MST_M.project_id =pjctM.project_id " +
                "  WHERE MST_M.MileStoneId = '" + ID + "'";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        mileStone.MileStoneId = reader["MileStoneId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["MileStoneId"];
                        mileStone.Project_Id = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                        mileStone.Project_Name = reader["PName"] == System.DBNull.Value ? null : (string)reader["PName"];
                        mileStone.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ParentID"];
                        mileStone.Release = reader["Release"] == System.DBNull.Value ? null : (string)reader["Release"];
                        mileStone.Milestone_Description = reader["Milestone_Description"] == System.DBNull.Value ? null : (string)reader["Milestone_Description"];
                        mileStone.CreatedDate = reader["CreatedDate"] == System.DBNull.Value ? null : (string)reader["CreatedDate"];
                        mileStone.RevisedDate = reader["RevisedDate"] == System.DBNull.Value ? null : (string)reader["RevisedDate"];

                        mileStone.Priority = reader["Priority"] == System.DBNull.Value ? null : (string)reader["Priority"];
                        mileStone.Major_Minor = reader["Major_Minor"] == System.DBNull.Value ? null : (string)reader["Major_Minor"];
                        mileStone.Dependency = reader["Dependency"] == System.DBNull.Value ? null : (string)reader["Dependency"];
                        mileStone.Notes = reader["Notes"] == System.DBNull.Value ? null : (string)reader["Notes"];

                    }
                    con.Close();
                }
            }
            return mileStone;


        }


        public bool UpdateMilestone(MileStone item)
        {
            string query=string.Empty;

            if(item.MileStoneId==0)
                query = @"INSERT INTO Milestone
                            (ProgrammeID
                          ,Release,Milestone_Description,CreatedDate,RevisedDate,Priority,Major_Minor,Dependency
                           ,Notes,UpdatedDate,EndDate)
                     VALUES
                           ('" + item.Project_Id + "','" + item.Release + "','" + item.Milestone_Description + "','" + item.CreatedDate + "','" + item.RevisedDate + "','" + item.Priority + "','" + item.Major_Minor + "','" + item.Dependency + "','" + item.Notes + "','" + item.CreatedDate + "','" + item.CreatedDate + "')";
            else
                query = @"UPDATE Milestone " +
                    " SET Release= '" + item.Release + "'," +
                    " Milestone_Description= '" + item.Milestone_Description + "'," +
                    " CreatedDate='" + item.CreatedDate + "'," +
                    " RevisedDate= '" + item.RevisedDate + "'," +
                    " Priority= '" + item.Priority + "'," +
                    " Major_Minor= '" + item.Major_Minor + "'," +
                    " Dependency= '" + item.Dependency + "'," +
                    " Notes= '" + item.Notes + "' ," +
                    " ProgrammeID= " + item.Project_Id + " " +
                    " WHERE MileStoneId = '" + item.MileStoneId + "' ";


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

        public bool DeleteMilestone(MileStone item)
        {
            string query = string.Empty;

            
                query = @"DELETE FROM Milestone " +
                    " WHERE MileStoneId = '" + item.MileStoneId + "' ";


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

        //--------------------------------

        public IEnumerable<MileStone> GetMileStoneByprogramId(string ParentId,string ProgrameId, string UserId)
        {
            List<MileStone> MStone = new List<MileStone>();

            string query = "prcGetMileStoneData";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;


                    cmd.Parameters.AddWithValue("@ParentId",Convert.ToInt32(ParentId));
                    cmd.Parameters.AddWithValue("@PID",Convert.ToInt32(ProgrameId));
                    cmd.Parameters.AddWithValue("@UserName",Convert.ToString(UserId));

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        MileStone mileStone = new MileStone();
                        mileStone.MileStoneId = reader["MileStoneId"] == System.DBNull.Value ? default(Int64) : (Int64)reader["MileStoneId"];
                        mileStone.Project_Id = reader["PID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["PID"];
                        mileStone.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(Int64) : (Int64)reader["ParentID"];
                        mileStone.Release = reader["Release"] == System.DBNull.Value ? null : (string)reader["Release"];
                        mileStone.Milestone_Description = reader["Milestone_Description"] == System.DBNull.Value ? null : (string)reader["Milestone_Description"];
                        mileStone.CreatedDate = Convert.ToString(reader["CreatedDate"]);
                        mileStone.RevisedDate = Convert.ToString(reader["RevisedDate"]);

                        mileStone.Priority = reader["Priority"] == System.DBNull.Value ? null : (string)reader["Priority"];
                        mileStone.Major_Minor = reader["Major_Minor"] == System.DBNull.Value ? null : (string)reader["Major_Minor"];
                        mileStone.Dependency = reader["Dependency"] == System.DBNull.Value ? null : (string)reader["Dependency"];
                        mileStone.Notes = reader["Notes"] == System.DBNull.Value ? null : (string)reader["Notes"];


                        MStone.Add(mileStone);
                    }
                    con.Close();
                }
            }

            return MStone;
        }
        
        //-------------------------------

    }
}