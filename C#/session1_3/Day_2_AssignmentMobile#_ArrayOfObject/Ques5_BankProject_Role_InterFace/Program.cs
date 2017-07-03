using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ques5_BankProject_Role
{
    interface IRole
    {
        string GetRoleName();
        string GetResponsibility();
    }

    class CEO:IRole
    {
        public string GetRoleName()
        {
            string name="CEO";
            return name;
        }
        public string GetResponsibility()
        {
            string responsibility = "Harmony Floor";
            return responsibility;
        }
    }
    class Manager : IRole
    {
        public string GetRoleName()
        {
            string name = "Manager";
            return name;
        }
        public string GetResponsibility()
        {
            string responsibility = "Harmony Floor";
            return responsibility;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            CEO obj = new CEO();
            Console.WriteLine(obj.GetRoleName());
            Manager obj1 = new Manager();
            Console.WriteLine(obj1.GetRoleName());
        }
    }
}
