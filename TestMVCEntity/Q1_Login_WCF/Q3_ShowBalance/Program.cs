using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Q3_ShowBalance
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Choose Option : ");
            Console.WriteLine("0 : CheckBalance");
            Console.WriteLine("1 : CheckValidity");
            int choose = Convert.ToInt32(Console.ReadLine());
            Program obj = new Program();
            switch(choose)
            {
                case 0:
                    obj.CheckBal();
                    break;
                case 1:
                    obj.CheckVal();
                    break;
                default:
                    Console.WriteLine("Enter Valid Option !");
                    break;
            }

        }

        private void CheckVal()
        {
            ServiceReference1.Interface1Client client = new ServiceReference1.Interface1Client();

            int  num=Convert.ToInt32(Console.ReadLine());
            client.Check_Validity(num);
        }

        private void CheckBal()
        {
            ServiceReference1.Interface1Client client = new ServiceReference1.Interface1Client();

            int num = Convert.ToInt32(Console.ReadLine());
            client.Check_Balance(num);
        }
    }
}
