using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Q2_BillingDetails_Client
{
    class Program
    {
        ServiceReference1.Interface1Client client = new ServiceReference1.Interface1Client();
        public void Accept_BillDetails()
        {
            Console.WriteLine("Enter Bill Details----------");
            Console.WriteLine("Enter billID");
            int billID = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter amount");
            int amount=Convert.ToInt32(Console.ReadLine());
            string date = DateTime.Now.ToString();
            client.Accept_BillDetails(billID,date,amount);

        }
        static void Main(string[] args)
        {
            Program obj = new Program();
            obj.Accept_BillDetails();
        }
    }
}
