using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question7
{
    class Program
    {
        
      
        static void Main(string[] args)
        {
            int item=0;
            int charge=0;
            int num=0;
            string[] menu = { "roti", "chawal", "dal" };
            int[] price = { 5, 100, 200 };

            Console.WriteLine("MENU is ");
            for (int i = 0; i < 3;i++ )
            {
                Console.Write((i+1)+" "+menu[i]+",");
            }

            for(int i=0;i<3;i++){
                item = Convert.ToInt32(Console.ReadLine());
                switch (item)
                {
                    case 1:
                        Console.WriteLine("how many roti do u want");
                        num = Convert.ToInt32(Console.ReadLine());

                        charge = charge + (price[0] * num);
                        Console.WriteLine("CHARGE for roti is " + charge);
                        break;
                    case 2:
                        Console.WriteLine("how much chawal do u want");
                        num = Convert.ToInt32(Console.ReadLine());
                        charge = charge + (price[1] * num);
                        Console.WriteLine("CHARGE for chawal is " + charge);
                        break;
                    case 3:
                        Console.WriteLine("how much dal do u want");
                        num = Convert.ToInt32(Console.ReadLine());
                        charge = charge + (price[2] * num);
                        Console.WriteLine("CHARGE for dal is" + charge);
                        break;
                    default:
                        Console.WriteLine("BE IN LIMITS!!");
                        break;
                   }
                }
            
            Console.WriteLine("CHARGE is "+charge);
 
        }
    }
}
