using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    class AlmightyNumbers
    {
        public static int[] digitArr(int n)
        {
            if (n == 0) return new int[1] { 0 };

            var digits = new List<int>();

            for (; n != 0; n /= 10)
                digits.Add(n % 10);

            var arr = digits.ToArray();
            Array.Reverse(arr);
            return arr;
        }
        public static void Main6(string[] args)
        {
            int t = int.Parse(Console.ReadLine());

            int[] arr = { };
            List<int> nonCommon = new List<int>();
            int almighty = 0;
            int l = 0;
            bool flag = true;
            while (t-- > 0)
            {
                almighty = 0;
                int[] ab = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
                int a = ab[0];
                int b = ab[1];
                for (int i = a; i <= b; i++)
                {
                    flag = true;
                    nonCommon.Clear();
                    arr = digitArr(i);
                    l = arr.Length;
                    foreach (var j in arr)
                    {
                        if (j > l || nonCommon.Contains(j) || j == 0)
                        {
                            flag = false;
                            break;
                        }
                        else
                        {
                            nonCommon.Add(j);
                        }
                    }
                    if (flag)
                    {
                        almighty++;
                    }
                }
                    Console.WriteLine(almighty);
            }
            Console.ReadLine();

        }

        
        
    }
}
