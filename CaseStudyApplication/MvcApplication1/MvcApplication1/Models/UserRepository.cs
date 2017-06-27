using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcApplication1.Models
{
    public class UserRepository
    {
        public List<User> GetAll() {

            List<User> userList = new List<User>();
            string query = "SELECT userid,password,usertype FROM Users";

            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CaseStudyApp"].ConnectionString))
            {
            
                using(SqlCommand cmd = new SqlCommand(query,con)){
                    con.Open();
                    cmd.CommandType = CommandType.Text;

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read()) {

                        User user = new User();

                        user.userid = Convert.ToString(reader["userid"]);
                        user.password = Convert.ToString(reader["password"]);
                        user.usertype = Convert.ToString(reader["usertype"]);

                        userList.Add(user);
                    }

                    con.Close();
                }
            }
            return userList;
        } 
    }
}