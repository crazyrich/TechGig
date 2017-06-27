using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Program
    {
        public int Program_Id { get; set; }
        public int Parent_Id { get; set; }
        public string Program_Name { get; set; }
        public string Program_Weekly_Status { get; set; }
        public string Created_Date { get; set; }
        public int WeeklyStatus_Id { get; set; }
        public int ResourceCount { get; set; }
        public int IssueCount { get; set; }
        public int RiskCount { get; set; }
        
    }
}