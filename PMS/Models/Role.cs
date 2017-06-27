using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Role
    {
        public string RoleName { get; set; }
        public string Description { get; set; }
        
    }
    public class UsersInRole
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
        public string RoleName { get; set; }
        public string UserName { get; set; }

    }
}