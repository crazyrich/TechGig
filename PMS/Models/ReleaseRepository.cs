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
    public class ReleaseRepository : IRelease
    {
        public Release GetCalender(string year, string month)
        {
            month = month.Length == 2 ? month : month.PadLeft(2, '0');
            Release oRelease = new Release();
            string query = "prcGetCalender";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Year", year);
                    cmd.Parameters.AddWithValue("@Month", month);

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        oRelease.Calender = Convert.ToString(reader["CalURL"]);
                    }
                    con.Close();
                }
            }

            return oRelease;
        }

        public IEnumerable<Release> GetAllReleases(string year, string month,string ReleaseId)
        {
            month = month.Length == 2 ? month : month.PadLeft(2, '0');
            List<Release> lstReleases = new List<Release>();
        
            string query = "prcGetAllReleases";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Year", year);
                    cmd.Parameters.AddWithValue("@Month", month);
                    cmd.Parameters.AddWithValue("@ReleaseId", ReleaseId);

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        Release oRelease = new Release();
                        oRelease.ReleaseId = Convert.ToInt64(reader["ReleaseId"]);
                        oRelease.Title = Convert.ToString(reader["Title"]);
                        oRelease.ContactPerson = Convert.ToString(reader["ContactPerson"]);
                        oRelease.CreatedDate = Convert.ToDateTime(reader["CreatedDate"]);
                        oRelease.Description = Convert.ToString(reader["Description"]);
                        oRelease.IsDeleted = Convert.ToInt32(reader["IsDeleted"]);
                        oRelease.ModifiedDate = Convert.ToDateTime(reader["ModifiedDate"]);
                        oRelease.ReleaseDate = Convert.ToDateTime(reader["ReleaseDate"]);
                        oRelease.UpdatedBy = Convert.ToString(reader["UpdatedBy"]);
                        oRelease.ReleaseType = Convert.ToString(reader["ReleaseType"]);
                        lstReleases.Add(oRelease);
                    }
                    con.Close();
                }
            }

            return lstReleases.ToArray();
        }
    }
}