using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloServiceLibrary
{
    public class HelloService : IHelloService
    {
        public bool Login(string username,string password)
        {
            if (username == "info" && password == "infogain")
            {
                return true;
            }
            else
                return false;
        }
       
    }
}
