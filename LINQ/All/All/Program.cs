using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace All
{
    class Program
    {
        static void Main(string[] args)
        {
            EmpCompContainer db = new EmpCompContainer();
            Computer comp1 = new Computer() { CompID = 1001, CompName = "Dell", EmpID = 1001, Price = 10000 };
            Computer comp2 = new Computer() { CompID = 1002, CompName = "HP", EmpID = 1002, Price = 20000 };

            Employee emp1 = new Employee() { EmpID = 1001, EmpName = "Ashok", CompID = 1001, Age = 30 };
            Employee emp2 = new Employee() { EmpID = 1002, EmpName = "Ankit", CompID = 1002, Age = 29 };


            db.Computers.Add(comp2);
            db.Employees.Add(emp2);
            db.SaveChanges();
        }
    }
}
