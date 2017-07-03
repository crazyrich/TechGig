using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ServiceModel;
namespace MySelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            ServiceHost host = new ServiceHost(typeof(MovieService.MovieService));
            host.Open();
            Console.WriteLine("Service is up !!");
            Console.WriteLine("Press any key to stop it !!");
            Console.ReadLine();
            host.Close();
            Console.WriteLine("Press stopped !!");
            Console.ReadLine();

        }
    }
}
