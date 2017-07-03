using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question4
{
    class Login
    {
        private string UserId;
        private string Password;

        Login() {
            UserId=Console.ReadLine();
            Password = Console.ReadLine();
        }
        public bool Authenticate(){
            Console.WriteLine("Enter USERNAME");
            string UserId1 = Console.ReadLine();
            Console.WriteLine("Enter PASSWORD");
            string Password1 = Console.ReadLine();
            if (UserId == UserId1 && Password == Password1)
            {
                return true;
            }
            else
                return false;

        }
        static void Main(string[] args)
        {
            bool hold;
            Login obj1 = new Login();
            hold=obj1.Authenticate();
            if(hold==true){
                Console.WriteLine("LOGIN SUCCESSFULL");
            }
            else
                Console.WriteLine("LOGIN FAILED!!");
           
        }
    }
}
