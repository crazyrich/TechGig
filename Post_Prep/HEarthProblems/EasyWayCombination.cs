using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    class EasyWayCombination
    {

        private static Int32[] CalculateFactors(int number)
        {
            int [] factors = {};
            
            for (int i = 1; i < number / 2;i++ )
            {
                if(number/i == 0)
                {
                    factors.ToList().Add(i);
                }
            }
            return factors;
        }

        private static int GCF(int numenator,int denomenator)
        {
            int gcf = 1;
            int[] factorsOfNumenator = CalculateFactors(numenator);
            int[] factorsOfDenomenator = CalculateFactors(denomenator);
            int[] commonFactors = { };
            foreach(var i in factorsOfDenomenator)
            {
                if(factorsOfNumenator.ToList().Contains(i))
                {
                    commonFactors.ToList().Add(i);
                }
            }
            gcf = max(commonFactors);
            return gcf;
        }

        private static int max(int [] array)
        {
            int max = 1;
            foreach(var i in array)
            {
                if(i> max)
                {
                    max = i;
                }
            }
            return max;
        }
        static void Main3(string[] args)
        {
            int t = int.Parse(Console.ReadLine());
            for (; t > 0; t--)
            {
                int[] nk = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
                int n = nk[0];
                int k = nk[1];
                int countOfk = 0;
                int[] numbers = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
                foreach (var i in numbers)
                {
                    if (i == k)
                    {
                        countOfk++;
                    }
                }
                int totalNumbers = numbers.Count();
                int numenator = countOfk * (countOfk - 1) * (countOfk - 2);
                int denomenator = totalNumbers * (totalNumbers - 1) * (totalNumbers - 2);
                
                if (countOfk == 0)
                {
                    Console.WriteLine(0);
                }
                else
                {
                    int divisor = GCF(numenator,denomenator);
                    Console.WriteLine(numenator/divisor + "/" + denomenator/divisor);
                }
            }
        }
    }
}
