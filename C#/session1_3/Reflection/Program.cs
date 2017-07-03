using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
namespace Reflection
{
    class Program
    {
        static void Main(string[] args)
        {
            Type type = typeof(Class1);
            MemberInfo[] memberinfos = type.GetMembers();
        }
    }
}



//using System;
//using System.Collections.Generic;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using System.Threading;
//using System.Reflection;
//using EmployeeLib;

//namespace ConsoleApplication1
//{
//    public class Employee
//    {
//        public string name;
//        public int salary { get; set; }

//        public delegate void del1();

//        public event del1 event1;
//        public void ShowDetails(int empid, string name)
//        {
//        }
//        public Employee(string a, int i, bool b, float f)
//        {
//        }
//        public Employee(string name, int empid)
//        {
//        }
//        public struct MyStruct
//        {
//        }
//        public class Test
//        {
//        }
//    }

//   class Program
//    {   



//        static void Main(string[] args)
//        {
//            Type type = typeof(Employee);

//            EventInfo[] eventInfos = type.GetEvents();
//            foreach (var eventInfo in eventInfos)
//            {
//                Console.WriteLine(eventInfo.Name + " <><><><><><> " + eventInfo.IsMulticast);
//            }

//            Console.WriteLine("----------------------------------");
//            Type[] types = type.GetNestedTypes();
//            foreach (var type1 in types)
//            {
//                Console.WriteLine(type1.Name + "<><><><><>" + type1.GetType());
//            }



//            Console.WriteLine("-------------Property Information-------------------------");
//            PropertyInfo[] propertyInfos = type.GetProperties();
//            foreach (var propertyInfo in propertyInfos)
//            {
//                Console.WriteLine(propertyInfo.Name + " " + propertyInfo.CanRead);
//            }



//            Console.WriteLine("----------Member Info--------------------");
//            MemberInfo[] memberInfos = type.GetMembers();
//            foreach (var memberInfo in memberInfos)
//            {
//                Console.WriteLine(memberInfo.MemberType + "<<<<>>>>" + memberInfo.Name);
//            }




//            Console.WriteLine("----------------Fields Info--------------------");
//            FieldInfo[] fieldInfos = type.GetFields();
//            foreach (var fieldInfo in fieldInfos)
//            {
//                Console.WriteLine(fieldInfo);
//            }

//            Console.WriteLine("==============Constructor=========");
//            ConstructorInfo[] constructorInfos = type.GetConstructors();
//            foreach (var constructorInfo in constructorInfos)
//            {
//                Console.WriteLine(constructorInfo.Name);
//                foreach (var info in constructorInfo.GetParameters())
//                {
//                    Console.WriteLine(info);
//                }
//            }
//            Console.ReadLine();
//        }
//    }
//}
 