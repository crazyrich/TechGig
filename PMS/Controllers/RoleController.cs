using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PortfolioWebApp.Models
{
    public class RoleController : ApiController
    {

        RoleRepository _RoleRepository = new RoleRepository();

        // GET api/role
        public IEnumerable<string> GetAllRoles()
        {
            return _RoleRepository.GetAllRoles();
        }

        [HttpPost]
        public void AssignRoleToUser([FromUri]string username,[FromUri] string rolename)
        {
            _RoleRepository.AssignUserRole(username, rolename);
        }

        public IEnumerable<UsersInRole> GetUserRoles()
        {
            return _RoleRepository.GetUsersInRole();
        }

        public IEnumerable<string> GetRolesForUser(string username) 
        {
            return _RoleRepository.GetRolesForUserName(username);
        }


        [HttpDelete]
        public void DeleteUserInRole([FromUri]string username, [FromUri] string rolename)
        {
            _RoleRepository.DeleteUserFromRole(username, rolename);
        }

        [HttpPut]
        public void UpdateUserRole(string username, string oldrolename, string newrolename)
        {
            _RoleRepository.UpdateUserRole(username, oldrolename, newrolename);

        }
    }

        //// GET api/role/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/role
        //public void Post([FromBody]string value)
        //{
        //}

        //// PUT api/role/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        
}
