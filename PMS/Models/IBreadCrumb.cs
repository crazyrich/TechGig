using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;

namespace PortfolioWebApp.Models
{
    public interface IBreadCrumb
    {
        IEnumerable<Program> GetBreadCrumb(string id);
        
    }


    public class BreadCrumbRepository : IBreadCrumb
    {

        string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        

        public IEnumerable<Program> GetBreadCrumb(string id)
        {
            string query = "Execute prcGetBredCrum " + id;

            List<Program> programlist = new List<Program>();
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Program program = new Program();

                        program.Program_Id = Convert.ToInt32(reader["PID"]);
                        program.Program_Name = Convert.ToString(reader["PName"]);
                        programlist.Add(program);
                    }
                    con.Close();
                }
            }
            return programlist.ToArray();
        }
    
    }
}