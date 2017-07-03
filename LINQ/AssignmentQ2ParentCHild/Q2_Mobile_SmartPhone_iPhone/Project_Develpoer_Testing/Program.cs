using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_Develpoer_Testing
{
    class Program
    {
        static void Main(string[] args)
        {
            richEntities db = new richEntities();
            Development dev = new Development()
            {
                ProjectID = 1001,
                Region = "Noida",
                TeamMembers = 12,
                Technology = "Java",
            };
            db.Projects.Add(dev);
            db.SaveChanges();
        }
    }
}
