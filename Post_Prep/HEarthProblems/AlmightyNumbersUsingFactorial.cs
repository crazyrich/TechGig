using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    class AlmightyNumbersUsingFactorial
    {

        public static int factorial(int n)
        {
            int fact = 1;
            if(n == 0  || n == 1)
            {
                return 1;
            }
            fact = factorial(n-1) * n;
            return fact;
        }
        public static void Main7(string[] args)
        {
            int t = int.Parse(Console.ReadLine());

            //List<int> nonCommon = new List<int>();
            //int almighty = 0;
            //int l = 0;
            //bool flag = true;
            while (t-- > 0)
            {
                //almighty = 0;
                int[] ab = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
                int a = ab[0];
                int b = ab[1];
                int bLength = b.ToString().Length;
                int aLength = a.ToString().Length;
                int sum = 0;
                for (int i = aLength; i <= bLength; i++)
                {
                  sum +=  factorial(i);
                }
                Console.WriteLine(sum);
            }
            Console.ReadLine();

        }

        
    }
}
