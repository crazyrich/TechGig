using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Abstract_1
{
//CLASS 1
    abstract class Employee
    {
        public abstract void rules();

        public virtual void norules()
        {
            Console.WriteLine("GENERIC NO Rules");
        }
    }
    //CLASS 2
    class PermanentEmployee : Employee
    {
        public override  void rules()
        {
            Console.WriteLine("Permanent Rules");
        }

        public override void norules()
        {
            Console.WriteLine("Permanent NO Rules");
        }
    }
    //CLASS 3
  class OnsiteEmployee :PermanentEmployee
        {
            public override void rules()
            {
                Console.WriteLine("Onsite Rules");
            }
            public void norules()
            {
                Console.WriteLine("ONsite NO Rules");
            }

        }
  class Program
            {
                static void Main(string[] args)
                {
                 
                    Employee obj4 = new PermanentEmployee();
                    obj4.rules();
                    obj4.norules();
                }
            }
 }
   