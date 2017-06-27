using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
namespace PortfolioWebApp.Models
{
    public class RoleRepository:IRoleRepository
    {
        public IEnumerable<string> GetAllRoles()
        {
            var RolesList = Roles.GetAllRoles();
            //List<Role> RoleList = new List<Role>();

            //foreach (Roles Role in RolesList)
            //{
            //    Role oRole = new Role();
            //    oRole.RoleName=Role.RoleName;
            //    oRole.Description = Role.Description;
            //    RoleList.Add(oRole);
            //}
            return RolesList;
        }
        //public void GetUserPermissions(string username, string rolename)
        //{


        //    Roles.AddUserToRole(username, rolename);
        // }
		
        public void AssignUserRole(string username,string rolename)
        {
          
            Roles.AddUserToRole(username, rolename);
        }

        public IEnumerable<UsersInRole> GetUsersInRole()
         {
             MembershipUserCollection users = Membership.GetAllUsers();

             List<UsersInRole> usersWithRoles = new List<UsersInRole>();
             foreach (MembershipUser user in users)
             {
                 UsersInRole uir = new UsersInRole();
                 uir.UserName = user.UserName;
                 string[] roles = Roles.GetRolesForUser(user.UserName);
                 // if roles empty
                 if (roles.Count() != 0)
                 {
                     for(var i = 0;i<roles.Length;i++){
                         uir.RoleName = roles[i]; 
                     
                     }
                     // Add User to a List for User with no Roles
                     usersWithRoles.Add(uir);
                 }

             }

             return usersWithRoles.ToArray();
         }
        public IEnumerable<string> GetRolesForUserName(string username) 
        {
           return Roles.GetRolesForUser(username);
        }

        public void DeleteUserFromRole(string username, string rolename) 
        {
            Roles.RemoveUserFromRole(username, rolename);
        }
        public void UpdateUserRole(string username, string oldrolename,string newrolename)
        {
            Roles.RemoveUserFromRole(username, oldrolename);
            Roles.AddUserToRole(username, newrolename);
        }
    
    }
    

}