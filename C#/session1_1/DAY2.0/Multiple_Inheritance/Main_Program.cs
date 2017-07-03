using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Multiple_Inheritance
{
    //CLASS 1
    class Employee
    {
        public virtual void rules()
        {
            Console.WriteLine("Generic Rules");
        }
    }
    //CLASS 2
    class PermanentEmployee : Employee
    {
        public override  void rules()
        {
            Console.WriteLine("Permanent Rules");
        }
    }
    //CLASS 3
  class OnsiteEmployee :PermanentEmployee
        {
            public void rules()
            {
                Console.WriteLine("Onsite Rules");
            }

        }
  class Main_Program
            {
                static void Main(string[] args)
                {
                    Employee obj1 = new Employee();
                    obj1.rules();
                    PermanentEmployee obj2 = new PermanentEmployee();
                    obj2.rules();
                    OnsiteEmployee obj3 = new OnsiteEmployee();
                    obj3.rules();
                    //DOWNCASTING
                    Employee obj4 = new PermanentEmployee();
                    obj4.rules();
                }
            }
        }
   