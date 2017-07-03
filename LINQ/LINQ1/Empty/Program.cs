using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Empty
{
    class Program
    {
        static void Main(string[] args)
        {
            Model1Container db = new Model1Container();

            EmployeeDetails emp1 = new EmployeeDetails() { EmpId=1001,Name="Ashok",Phone="12345567890",Email="gmail.com"};
            EmployeeDetails emp2 = new EmployeeDetails() { EmpId = 1001, Name = "Ashu", Phone = "12345567890", Email = "gmail.com" };
            EmployeeDetails emp3= new EmployeeDetails() { EmpId = 1001, Name = "Ankita", Phone = "1234557890", Email = "outlook.com" };
            EmployeeDetails emp4 = new EmployeeDetails() { EmpId = 1001, Name = "Sagar", Phone = "123455690", Email = "live.com" };

            db.EmployeeDetails.Add(emp4);
            db.EmployeeDetails.Add(emp2);
            db.EmployeeDetails.Add(emp3);
    
            db.SaveChanges();
        }
    }
}
