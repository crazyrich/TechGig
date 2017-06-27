using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    class TanyaAndLassi
    {
        public static int splitNum(int number,int []  price)
        { 
            int [] dp = new int[number+1];
            dp[0]=0;
            for (int i = 1; i <= number; i++)
            {
                int l = 0;
                for (int j = 0; j < i; j++)
                {
                   l = Math.Max(l,price[j]+dp[i-j-1]);
                }
                dp[i] = l;
            }
            return dp[number];
        }

        public static void Main4(string [] args)
        {
            int t = int.Parse(Console.ReadLine());
           
            while(t-- > 0)
            {
                int l = int.Parse(Console.ReadLine());
                int[] price = new int[l];
                price = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
                int maxProfit = splitNum(l,price);
                Console.WriteLine(maxProfit);
            }
        }
    }
}
