using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
   public class Release
    {
       public long ReleaseId { get; set; } 
       public string Calender { get; set; }
        public string Title { get; set; }
        public DateTime ReleaseDate { get; set; }
        public int IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string UpdatedBy { get; set; }
        public string Description { get; set; }
        public string ContactPerson { get; set; }
        public string ReleaseType { get; set; }
       

    }
}