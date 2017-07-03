using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NonStatic_Static_2
{

    //PARENT CLASS
    class Employee {
        public static int EmployeeCount;//static
        public string EmpName="ram";
        public string EmpId;

    }

    //CHILD CLASS
    class PermanentEmployee:Employee {
        public void Show() {
            EmployeeCount = 2;
            Console.WriteLine("EmpName {0} EmployeeCount {1}",EmpName,EmployeeCount);
        }
    }
    //MAIN CLASS
    class Main_Class
    {
       
        static void Main(string[] args)
        {
            PermanentEmployee obj1 = new PermanentEmployee();
            obj1.Show();

            Employee obj2 = new Employee();
            Console.WriteLine(Employee.EmployeeCount+" ");
        }
    }
}
