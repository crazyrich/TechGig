using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Reflection
{
   public class Employee
   {
       public string name;
       public int salary { get; set; }

       public delegate void del1();

       public event del1 event1;
       public void ShowDetails(int empid, string name)
       {
       }
       public Employee(string a, int i, bool b, float f)
       {
       }
       public Employee(string name, int empid)
       {
       }
       public struct MyStruct
       {
       }
       public class Test
       {
       }
   }
}
