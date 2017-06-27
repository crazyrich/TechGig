using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class Resource
    {
        public Int64 ProjectID { get; set; }
        public Int64 ResourceID { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Skills { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int UsedHours { get; set; }

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
        public string ResourceCount { get; set; }

    }

    public class ResourceDetails
    {
        public Int64 ResourceID { get; set; }
        public string Name { get; set; }
        public Int32 Designation { get; set; }
        public Int32 Skills { get; set; }
        public Int64 ResourceEmpID { get; set; }
    }
    public class ResourceProjectDetails
    {
        public string ResourceType { get; set; }
        public string ResourceLocation { get; set; }
        public string Designation { get; set; }
        public string ProgramName { get; set; }
        public Int64 Year { get; set; }
        public Int64 Month { get; set; }

    }

    public class Designation
    {
        public Int64 DesignationID { get; set; }
        public string DesignationName { get; set; }

    }
    public class Skill
    {
        public Int64 SkillID { get; set; }
        public string SkillName { get; set; }

    }
    public class ResourceProject
    {
        public Int64 ResourceId { get; set; }
        public Int64 ProgramId { get; set; }
        public Int64 ProjectId { get; set; }
    }

    public class ResourceProgramProjectDetails
    {
        public Int64 Id { get; set; }
        public Int64 ProgramId { get; set; }
        public Int64 ProjectId { get; set; }
        public Int64 EmpId { get; set; }
        public string Name { get; set; }
        public string ProgramName { get; set; }
        public string ProjectName { get; set; }
        public string Role { get; set; }
    }

}