using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NewProject_Thursday
{
    class Program
    {
        readonly int num1;
       const int num2=20;
      
       public  Program()
        {
           // num2 = 10; 
           num1 = 10;
        }

        public void Show() 
        {
           // num1 = 10;
            Console.WriteLine(num1+" "+num2);
        }
        static void Main(string[] args)
        {
            Program p1 = new Program();
            p1.Show();
        }
    }
}
