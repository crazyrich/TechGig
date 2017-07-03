using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Emp_Developer_Tester_TeamLead_ProjectManager
{
    class Program
    {
        static void Main(string[] args)
        {
            richEntities re = new richEntities();
            Developer dev = new Developer()
            {
                Region = "New Delhi",
                EmpID = 1001,
                Name = "Ashok",
            };
            re.EmpQ2.Add(dev);
            re.SaveChanges();
        }
    }
}
