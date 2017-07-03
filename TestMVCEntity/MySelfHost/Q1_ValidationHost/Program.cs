using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace Q1_ValidationHost
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceHost host = new ServiceHost(typeof(ValidationService.ValidationClass));
            host.Open();
            Console.WriteLine("Service Is Ready !");
            Console.ReadLine();
            Console.WriteLine("Press Any Key To Stop The Service");
            Console.WriteLine("Service Is Stop");
            host.Close();
            Console.ReadLine();
        }
    }
}
