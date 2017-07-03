using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace assignment_day1
{
    class Ques3
    { 
        static void Main(string[] args)
        {
            int[][] arrayz;
            arrayz = new Int32[4][];

            arrayz[0]=new Int32[6];
            arrayz[1] = new Int32[9];
            arrayz[2] = new Int32[3];
            arrayz[3] = new Int32[12];

            int x = 0, y = 0;
            while(x<arrayz.Length){
                y = 0;
                while(y<arrayz[x].Length){
                    arrayz[x][y] = Convert.ToInt32(Console.ReadLine());
                    y++;
                }
                x++;
                Console.WriteLine("");
            
            }

            //print
            x=y=0;
            while (x < arrayz.Length)
            {
                y = 0;
                while (y < arrayz[x].Length)
                {
                   Console.Write(arrayz[x][y]+" ");
                    y++;
                }
                x++;
                Console.WriteLine("");

            }
        }
    }
}
