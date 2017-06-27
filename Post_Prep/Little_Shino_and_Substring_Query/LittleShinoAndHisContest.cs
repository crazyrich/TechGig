using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Little_Shino_and_Substring_Query
{
    class LittleShinoAndHisContest
    {
        static void Main4()
        {
            int[] totalT = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
            int TLength = totalT.Length;
            int[] minT = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
            bool exitF = true;
            int ways = 1;
            int previ = -1;
            while(exitF)
            {
                exitF = false;
                int count = 0;
                for (int i = 0; i < TLength; i++)
                {
                    if(totalT[i] != 0 && i != previ)
                    {
                        count++;
                    }
                }
                previ++;
                
                totalT[previ] = totalT[previ] - minT[previ];
                ways *= count;
                for(int i =0;i<TLength;i++)
                {
                    if (totalT[i] != 0 || totalT[i] < 0)
                    {
                        exitF = true;
                        if(previ+1 >= TLength)
                        {
                            previ = i;
                            break;
                        }
                    }
                    
                }
            }
            Console.WriteLine(ways);
            Console.ReadLine();
        }

    }
}
