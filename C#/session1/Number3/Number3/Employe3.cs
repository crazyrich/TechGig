using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//use of 'this' keyword
namespace Number3
{
    class Employe3
    {
        string name;//GLOBAL VARIABLE
        int i;

        public void AcceptName() {

            string name;//LOCAL VARIABLE
            Console.WriteLine("enter the name");
            this.name = Console.ReadLine();//VALUE GOING INTO GLOBAL VARIABLE
            //i= Convert.ToInt32(Console.ReadLine());
        }

        public void ShowDetail(){
            Console.WriteLine("name is " + name);
        }

        static void Main(string[] args)
        {
            Employe3 obj = new Employe3();
            obj.AcceptName();
            obj.ShowDetail();
        }
    }
}
