using System;

namespace Array1
{
    class Array //ARRAY IMPLEMENTATION
    {
        static void Main(string[] args)
        {
         //SINGLE DIMENESION ARRAY STARTS
            int[] array;
            array = new Int32[10];


            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine("Enter {0} ID", i + 1);
                array[i] = Convert.ToInt32(Console.ReadLine());

            }

            for (int i = 0; i < 10; i++)
            {
                //REST WILL PRINT 0
                Console.WriteLine(array[i] + " ");

            }
            foreach (int i in array)
            {
                Console.WriteLine(i + " ");

            }
         //ENDS

         //multidimensional array STARTS
            int [,] array2;
            array2 =new Int32[3,4];
            int x=0,y=0;
            while (x < 3) 
            {
                y = 0;
                while (y < 4) 
                {
                    array2[x,y]=Convert.ToInt32(Console.ReadLine());
                    y++;
                }
                x++;
            }
            x = y = 0;
            while (x < 3)
            {
                y = 0;
                while (y < 4)
                {
                    Console.Write(array2[x,y]+" ");
                    y++;
                }
                Console.WriteLine();
                x++;
            }
         //ENDS

         //STARTS ZAGED
            int[][] arrayz;
            arrayz= new Int32 [4][];

            arrayz[0]=new Int32[6];
             arrayz[1]=new Int32[1];
             arrayz[2]=new Int32[2];
             arrayz[3]=new Int32[4];
            

            int i=0,j=0;
            while(i<arrayz.Length){
            j=0;
                while(j<arrayz[i].Length){
                   arrayz[i][j]=Convert.ToInt32(Console.ReadLine());
                    j++;
                }
                Console.WriteLine();
                i++;
            }

            //print
            i = j = 0;
             while(i<arrayz.Length){
            j=0;
                while(j<arrayz[i].Length){
                   Console.Write(arrayz[i][j]+" ");
                    j++;
                }
                Console.WriteLine();
                i++;
            }

        //ENDS
            Console.ReadLine();
        }
    }
}
