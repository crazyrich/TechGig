using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OperatorOverloadingBySir_Unary
{
    class Employee
    {
        public string id, name, email;
        public int salary, experience;
    

        public Employee(int p1, int p2)
        {
            // TODO: Complete member initialization
            salary = p1;
            experience = p2;
        }
      
        public static Employee operator ++(Employee e1)
        {
            for (int i = 0; i < 1000; i++)
            {
                e1.salary++;
            }
            ++e1.experience;
            
            Employee e2 = new Employee(e1.salary, e1.experience);
            for(int i=0;i<1000;i++)
            {
              e2.salary++;
            }
             ++e2.experience;
             return e2;
        }

        public void Show()
        {
            Console.WriteLine("Showing::");
            Console.WriteLine("salary " + salary);
            Console.WriteLine("experience:" + experience);

        }
        static void Main(string[] args)
        {
            Employee e1 = new Employee(15000,2){ id="E001",name="Ashok",email="Gmail.com"};
             Employee e3;
            e3=e1++;
            // e3 = ++e1;
            Console.WriteLine(e3.salary+" "+e3.experience);
        
        }
    }
}
