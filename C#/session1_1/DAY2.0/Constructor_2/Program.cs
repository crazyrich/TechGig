using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Constructor_2
{
    //CLASS 1
    public class Employee
    {

        public Employee(string name)
        {
            Console.WriteLine("Constructor of emp");
        }
        ~Employee()
        {
            Console.WriteLine("Desstructor of emp");
        }
        //RULE
        public void Rule() {
            Console.WriteLine("Rules of EMPLOYEE");
        }
       
    }
    //CLASS 2
    public class PermanentEmployee : Employee
    {
        public PermanentEmployee(string name):base(name)
        {
            Console.WriteLine("Constructor of permanent");
        }
        ~PermanentEmployee()
        {
            Console.WriteLine("Desstructor of permanent");
        }
        public void Rule()
        {
            Console.WriteLine("Rules of PERMANENTEMPLOYEE");
        }
       
       

    }
    //CLASS 3
   
    class Program
    {
        static void Main(string[] args)
        {

           PermanentEmployee obj4 = new PermanentEmployee("Ram");
            Console.WriteLine("====================");
        }
    }
}