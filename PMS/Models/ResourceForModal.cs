using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class ResourceForModal
    {
        public Int64 ProgramID { get; set; }
        public string ProgramName { get; set; }
        public Int64 ProjectID { get; set; }
        public string ProjectName { get; set; }
        public int TotalResources { get; set; }
        public Int64 TotalPlannedHours { get; set; }
        public Int64 TotalUtilizedHours { get; set; }

    }

    public class ResourceForModalArgs
    {
        public int ParentID { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public string UserId { get; set; }
    
    }

}