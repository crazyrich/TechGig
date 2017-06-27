using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public class ViewModelResource
    {
        public Int64 PID { get; set; }
        public string PName { get; set; }
        public Int32 ResourceCount { get; set; }
        public Int32 Utilization { get; set; }

        //public Int64 AvailableHours { get; set; }
        //public Int64 UsedHours { get; set; }

    }
}