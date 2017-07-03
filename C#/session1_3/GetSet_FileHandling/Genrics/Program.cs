using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Genrics
{
    class Employee
    {
        int EmpID;
        string EmployeeName;
        int Salary;

        public void SetEmpID(int EmpID)
        {
            this.EmpID = EmpID;
        }
        public int GetEmpID()
        {
            return this.EmpID;
        }
        //
        public void SetEmployeeName(string EmployeeName)
        {
            this.EmployeeName =EmployeeName;
        }
        public string GetEmployeeName()
        {
            return this.EmployeeName;
        }
        //
        public void SetSalary(int Salary)
        {
            this.Salary = Salary;
        }
        public int GetSalary()
        {
            return this.Salary;
        }
        //
        public void Show()
        {
            Console.WriteLine(EmpID+" "+ EmployeeName+" "+ Salary);
            
        }
        static void main(String[] args) 
        {
            Employee obj = new Employee();

            obj.GetEmpID();
            obj.GetEmployeeName();
            obj.GetSalary();
        } 
    }
}
