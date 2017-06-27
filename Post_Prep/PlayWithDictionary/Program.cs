using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayWithDictionary
{
    class Emp
    {
        private int _empID;
        private string _empName;

        public int EmpID
        {
            get{return _empID;}
            set { _empID = value; }
        }

        public string EmpName
        {
            get { return _empName; }
            set { _empName = value; }
        }

    }
    class Dept
    {
        private int _deptID;
        private string _deptName;

        public int DeptID
        {
            get { return _deptID; }
            set { _deptID = value; }
        }

        public string DeptName
        {
            get { return _deptName; }
            set { _deptName = value; }
        }
    }
    class Program
    {
        static void Main(string[] args)
        {

            Dictionary<string, string> dataString = new Dictionary<string, string>();
            Dictionary<int, string> dataInt = new Dictionary<int, string>();
            Dictionary<Emp, Dept> dataClass = new Dictionary<Emp, Dept>();
            
            Emp emp1 = new Emp();
            Dept dept1 = new Dept();

            emp1.EmpID = 1001;
            emp1.EmpName = "Sandeep Kaur";

            dept1.DeptID = 101;
            dept1.DeptName = "Computer Science";

            dataClass.Add(emp1,dept1);

            foreach(var i in dataClass)
            {
                Console.WriteLine("EmpID: "+i.Key.EmpID);
                Console.WriteLine("EmpName: "+i.Key.EmpName);
            
            }
            Console.ReadLine();

        }
    }
}
