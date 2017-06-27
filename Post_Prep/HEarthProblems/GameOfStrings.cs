using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HEarthProblems
{
    class GameOfStrings
    {
        public static void Main1(string [] args)
        {
            int t = int.Parse(Console.ReadLine());
            while(t-- > 0)
            {
                string[] sk = Console.ReadLine().Split(' '); ;
                string s = sk[0];
                int k = int.Parse(sk[1]);
                int length = s.Length;
                string error = "Puchi is a cheat!";
                int index = 0;
                for (int i = 1; i <= length; i++ )
                {
                    string common = s.Substring(0, i);
                    int commonLength = common.Length;
                    if (common == s.Substring(length - i, i) && k>commonLength)
                    {

                        string ss = s.Substring(commonLength, k - commonLength);
                        if(ss.Contains(common))
                        {
                            index = i;
                        }
                    }
                }
                if (index>0)
                {
                    Console.WriteLine(s.Substring(0, index));
                }
                else
                {
                    Console.WriteLine(error);
                }
            
            }
            Console.ReadLine();
        }
    }
}
