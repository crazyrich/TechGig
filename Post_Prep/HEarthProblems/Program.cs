using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    //class Program
    //{
    //    private static Int32 CalculateFactorial(int number)
    //    {
    //        int fact = 1;
    //        if (number == 0 || number == 1)
    //        {
    //            return 1;
    //        }
    //        else
    //        {
    //          fact = CalculateFactorial(number-1) * (number); 
    //        }
    //        return fact;
    //    }

    //    private static Int32 Combination(int number)
    //    {
    //        int didvidend = CalculateFactorial(number);
    //        int divisor1 = CalculateFactorial(number - 3);
    //        int divisor2 = CalculateFactorial(number-(number-3));
    //        return didvidend / (divisor1 * divisor2);
    //    }
    //    static void Main(string[] args)
    //    {
    //        int t = int.Parse(Console.ReadLine());
    //        for (;t>0;t-- )
    //        {
    //            int[] nk = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
    //            int n = nk[0];
    //            int k = nk[1];
    //            int countOfk = 0;
    //            int[] numbers = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
    //            int combination_divisor = Combination(numbers.Count());
    //            foreach (var i in numbers)
    //            {
    //                if (i == k)
    //                {
    //                    countOfk++;
    //                }
    //            }
    //            int combination_dividend = 0;
    //            if (countOfk == 0)
    //            {
    //                 combination_dividend = 0;
    //                 Console.WriteLine(0);
    //            }
    //            else
    //            {
    //                 combination_dividend = Combination(countOfk);
    //                 Console.WriteLine(combination_dividend +"/"+ combination_divisor);
    //            }
    //        }
    //    }
    //}

    class Program
    {

        private static List<int> CalculateFactors(int number)
        {
            List<int> factors = new List<int>();

            for (int i = 1; i <= number / 2; i++)
            {
                if (number % i == 0)
                {
                    factors.Add(i);
                }
            }
            factors.Add(number);
            return factors;
        }

        private static int GCF(int numenator, int denomenator)
        {
            int gcf = 1;
            List<int> factorsOfNumenator = new List<int>();
            List<int> factorsOfDenomenator = new List<int>();
            List<int> commonFactors = new List<int>();
            factorsOfNumenator = CalculateFactors(numenator);
            factorsOfDenomenator = CalculateFactors(denomenator);
          
            foreach (var i in factorsOfDenomenator)
            {
                if (factorsOfNumenator.Contains(i))
                {
                    commonFactors.Add(i);
                }
            }
            gcf = max(commonFactors);
            return gcf;
        }

        private static int max(List<int> factors)
        {
            int max = 1;
            foreach (var i in factors)
            {
                if (i > max)
                {
                    max = i;
                }
            }
            return max;
        }
        static void Main2(string[] args)
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
                    Console.WriteLine(0/1);
                }
                else
                {
                    int divisor = GCF(numenator, denomenator);
                    Console.WriteLine(numenator / divisor + "/" + denomenator / divisor);
                }
            }
        }
    }

}
