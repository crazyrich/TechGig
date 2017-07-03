using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace BeginnerCodeChamp
{
    class Program
    {
        //static System.Text.StringBuilder replace(System.Text.StringBuilder sb, int indx)
        //{
        //    int len = sb.Length;
        //    for (int i = indx - 1; i < len; i += indx )
        //    {
        //      sb[i] = '*';
        //    }
        //    return sb;
        //}
        static int nochange_bits(string input1, int input2, int input3)
        {
            if (input2 <= 0 || input3 <= 0)
            {
                return -1;
            }
            else
            {
                System.Text.StringBuilder sb = new System.Text.StringBuilder(input1);
                System.Text.StringBuilder sbOriginal = new System.Text.StringBuilder(input1);
                
                int len = sb.Length;
                for (int i = input2 - 1; i < len; i += input2)
                {
                    if(sb[i] == '0')
                    {
                        sb[i] = '1';
                    }
                    else if (sb[i] == '1')
                    {
                        sb[i] = '0';
                    }
                }
                for (int i = input3 - 1; i < len; i += input3)
                {
                    if (sb[i] == '0')
                    {
                        sb[i] = '1';
                    }
                    else if (sb[i] == '1')
                    {
                        sb[i] = '0';
                    }
                }
                int output = 0;
                for (int i = 0; i < len; i++)
                {
                    if(sb[i] == sbOriginal[i])
                    {
                        output += 1;
                    }
                }
                return output;            
            }
           
        }
        static void Main(String[] args)
        {
            int output;
            string ip1;
            ip1 = Console.ReadLine();
            int ip2;
            ip2 = Convert.ToInt32(Console.ReadLine());
            int ip3;
            ip3 = Convert.ToInt32(Console.ReadLine());
            output = nochange_bits(ip1, ip2, ip3);
            Console.WriteLine(output);
            Console.ReadLine();
        }
    }
}
