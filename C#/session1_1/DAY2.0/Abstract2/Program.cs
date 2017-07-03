using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract2
{
    //CLASS 1
     public class Employee
    {
        
         public Employee() {
            Console.WriteLine("Constructor of emp");
        }
        ~Employee()
        {
            Console.WriteLine("Desstructor of emp");
        }
        public void rules()
        {
            Console.WriteLine("GENERIC NO Rules");
        }
    }
    //CLASS 2
    public class PermanentEmployee : Employee
    {
        public PermanentEmployee()
        {
            Console.WriteLine("Constructor of permanent");
        }
        ~PermanentEmployee()
        {
            Console.WriteLine("Desstructor of permanent");
        }
        public void rules()
        {
            Console.WriteLine("Permanent Rules");
        }

       
    }
    //CLASS 3
    public class OnsiteEmployee : PermanentEmployee
    {
        public  OnsiteEmployee()
        {
            Console.WriteLine("Constructor of onsite");
        }
        ~OnsiteEmployee()
        {
            Console.WriteLine("Desstructor of onsite");
        }
        public  void rules()
        {
            Console.WriteLine("Onsite Rules");
        }
      
    }
    class Program
    {
        static void Main(string[] args)
        {
     
            OnsiteEmployee obj4 = new OnsiteEmployee();
            Console.WriteLine("====================");
            //obj4.rules();
          
        }
    }
}
