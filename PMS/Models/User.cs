using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class User
    {
       
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string UserStatus { get; set; }
        public string UserRole { get; set; }

    }

    public class UserPermissionProgram
    {
        public Int64 Id { get; set; }
        public string EditPermission { get; set; }
        public Int64 PID { get; set; }
        public string RoleName { get; set; }
        public bool ViewPermission { get; set; }
        public string UserName { get; set; }
        public string ProgramName { get; set; }
        public string ProjectName { get; set; }
        public Int64 ParentID { get; set; }
    }
}