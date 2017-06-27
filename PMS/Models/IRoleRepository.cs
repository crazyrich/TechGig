using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IRoleRepository
    {
      IEnumerable<string> GetAllRoles();
      void AssignUserRole(string username, string rolename);
      IEnumerable<UsersInRole> GetUsersInRole();
      IEnumerable<string> GetRolesForUserName(string username);
      void DeleteUserFromRole(string username, string rolename);
      void UpdateUserRole(string username, string oldrolename, string newrolename);
    }
}