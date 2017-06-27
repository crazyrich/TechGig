using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;

namespace PortfolioWebApp.Models
{
    public class ProgramRepository : IProgramRepository
    {
        public IEnumerable<Program> GetAll(string ID)
        {
            List<Program> programlist = new List<Program>();

            string query = "prcGetProgramme";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@PrgID", Convert.ToInt32(ID));

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Program program = new Program();

                        program.Program_Id = Convert.ToInt32(reader["PID"]);
                        program.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(int) : Convert.ToInt32(reader["ParentID"]);

                        program.Program_Name = Convert.ToString(reader["PName"]);

                        program.Program_Weekly_Status = reader["Program_Weekly_Status"] == System.DBNull.Value ? null : (string)reader["Program_Weekly_Status"];

                        int Wid;
                        int.TryParse(Convert.ToString(reader["WeeklyStatus_Id"]), out Wid);

                        program.WeeklyStatus_Id = Wid;
                        programlist.Add(program);
                    }
                    con.Close();
                }
            }
            return programlist.ToArray();
        }

        public Program Get(string ID)
        {
            Program program = new Program();

            string query = @"SELECT PM.Program_Id,
                            PM.Program_Name,CASE WHEN LTRIM(RTRIM(WS.Status)) IS NULL THEN '' ELSE LTRIM(RTRIM(WS.Status)) END AS PROGRAM_WEEKLY_STATUS ,
WS.WeeklyStatus_Id 
                            FROM PROGRAM_MASTER PM 
                            LEFT JOIN Weekly_Status WS 
                            ON PM.Program_Id=WS.Program_Id AND WS.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) 
                            AND WS.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))
                            WHERE  PM.Program_Id = '" + ID + "'";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        program.Program_Id = reader["PID"] == System.DBNull.Value ? default(int) : (int)reader["PID"];
                        program.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(int) : Convert.ToInt32(reader["PID"]);

                        program.Program_Name = reader["PName"] == System.DBNull.Value ? null : (string)reader["PName"];

                        program.Program_Weekly_Status = reader["Program_Weekly_Status"] == System.DBNull.Value ? null : (string)reader["Program_Weekly_Status"];
                        program.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];
                    }
                    con.Close();
                }
            }
            return program;


        }
		
	    public int CreateProgram(Program prog)
        {
            string query = "prcCreateProgramOrProject";

            string pname = prog.Program_Name;
            int parentid = prog.Parent_Id;

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand command = new SqlCommand(query, con);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@pname", Convert.ToString(pname));
                command.Parameters.AddWithValue("@parentid",Convert.ToInt32(parentid));
 
               IDbDataParameter returnvalue = command.CreateParameter();
               returnvalue.Direction = ParameterDirection.ReturnValue;
               command.Parameters.Add(returnvalue);

               command.ExecuteNonQuery(); con.Close();
               return Convert.ToInt32(returnvalue.Value);
              

            }

        }

        public int DeleteProgram(Program prog)
        {
            string query = "prcDeleteProgramOrProject";

           
            int parentid = prog.Parent_Id;
            int pid = prog.Program_Id;

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand command = new SqlCommand(query, con);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@pid",pid);
                command.Parameters.AddWithValue("@parentid", parentid);

                IDbDataParameter returnvalue = command.CreateParameter();
                returnvalue.Direction = ParameterDirection.ReturnValue;
                command.Parameters.Add(returnvalue);

                command.ExecuteNonQuery(); con.Close();
                return Convert.ToInt32(returnvalue.Value);


            }

        }

        public int UpdateProgram(Program prog)
        {
            string query = "prcUpdateProgramOrProject";

            string pname = prog.Program_Name;
            int parentid = prog.Parent_Id;
            int pid = prog.Program_Id;

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {

                con.Open();
                SqlCommand command = new SqlCommand(query, con);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@pid",Convert.ToInt32(pid));
                command.Parameters.AddWithValue("@parentid",Convert.ToInt32(parentid));
                command.Parameters.AddWithValue("@pname",Convert.ToString(pname));

                IDbDataParameter returnvalue = command.CreateParameter();
                returnvalue.Direction = ParameterDirection.ReturnValue;
                command.Parameters.Add(returnvalue);

                command.ExecuteNonQuery(); con.Close();
                return Convert.ToInt32(returnvalue.Value);

            }
        }

        public IEnumerable<Program> GetProgramByUserId(string ID, string LoginId)
        {
            List<Program> programlist = new List<Program>();

            string query = "prcGetProgrammeByUserId";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@PrgID",Convert.ToInt32(ID));
                    cmd.Parameters.AddWithValue("@UserName",Convert.ToString(LoginId));


                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Program program = new Program();

                        program.Program_Id = Convert.ToInt32(reader["PID"]);
                        program.Parent_Id = reader["ParentID"] == System.DBNull.Value ? default(int) : Convert.ToInt32(reader["ParentID"]);

                        program.Program_Name = Convert.ToString(reader["PName"]);

                        program.Program_Weekly_Status = reader["Program_Weekly_Status"] == System.DBNull.Value ? null : (string)reader["Program_Weekly_Status"];

                        int Wid;
                        int.TryParse(Convert.ToString(reader["WeeklyStatus_Id"]), out Wid);

                        int ResourceCount;
                        int.TryParse(Convert.ToString(reader["ResourceCount"]), out ResourceCount);

                        int RiskCount;
                        int.TryParse(Convert.ToString(reader["RiskCount"]), out RiskCount);

                        int IssueCount;
                        int.TryParse(Convert.ToString(reader["GetIssueCount"]), out IssueCount);

                        program.WeeklyStatus_Id = Wid;
                        program.ResourceCount = ResourceCount;
                        program.RiskCount = RiskCount;
                        program.IssueCount = IssueCount;
                        programlist.Add(program);
                    }
                    con.Close();
                }
            }
            return programlist.ToArray();
        }
    }
}