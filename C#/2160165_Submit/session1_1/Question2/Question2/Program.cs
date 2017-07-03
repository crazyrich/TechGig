using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question2
{
    class Program
    { 
        static void Main(string[] args)
        {
            int[,] array;
            array = new Int32[3, 4];
            for (int i = 0; i < 3;i++ )
            {
                for (int j = 0; j < 4;j++ )
                {
                    array[i,j]=Convert.ToInt32(Console.ReadLine());

                }
            }
            
                //print
            int max = 0;
            int min = 0;
            float sum = 0;
            float avg = 0;
                for (int i = 0; i < 3; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {


                        //maximum function
                        if (j == 0)
                        {
                           
                            for (int k = i; k <= i; k++)
                            {
                                for (int l = 0; l < 4; l++)
                                {
                                    if (l == 0)
                                    {
                                        max = array[k, 0];
                                    }

                                    if (max > array[k, l])
                                    {
                                        continue;
                                    }
                                    else
                                    {
                                        max = array[k, l];
                                    }


                                }
                                Console.Write(max + " ");

                            }
                        }//if ends

                        //max ends
                        //MIN
                        if (j == 0)
                        {

                            for (int k = i; k <= i; k++)
                            {
                                for (int l = 0; l < 4; l++)
                                {
                                    if (l == 0)
                                    {
                                        min = array[k, 0];
                                    }

                                    if (min < array[k, l])
                                    {
                                        continue;
                                    }
                                    else
                                    {
                                        min = array[k, l];
                                    }


                                }
                                Console.Write(min + " ");

                            }
                        }//if ends

                        //MIN ends
                        //SUM
                        if (j == 0)
                        {

                            for (int k = i; k<= i; k++)
                            {
                                for (int l = 0; l < 4; l++)
                                {
                                    if (l == 0)
                                    {
                                        sum = array[k, 0];
                                        continue;
                                    }
                                    sum = sum + array[k, l];
                                   
                                }
                                Console.Write(sum + " ");

                            }
                        }//if ends

                        //SUM

                    //AVG STARTS
                        if (j == 0)
                        {

                            for (int k = i; k <= i; k++)
                            {
                                for (int l = 0; l < 4; l++)
                                {
                                    if (l == 0)
                                    {
                                        sum = array[k, 0];
                                        continue;
                                    }
                                    sum = sum + array[k, l];
                                }
                                 avg=sum/4;
                                Console.Write(avg + " ");

                            }
                        }//if ends
                        //AVG ENDS

                        Console.Write(array[i, j]);
                     }
                    Console.WriteLine(" ");
                }
            //print ends
        
        }
    }
}
