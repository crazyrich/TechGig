using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Partial_1
{
   partial class Employee
    {
         partial void Rules()
        {
            Console.WriteLine("employee 1 Rules");
        }
         public void Show()
         {
             Rules();
         }
        
    }
    //CLASS 2
    
  partial class Employee
    {
       partial void Rules();
      
    }
    class Program
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            obj.Show();
        
        }
    }
}
