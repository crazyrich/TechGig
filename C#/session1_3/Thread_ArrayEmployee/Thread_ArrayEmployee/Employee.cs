using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Collections;

namespace Thread_ArrayEmployee
{
    class Employee
    {
        int empID,phone,age;
        string name;
       List<Employee> list = new List<Employee>();
        public void Accept()
        {
            int n=0;
            Console.WriteLine("How many enteries do you want to do?");
            n = Convert.ToInt32(Console.ReadLine());
            for (int i = 0; i < n; i++)
            {
                Employee e = new Employee();
                Console.WriteLine("Enter empID:");
                e.empID = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Enter Phone:");
                e.phone = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Enter age:");
                e.age = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Enter name:");
                e.name = Console.ReadLine();
                list.Add(e);
            }
        }
        public void Show()
        {
            foreach (var i in list)
            {
                Console.Write(i.empID+" "+i.name+" "+i.phone+" "+i.age);
                Console.WriteLine("===");
                Thread.Sleep(0);
            }
        }
        static void Main(string[] args)
        {
          
            Employee e = new Employee();
            ThreadStart ts1 = new ThreadStart(e.Accept);
            ThreadStart ts2 = new ThreadStart(e.Show);

            Thread t1 = new Thread(ts1);
            Thread t2 = new Thread(ts2);

            t1.Name = "001";
            t2.Name = "002";
            t1.Start();
            t1.Join();//after t1 is over ..only then
            t2.Start();

        }
    }
}
