using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Little_Shino_and_Substring_Query
{
    class Program
    {
        static void Main2(string[] args)
        {
            int[] nq = Array.ConvertAll(Console.ReadLine().Split(' '),int.Parse);
            int n = nq[0];
            int q = nq[1];
            string[] words = Console.ReadLine().Split(' ');
            var ordered = from i in words
                          orderby i ascending
                          select i;
            string[] orderA = ordered.ToArray();
                
            while(q-- > 0)
            {
                string s = Console.ReadLine();
               
                string smallWord = string.Empty;
               
                string largeWord = string.Empty;
                for (int i = 0; i < n;i++ )
                {
                    if (orderA[i].Contains(s))
                    {
                        smallWord = orderA[i];
                        break;
                    }
                }
                for (int i = n-1; i >= 0; i--)
                {
                    if (orderA[i].Contains(s))
                    {
                        largeWord = orderA[i];
                        break;
                    }
                }
                if (!string.IsNullOrEmpty(smallWord))
                {
                 for(int i = 0;i< words.Length;i++)
                    {
                         if (words[i] == smallWord)
                            {
                             Console.Write(i + " ");
                             break;
                            }
                    
                    }
                }
                else Console.Write("-1 ");
                if (!string.IsNullOrEmpty(largeWord))
                {
                for (int i =  words.Length -1; i >=0; i--)
                {
                    
                        if (words[i] == largeWord)
                        {
                             Console.Write(i);
                             break;
                        }
                    
                }
                }
                else Console.Write("-1");
                Console.WriteLine();
            }
                
            }
        }
    }

