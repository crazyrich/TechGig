using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Class_Ques_Emp
{
    class Program
    {

        public bool ShowDetails(int EmpID,out string EmpName,out string Email,out string Phone)
        {
           
            if (EmpID == 1) {
                EmpName = "Ram1";
                Email = "email1";
                Phone = "phone1";
                
            }
            else
                {
                    EmpName = "Ram2";
                    Email = "email2";
                    Phone = "phone2";

                }
            return true;
            
        }
        static void Main(string[] args)
        {
            int EmpID=1;
            string EmpName;
            string Email;
            string Phone;
            bool hold;
            Program obj = new Program();
            //Console.WriteLine("number is" + num);
            hold=obj.ShowDetails(EmpID,out EmpName,out Email,out Phone);
            Console.WriteLine("empname " + EmpName);
            Console.WriteLine("email " + Email);
            Console.WriteLine("empname " + Phone);
            Console.WriteLine("boolean " + hold);
          

        }
    }
}
