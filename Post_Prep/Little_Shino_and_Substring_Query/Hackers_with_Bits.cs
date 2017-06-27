using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Little_Shino_and_Substring_Query
{
    class Hackers_with_Bits
    {
        public static int IndexOf(byte[] input, byte[] pattern)
        {
            byte firstByte = pattern[0];
            int index = -1;

            if ((index = Array.IndexOf(input, firstByte)) >= 0)
            {
                for (byte i = 0; i < pattern.Length; i++)
                {
                    if (index + i >= input.Length ||
                     pattern[i] != input[index + i]) return -1;
                }
            }

            return index;
        }
        static void Main(string[] args)
        {
            byte n = byte.Parse(Console.ReadLine());
            byte[] Numbers = Array.ConvertAll(Console.ReadLine().Split(' '), byte.Parse);

            //var ordered = from i in words
            //              orderby i ascending
            //              select i;
            byte maxLength = 0;
            byte tempLength = 0;

            for (byte i = 0; i < n; i++)
            {

                if (Numbers[i] == 1)
                {
                    tempLength++;
                }
                else
                {
                    tempLength = 0;
                }

                if (tempLength > maxLength)
                {
                    maxLength = tempLength;
                }
            }
            byte pattern = { 1, 1, 1 };
            int a = IndexOf(Numbers, pattern);
            Console.WriteLine(maxLength);
            Console.Read();
        }

    }
}
