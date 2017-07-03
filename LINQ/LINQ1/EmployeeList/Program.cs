using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeList
{

    class Employee
    {
        public string EmpID;
        public string EmpName;
        public int Salary;
    }
    class Program
    {
        static void Main(string[] args)
        {

            List<Employee> empList = new List<Employee>();
            empList.Add(new Employee() { EmpID = "E001", EmpName = "Anish", Salary = 1000 });
            empList.Add(new Employee() { EmpID = "E001", EmpName = "Anish", Salary = 1000 });
            empList.Add(new Employee() { EmpID = "E002", EmpName = "Anisha", Salary = 6000 });
            empList.Add(new Employee() { EmpID = "E003", EmpName = "Deepika", Salary = 3000 });
            empList.Add(new Employee() { EmpID = "E004", EmpName = "Selena", Salary = 3000 });
            empList.Add(new Employee() { EmpID = "E005", EmpName = "Arsh", Salary = 2000 });

            var result = from elist in empList
                         where elist.Salary > 5000
                         select elist;
            foreach(var item in result)
            {
                Console.WriteLine(item.EmpID+"  "+item.EmpName+"   "+item.Salary);
            }
        }
    }
}
