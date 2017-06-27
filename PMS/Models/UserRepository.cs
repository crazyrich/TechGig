using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

using System.Data;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.IO;
using System.Configuration;
using System.Security.Principal;


namespace PortfolioWebApp.Models
{
    public class UserRepository : IUserRepository
    {
        private string connString = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        public int AddUser(User oUser)
        {
            int isSuccess = 0;
           MembershipUser UserAlredyExists = Membership.GetUser(oUser.UserName);
           if (UserAlredyExists != null)
           { isSuccess = -2; }
           else
           {
               try
               {
                   // MembershipCreateStatus p = MembershipCreateStatus.Success;
                   MembershipUser newUser = Membership.CreateUser(oUser.UserName, oUser.Password, oUser.Email);
                   if (Membership.ValidateUser(oUser.UserName, oUser.Password))
                   {
                       isSuccess = 1;
                   }
               }
               catch
               {

                   isSuccess = -1;

               }
           }
            return isSuccess;

        }

        public IEnumerable<User> GetAllUser()
        {
            var MemberShipUserList = Membership.GetAllUsers();
            List<User> userList = new List<User>();
            foreach (MembershipUser user in MemberShipUserList)
            {
                User oUser = new User();
                oUser.UserName = user.UserName;
                oUser.Password = user.GetPassword();
                oUser.Email = user.Email;
                userList.Add(oUser);

            }


            return userList.ToArray();
        }

        public User GetUserByUserName(string username)
        {
            User oUser = new User();
            var MemberShipUser = Membership.GetUser(username);
            if (MemberShipUser != null)
            {
                oUser.UserName = MemberShipUser.UserName;
                oUser.Email = MemberShipUser.Email;
                oUser.Password = MemberShipUser.GetPassword();
            }
            return oUser;
        }

        public IEnumerable<string> GetUsersWithoutRole()
        {
            MembershipUserCollection users = Membership.GetAllUsers();

            List<string> usersNoRoles = new List<string>();
            foreach (MembershipUser user in users)
            {
                string[] roles = Roles.GetRolesForUser(user.UserName);

                // if roles empty
                if (roles.Count() == 0)
                {
                    // Add User to a List for User with no Roles
                    usersNoRoles.Add(user.UserName);
                }

            }

            return usersNoRoles.ToArray();

        }

        public int UpdateUser(User oUser)
        {
            int isSuccess = 0;

            try
            {
                MembershipUser dbUser = Membership.GetUser(oUser.UserName);

                dbUser.ChangePassword(dbUser.GetPassword(), oUser.Password);

                dbUser = Membership.GetUser(oUser.UserName);

                dbUser.Email = oUser.Email;
                Membership.UpdateUser(dbUser);

                if (Membership.ValidateUser(dbUser.UserName, oUser.Password))
                {

                    isSuccess = 1;

                }

            }
            catch
            {

                isSuccess = -1;

            }

            return isSuccess;

        }

        public int DeleteUser(string username)
        {
            int isSuccess = 0;

            try
            {
                Membership.DeleteUser(username);
                isSuccess = 1;
            }
            catch
            {

                isSuccess = -1;

            }

            return isSuccess;

        }

        public IEnumerable<string> GetUsersForRole(string RoleName)
        {

            string[] UsersForRole = Roles.GetUsersInRole(RoleName);
            return UsersForRole;

        }

        public User AutheticateUser(User oUser)
        {
            string query = "prcAutheticateUser";
            using (SqlConnection con =
                  new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", Convert.ToString(oUser.UserName));
                    cmd.Parameters.AddWithValue("@Password", Convert.ToString(oUser.Password));
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        int UserStatus;
                        int.TryParse(Convert.ToString(reader["UserStatus"]), out UserStatus);
                        oUser.UserStatus = UserStatus.ToString();
                        oUser.UserRole = Convert.ToString(reader["RoleName"]);
                        //  oUser.Password = oUser.Password;
                        var tempUser = GetUserByUserName(oUser.UserName);
                        IPrincipal principal = new GenericPrincipal((new GenericIdentity(oUser.UserName)), System.Web.Security.Roles.GetRolesForUser(oUser.UserName));
                        // HttpContext.Current.User  = New GenericPrincipal(User.Identity, userRoles)
                        HttpContext.Current.User = principal;
                        FormsAuthentication.SetAuthCookie(oUser.UserName, false);
                    }
                }
            }
            return oUser;
        }

        public IEnumerable<UserPermissionProgram> GetUsersPermissionForLoginUser(string UserName) 
        {
            List<UserPermissionProgram> permission = new List<UserPermissionProgram>();
            string strQry = "procGetPermissionForLoginUser";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userName", Convert.ToString(UserName));

                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            UserPermissionProgram userPermission = new UserPermissionProgram();
                            userPermission.EditPermission = Convert.ToString(reader["canEdit"]);
                            userPermission.PID = (reader["PID"] == DBNull.Value) ? 0 : Convert.ToInt64(reader["PID"]);
                            userPermission.ParentID = Convert.ToInt64(reader["ParentID"]);
                            permission.Add(userPermission);
                        }

                        con.Close();
                    } //end try



                    return permission.ToArray();
                }

            }
        
        }

        public IEnumerable<UserPermissionProgram> GetUsersPermission(string UserName, string RoleName, string ProgramName)
        {
            List<UserPermissionProgram> permission = new List<UserPermissionProgram>();
            string strQry = "procGetUserPermission";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry,con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@userName",Convert.ToString(UserName));
                    cmd.Parameters.AddWithValue("@roleName", Convert.ToString(RoleName.Replace(" ", "")));
                    cmd.Parameters.AddWithValue("@programName", Convert.ToString(ProgramName));

                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            UserPermissionProgram userPermission = new UserPermissionProgram();
                            userPermission.Id = (reader["id"] == DBNull.Value) ? 0 : Convert.ToInt64(reader["id"]);
                            userPermission.ProgramName = Convert.ToString(reader["PName"]);
                            userPermission.ViewPermission = (reader["id"] == DBNull.Value) ? false : true;
                            userPermission.EditPermission = Convert.ToString(reader["canEdit"]);
                            userPermission.PID = (reader["PID"] == DBNull.Value) ? 0 : Convert.ToInt64(reader["PID"]);
                            permission.Add(userPermission);
                        }

                        con.Close();
                    } //end try



                    return permission.ToArray();
                }
            }




        }

        public int UpdateUserPermission(List<UserPermissionProgram> userData)
        {
            int isSuccess = 0;

            string strQry = string.Empty;
            strQry = "procUpdateUserPermission";
            using (SqlConnection con =
                     new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                for (int i = 0; i < userData.Count; i++)
                {

                    using (SqlCommand command = new SqlCommand(strQry, con))
                    {

                        con.Open();
                        
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@role", Convert.ToString(userData[i].RoleName.Replace(" ", "")));
                        command.Parameters.AddWithValue("@Id", Convert.ToString(userData[i].Id));
                        command.Parameters.AddWithValue("@EditPermission", Convert.ToString(userData[i].EditPermission));
                        command.Parameters.AddWithValue("@ViewPermission", Convert.ToString(userData[i].ViewPermission));
                        command.Parameters.AddWithValue("@programName", Convert.ToString(userData[i].ProgramName));
                        command.Parameters.AddWithValue("@UserName", Convert.ToString(userData[i].UserName));
                        command.Parameters.AddWithValue("@pId",Convert.ToString( userData[i].PID));
                        

                       int x= command.ExecuteNonQuery();

                        con.Close();
                        isSuccess = 1;
                    }
                    
                }
            }

            return isSuccess;

        }

        public IEnumerable<UserPermissionProgram> GetUsersPermissionTable(string SelectedRole, string SelectedUser)
        {
            List<UserPermissionProgram> permission = new List<UserPermissionProgram>();

            string strQry = "prcGetPermissionsTableData";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = con;
                  
                    cmd.Parameters.AddWithValue("@SelectedRole",SelectedRole);
                    cmd.Parameters.AddWithValue("@SelectedUser",SelectedUser);

                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            UserPermissionProgram userPermission = new UserPermissionProgram();
                            userPermission.ProgramName = Convert.ToString(reader["ProgramName"]);
                            userPermission.ProjectName = Convert.ToString(reader["ProjectName"]);
                            userPermission.UserName = Convert.ToString(reader["UserName"]);
                            userPermission.RoleName = Convert.ToString(reader["RoleName"]);
                            userPermission.EditPermission = Convert.ToString(reader["EditProjectPermission"]);
                            userPermission.PID = Convert.ToInt32(reader["ProjectID"]);
                            userPermission.ParentID = Convert.ToInt32(reader["ProgramID"]);


                            permission.Add(userPermission);
                        }

                        con.Close();
                    } //end try



                    return permission.ToArray();
                }
            }




        }

        public int DeleteUserPermission(string UserName, int PID, int ParentID)
        {

            string query = "procDeleteUserPermission";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand command = new SqlCommand(query, con);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@UserName", UserName);
                command.Parameters.AddWithValue("@PID", PID);
                command.Parameters.AddWithValue("@ParentID", ParentID);

                IDbDataParameter returnvalue = command.CreateParameter();
                returnvalue.Direction = ParameterDirection.ReturnValue;
                command.Parameters.Add(returnvalue);

                command.ExecuteNonQuery(); con.Close();
                return Convert.ToInt32(returnvalue.Value);

            }

        }

        public bool LogOutUser()
        {
            bool returnValue = false;
            try
            {
                  FormsAuthentication.SignOut();
                returnValue = true;
            }
            catch
            {
                throw;
            }


            return returnValue;
        }

        public int UpdateUserPassword(string user,string oldPassword,string newpassword)
        {
            string query = "procUpdateUserPassword";

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                con.Open();
                SqlCommand command = new SqlCommand(query, con);
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.AddWithValue("@UserName", user);
                command.Parameters.AddWithValue("@OldPassword", oldPassword);
                command.Parameters.AddWithValue("@Newpassword", newpassword);

                IDbDataParameter returnvalue = command.CreateParameter();
                returnvalue.Direction = ParameterDirection.ReturnValue;
                command.Parameters.Add(returnvalue);

                command.ExecuteNonQuery(); 
                con.Close();
                return Convert.ToInt32(returnvalue.Value);

            }
        }

        public IEnumerable<UserPermissionProgram> GetUsersPermissionTable(string UserName)
        {
            List<UserPermissionProgram> permission = new List<UserPermissionProgram>();

            string strQry = "prcGetModulesPermissoinByUserName";
            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(strQry))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Connection = con;
                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            UserPermissionProgram userPermission = new UserPermissionProgram();
                            userPermission.UserName = Convert.ToString(reader["UserName"]);
                            userPermission.PID = Convert.ToInt32(reader["ModuleID"]);
                            permission.Add(userPermission);
                        }

                        con.Close();
                    } //end try
                    return permission.ToArray();
                }
            }
        }

    }

}