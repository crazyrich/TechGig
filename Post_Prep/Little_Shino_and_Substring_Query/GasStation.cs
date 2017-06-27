using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Little_Shino_and_Substring_Query
{
    class GasStation
    {
        static void Main1(string[] args)
        {
            int[] nx = Array.ConvertAll(Console.ReadLine().Split(' '),int.Parse);
            int n = nx[0];
            int x = nx[1];
            int[] P = Array.ConvertAll(Console.ReadLine().Split(' '),int.Parse);
            int fuelLeft = x;
            int stations = 0;
            foreach(var i in P)
            {
                 if(fuelLeft < i)
                {
                    Console.WriteLine("1");
                    break;
                }
                 else
                 {
                    stations++;
                    fuelLeft =- i;
                    if(fuelLeft<= 0)
                    {
                        Console.WriteLine(stations);
                        break;
                    }
                 }
            }
                
            
        }
    }
}
