using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Project
    {
        public int Project_Id { get; set; }
        public int Program_Id { get; set; }
        public string Project_Name { get; set; }
        public string PROJECT_WEEKLY_STATUS { get; set; }
        public int WeeklyStatus_Id { get; set; }
        
        
    }
}