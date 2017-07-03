using System;


namespace Question1
{
    class Program
    {
        static void Main(string[] args)
        {
            int []array;
            array=new Int32[10];

            for (int i = 0; i < 10;i++ )
            {
                array[i]=Convert.ToInt32(Console.ReadLine());

            }
            //ASCENDING OREDR STARTS
             int temp=0;
            for (int i = 1; i <=10-1; i++)
            {
                for (int j = 0; j <= (10 - 1) - i;j++ )
                {
                    if (array[j] > array[j + 1])
                    {
                        temp = array[j + 1];
                        array[j + 1] = array[j];
                        array[j] = temp;
                    }
                    else
                    {
                        continue;
                    }
                }
            }//ASC OREDR ENDS
           
             for (int i = 0; i < 10;i++ )
            {
                Console.Write(array[i]+" ");

            }
             Console.WriteLine("");
             //LOWEST SCORES
             for (int i = 0; i < 3; i++)
             {
                 Console.Write(array[i] + " ");
             }
             Console.WriteLine("");
            //
            //HIGHEST SCORES
             for (int i = 9; i >= 7; i--) {
                 Console.Write(array[i]+" ");
             }
             Console.WriteLine("");
            //
           
        }
    }
}
