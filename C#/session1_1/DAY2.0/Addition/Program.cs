using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Addition
{
    class Program
    {
        public int Sum(params int[] array)
        {
            int m = 0;
            foreach (int x in array)
            {
                m = m + x;
            }
            return m;
        }
        
        static void Main(string[] args)
        {
            int[] array;
            int hold;
            Program obj= new Program();
            hold = obj.Sum(10,10,10);
            Console.WriteLine("Sum is " + hold);

        }
    }
}
