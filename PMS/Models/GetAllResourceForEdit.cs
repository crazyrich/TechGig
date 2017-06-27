using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class GetAllResourceForEdit
    {
        public Int64 ProjectID { get; set; }
        public Int64 ResourceID { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string PName { get; set; }
        public string Skills { get; set; }
        public int UsedHours { get; set; }

        //public Int64 ProjectID { get; set; }
        //public Int64 ResourceID { get; set; }
        public Int64 ID { get; set; }
        public Int64 ProgramID { get; set; }
        public string ProgramName { get; set; }
        public string ProjectName { get; set; }
        public string ResourceName { get; set; }
        public Int64 Year { get; set; }
        public Int64 Month { get; set; }
        public Int64 PlannedHours { get; set; }
        public Int64 UtilizedHours { get; set; }
        public string DesignationId { get; set; }
        public string ResourceLocation { get; set; }
        public string ResourceType { get; set; }

    }

    public class GetResourceType
    {
        public Int64 ID { get; set; }
        public string ResourceType { get; set; }

    }

    public class GetResourceLocation
    {
        public Int64 ID { get; set; }
        public string ResourceLocation { get; set; }

    }
}