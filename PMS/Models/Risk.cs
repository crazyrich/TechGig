using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Risk
    {
        public int RiskID { get; set; }

        public string RiskTitle { get; set; }
        public long ProjectID { get; set; }
        public int Program_ID { get; set; }
        public long ResourceID { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public string StatusReportUpdate { get; set; }
        public string RiskResponseActionPlan { get; set; }
        public string MitigationLog { get; set; }
        public int FlagforMonProgramIntgMtg { get; set; }
        public int FlagforTuesExecMtg { get; set; }
        public int FlagforKPPDXMeeting { get; set; }
        public int ItemType { get; set; }
        public string ItemName { get; set; }
        
        public string Path { get; set; }
        public string Impact { get; set; }

        public string ProjectName { get; set; }
        public string ProgramName { get; set; }
        public string RiskCount { get; set; }
    }

    public class UserPrograms
    {
        public Int64 PID { get; set; }
        public string PName { get; set; }
        public Int64 ParentID { get; set; }
    }
    public class UserProjects
    {
        public Int64 PID { get; set; }
        public string PName { get; set; }
        public Int64 ParentID { get; set; }
    }

    public class ItemType
    {
        public int  ItemID { get; set; }
        public string ItemName { get; set; }
    }
}
