using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioWebApp.Models
{
    public class Finance
    {
        public int FinanceID { get; set; }
        public int ProgramID { get; set; }
        public string ProgramName { get; set; }
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public double AllocatedBudget { get; set; }
        public double UsedBudget { get; set; }
        public double RevisedBudget { get; set; }
        public string Comments { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }

    }
}