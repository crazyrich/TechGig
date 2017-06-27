using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace PortfolioWebApp.Models
{
    public interface IUserRepository
    {
        int AddUser(User oUser);
        IEnumerable<User> GetAllUser();
        User GetUserByUserName(string username);
        int DeleteUser(string username);
        User AutheticateUser(User oUser);
        IEnumerable<string> GetUsersWithoutRole();
        IEnumerable<string> GetUsersForRole(string RoleName);
        IEnumerable<UserPermissionProgram> GetUsersPermission(string UserName, string RoleName, string ProgramName);
        IEnumerable<UserPermissionProgram> GetUsersPermissionTable(string SelectedRole, string SelectedUser);
        int DeleteUserPermission(string UserName, int PID, int ParentID);
        IEnumerable<UserPermissionProgram> GetUsersPermissionForLoginUser(string UserName);
        int UpdateUserPassword(string UserName,string oldpassword,string newpassword);
        IEnumerable<UserPermissionProgram> GetUsersPermissionTable(string UserName);
    }
}