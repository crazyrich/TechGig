using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class MileStone
    {
        public Int64 MileStoneId { get; set; }
        public Int64 Project_Id { get; set; }
        public Int64 Parent_Id { get; set; }
        public string Project_Name { get; set; }
        public string Release { get; set; }
        public string Milestone_Description { get; set; }
        public string CreatedDate { get; set; }
        public string RevisedDate { get; set; }
        public string Priority { get; set; }
        public string Major_Minor { get; set; }
        public string Dependency { get; set; }
        public string Notes { get; set; }
    }
}