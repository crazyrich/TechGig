using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace MySelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            //HelloServiceLibrary.HelloService
            ServiceHost host = new ServiceHost(typeof(ShowBalance.ShowBalance));
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
