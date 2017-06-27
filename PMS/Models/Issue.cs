using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Issue
    {
        public int IssueID { get; set; }

        public string IssueTitle { get; set; }
        public long ProjectID { get; set; }
        public int ProgramID { get; set; }
        public long ResourceID { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }
        public int ItemType { get; set; }
        public int Aging { get; set; }
        public string ItemName { get; set; }
        public string Severity { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }

        public string ProjectName { get; set; }
        public string ProgramName { get; set; }
        public string IssueCount { get; set; }
    }
}