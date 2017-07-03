using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question1
{
    class Employee
    {
        int EmpID;
        string EmployeeName;
        int Salary;

        public void AcceptDetails() {

            Console.WriteLine("Enter ID");
            this.EmpID=Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Name");
            this.EmployeeName=Console.ReadLine();
            Console.WriteLine("Enter Salary");
             this.Salary=Convert.ToInt32(Console.ReadLine());
          
        }
        public void PrintDetails() {
            bool set;
            if (Salary > 5000)
            {
                Console.WriteLine("ID {0} Name {1} Salary {2}  ", EmpID, EmployeeName, Salary);
               
            }
            else
                set = true;
           
               
        }
        static void Main(string[] args)
        {
            Employee[] array;
            array = new Employee[10];

          
            for (int i = 0; i < 10; i++)
            {
                array[i] = new Employee();
                array[i].AcceptDetails();
            }
            for (int i = 0; i < 10; i++)
            {
                array[i].PrintDetails();
            }
            
        }
    }
}
