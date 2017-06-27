using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;
using PortfolioWebApp.Models;






namespace PortfolioWebApp.Controllers
{
    public class ManageUserController : ApiController
    {
        UserRepository _UserRepository = new UserRepository();



        [HttpPost]
        //[BasicHttpAuthorizeAttribute(Roles = "SuperAdmin")]
        public int AddUser([FromBody] User oUser)
        {
            int isSuccess = _UserRepository.AddUser(oUser);
            return isSuccess;
        }
    
        [HttpGet]
        
        public IEnumerable<User> GetAllUser()
        { 
            return _UserRepository.GetAllUser();
        }

        [HttpGet]
        public User GetUserByUserName(string username)
        {
            return _UserRepository.GetUserByUserName(username);
        }

         [HttpGet]
        public IEnumerable<string> GetAllUsersWithoutRole()
        {
            return _UserRepository.GetUsersWithoutRole();
        }

        
         [HttpGet]
        public IEnumerable<string> GetAllUsersForRole([FromUri]string RoleName)
        {
            return _UserRepository.GetUsersForRole(RoleName);
        }


         [HttpPost]
         public IEnumerable<UserPermissionProgram> GetPermissionForLoginUser([FromUri]string UserName)
         {
             return _UserRepository.GetUsersPermissionForLoginUser(UserName);
         }


         [HttpGet]
         public IEnumerable<UserPermissionProgram> GetUserPermissionForRole([FromUri]string UserName,[FromUri] string RoleName,[FromUri]string ProgramName)
         {
             return _UserRepository.GetUsersPermission(UserName, RoleName, ProgramName);
         }

         [HttpGet]
         public int UpdateUserPassword(string username,string oldpassword,string newpassword)
         {
             return _UserRepository.UpdateUserPassword(username, oldpassword, newpassword);
         }

        [HttpPost]
        public int UpdateUser([FromBody] User oUser)
        {
            int isSuccess =_UserRepository.UpdateUser(oUser);
            return isSuccess;
        }

        [HttpPost]
        public int UpdateUserPermissionForRole([FromBody] List<UserPermissionProgram> userData)
        {
            int isSuccess = _UserRepository.UpdateUserPermission(userData);
            return isSuccess;
        }

        [HttpDelete]
        public int DeletePermission([FromUri]string UserName, [FromUri] int PID, [FromUri]int ParentID)
        {

            return _UserRepository.DeleteUserPermission(UserName, PID, ParentID);
        }

        [HttpPost]
        public int DeleteUser([FromUri] string username)
        {
            int isSuccess = _UserRepository.DeleteUser(username);
            return isSuccess;
        }

        [HttpPost]
        public User AutheticateUser([FromBody] User oUser)
        {
            oUser = _UserRepository.AutheticateUser(oUser);
            return oUser;
        }

        [HttpPost]
        public bool LogOutUser()
        {
            return _UserRepository.LogOutUser(); 
        }

        [HttpGet]
        public IEnumerable<UserPermissionProgram> GetDataForUsersPermissionTable([FromUri] string SelectedRole, [FromUri] string SelectedUser)
        {
            return _UserRepository.GetUsersPermissionTable(SelectedRole, SelectedUser);
        }

        [HttpPost]
        public IEnumerable<UserPermissionProgram> GetModulesPermissoinByUserName([FromBody]  User oUser)
        {
            return _UserRepository.GetUsersPermissionTable(oUser.UserName);
        }

        //[HttpGet]
        //public User AutheticateUser([FromUri]string UserName,string Password)
        //{       
        //    User oUser = new User();
        //    oUser.UserName = UserName;
        //    oUser.Password = Password;
        //    oUser = _UserRepository.AutheticateUser(oUser);
        //    return oUser;
        //}
    }
}