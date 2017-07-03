using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionCalling
{
    class Program
    {
      
        double salary;
        double increment;
        //WE WILL CALL THIS FUNCTION-----
      
       public double CalculateSalary(double sal,double inc) {
            salary = sal;
            increment = inc;
            double total = salary * 12;
            double inc2=((increment / 100) * total);
            double cal = total + inc2 ;
            return cal;
        
        }
        static void Main(string[] args)
        {
            double i;
            Program obj = new Program();
            i=obj.CalculateSalary(1000,80);
            Console.WriteLine(i);

        }
    }
}
