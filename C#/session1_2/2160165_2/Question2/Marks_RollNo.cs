using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question2
{
    class Marks_RollNo
    {
        static int[] Marks;
        static int[] RollNo;
        static char Grade;
        static void Main(string[] args)
        {
            Marks = new Int32[10];
            RollNo = new Int32[10];
            for (int i = 0; i < Marks.Length; i++)
            {
                Console.WriteLine("Enter Marks and RollNo for {0}",i+1);
                Marks[i] = Convert.ToInt32(Console.ReadLine());
                RollNo[i] = Convert.ToInt32(Console.ReadLine());
            }
            for (int i = 0; i < Marks.Length; i++)
            {
                if (Marks[i] >= 0 && Marks[i] <= 49)
                {
                    Grade = 'D';
                }
                else if (Marks[i] >= 50 && Marks[i] <= 64)
                {
                    Grade = 'C';
                }
                else if (Marks[i] >= 65 && Marks[i] <= 79)
                {
                    Grade = 'B';
                }
                else if (Marks[i] >= 80 && Marks[i] <= 100)
                {
                    Grade = 'A';
                }
                else
                    Console.WriteLine("Invalid Entry");
            }

            for (int i = 0; i < Marks.Length; i++)
            {
                Console.WriteLine("Marks for " + (i+1) + " are " + Marks[i] + " and RollNo is " + RollNo[i]);
            }
        }
    }
}
