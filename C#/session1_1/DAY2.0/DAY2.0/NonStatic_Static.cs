using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAY2._0
{
    class NonStatic_Static
    {
        public static int EmployeeCount;//static
        public string EmpName;
        public string EmpId;

        public static void Show(){
            //////ERROR
            Console.WriteLine("Emp ID {0} EmpNAme {1} EmpCount {2}", EmployeeCount, EmpName, EmpId); 
        }

        public NonStatic_Static()//constructor
        {
            EmployeeCount++;//One copy is maintained
        }
        public void ShowDEtails() {
            Console.WriteLine("Emp ID {0} EmpNAme {1} EmpCount {2}",EmployeeCount,EmpName,EmpId);
        }
        static void Main(string[] args)
        {
            //object 1
            NonStatic_Static obj1 = new NonStatic_Static();
            obj1.EmpName = "Sean";
            obj1.EmpId = "E001";
            obj1.ShowDEtails();
            //object 2
            NonStatic_Static obj2 = new NonStatic_Static();
            obj2.EmpName = "ean";
            obj2.EmpId = "E002";
            obj2.ShowDEtails();
            //object 3
            NonStatic_Static obj3 = new NonStatic_Static();
            obj3.EmpName = "Dean";
            obj3.EmpId = "E003";
            obj3.ShowDEtails();
        }
    }
}
