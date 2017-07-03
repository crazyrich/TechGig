using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OperatorOverloading_AverageSalary
{
    class Employee
    {
        float salary;
        int experience;
        //constructor to  initialize salary and experience
        public Employee(float salary,int experience)
        {
            this.salary = salary;
            this.experience = experience;
        }
        //'+' Overloading
        public static Employee operator +(Employee e1,Employee e2)
        {
            Employee e3 = new Employee(e1.salary, e1.experience);
            e3.salary = e1.salary + e2.salary;
            e3.experience = e1.experience + e2.experience;
            return e3;
        }
        //Main Method
        static void Main(string[] args)
        {
            Employee obj1 = new Employee(12000,2);
            Employee obj2 = new Employee(10000, 4);

            Employee final= (obj1 + obj2);
            float avgSal= (final.salary)/2;
            float avgExp = (final.experience) / 2;
            Console.WriteLine("Average Salary "+avgSal);
            Console.WriteLine("Average Experience " + avgExp);
        }
    }
}
