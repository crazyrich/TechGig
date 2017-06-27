using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

namespace PortfolioWebApp.Models
{
    public class ProjectRepository : IProjectRepository
    {
        public IEnumerable<Project> GetAll()
        {
            List<Project> projectlist = new List<Project>();

            string query = @"SELECT PM.Program_Id,
PM.Project_Name,PM.Project_Id,CASE WHEN LTRIM(RTRIM(WS.Status)) IS NULL THEN '' ELSE LTRIM(RTRIM(WS.Status)) END AS PROJECT_WEEKLY_STATUS,WS.WeeklyStatus_Id
FROM PROJECT_MASTER PM 
LEFT JOIN Weekly_Status WS 
ON PM.Project_Id=WS.Project_Id AND WS.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) 
AND WS.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))
order by PM.Project_Name";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Project project = new Project();

                        project.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

                        project.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

                        project.Project_Name = reader["Project_Name"] == System.DBNull.Value ? null : (string)reader["Project_Name"];

                        project.PROJECT_WEEKLY_STATUS = reader["PROJECT_WEEKLY_STATUS"] == System.DBNull.Value ? null : (string)reader["PROJECT_WEEKLY_STATUS"];

                        project.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];
                                                
                        projectlist.Add(project);
                    }
                    con.Close();
                }
            }
            return projectlist.ToArray();
        }

        public Project Get(string ID)
        {
            Project project = new Project();

            string query = @"SELECT PM.Program_Id,
                            PM.Project_Name,PM.Project_Id,CASE WHEN LTRIM(RTRIM(WS.Status)) IS NULL THEN '' ELSE LTRIM(RTRIM(WS.Status)) END AS PROJECT_WEEKLY_STATUS,WS.WeeklyStatus_Id
                            FROM PROJECT_MASTER PM 
                            LEFT JOIN Weekly_Status WS 
                            ON PM.Project_Id=WS.Project_Id AND WS.TRDATE >= dateadd(day, 1-datepart(dw, getdate()), CONVERT(date,getdate())) 
                            AND WS.TRDATE <  dateadd(day, 8-datepart(dw, getdate()), CONVERT(date,getdate()))
                            WHERE PM.Project_Id = '" + ID + "'";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        project.Project_Id = reader["Project_Id"] == System.DBNull.Value ? default(int) : (int)reader["Project_Id"];

                        project.Program_Id = reader["Program_Id"] == System.DBNull.Value ? default(int) : (int)reader["Program_Id"];

                        project.Project_Name = reader["Project_Name"] == System.DBNull.Value ? null : (string)reader["Project_Name"];

                        project.PROJECT_WEEKLY_STATUS = reader["PROJECT_WEEKLY_STATUS"] == System.DBNull.Value ? null : (string)reader["PROJECT_WEEKLY_STATUS"];

                        project.WeeklyStatus_Id = reader["WeeklyStatus_Id"] == System.DBNull.Value ? default(int) : (int)reader["WeeklyStatus_Id"];
                    }
                    con.Close();
                }
            }
            return project;

            
        }
    }
}