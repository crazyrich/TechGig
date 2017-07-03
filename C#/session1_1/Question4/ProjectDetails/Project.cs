using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectDetails
{
    public class Project
    {
        string technology;
        int teamSize;
        string operatingSystem;
        string clientName;
        int time;
        public void ProjectDetails() { 
             Console.Write("Enter tech");
            technology=Console.ReadLine();
            Console.Write("Enter teamSize");
            teamSize = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter operating system");
            operatingSystem =Console.ReadLine();
            Console.Write("Enter clientName");
            clientName = Console.ReadLine();
            Console.Write("Enter time");
            time = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("technology " + technology + "teamSize " + teamSize + " operatingSystem " +operatingSystem + "clientName " + clientName + "time " + time);

        
        }
    }
}
