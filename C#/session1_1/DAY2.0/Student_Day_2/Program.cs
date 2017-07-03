using System;

namespace Student_Day_2
{
    class Program
    {
        static int[] marks;
        static int[] marks2;
        static int n;
      
        static void Main(string[] args)
        {
           
         
          
            marks = new Int32[5];
            
            for (int i = 0; i < marks.Length; i++)
            {
                marks[i] = Convert.ToInt32(Console.ReadLine());
            }
            Console.WriteLine("how many numbers");
            n = Convert.ToInt32(Console.ReadLine());
            //APPENED at the END
            for (int y = 0; y < n; y++)
            {

                Console.WriteLine("Enter new marks");

                for (int i = 0; i <= marks.Length; i++)
                {
                    if (i == marks.Length)
                    {
                        //marks2 = new Int32[i+1];
                        Array.Resize(ref marks, i + 1);
                        marks[i+1] = Convert.ToInt32(Console.ReadLine());
                        // Console.WriteLine(marks.Length + " ");
                        for (int x = 0; x < marks.Length; x++)
                        {
                            marks2[x] = marks[x];
                        }
                        
                        break;

                    }
                    else
                        continue;
                }
            }
            //
            Console.WriteLine("======== ");
            for (int i = 0; i < marks.Length; i++)
            {
                Console.Write(marks[i]+" ");
            }
            
        }
    }
}
