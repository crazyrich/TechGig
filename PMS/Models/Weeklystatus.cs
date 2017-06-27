using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Weeklystatus
    {
        public int WeeklyStatus_Id { get; set; }
        public int Project_Id { get; set; }
        public int Program_Id { get; set; }
        public string Project_Name { get; set; }
        public string Project_Desc { get; set; }
        public int Resource_Id { get; set; }
        public string Resource_Name { get; set; }
        public string Status { get; set; }
        public string KeyAccomplishments { get; set; }
        public string KeyIssues { get; set; }
        public string FuturePlan { get; set; }
        public string Comments { get; set; }
        public string Created_Date { get; set; }
        public string TRDATE { get; set; }
        public string WEEKSTATUS { get; set; }
        public string WeekNumber { get; set; }
    }
}