using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;

namespace Exceptions
{
    class Program
    {
        public void Show()
        {
            for (int i = 0; i < 50; i++)
            {
                Console.WriteLine(i + " " + Thread.CurrentThread.Name);
                Thread.Sleep(200);
            }

        }
        public void Display()
        {
            Monitor.Enter(this);
            char c = 'A';
            for (int i = 0; i < 26; i++)
            {
                Console.WriteLine(c + " " + Thread.CurrentThread.Name);
                c++;
                Thread.Sleep(500);
            }
            Monitor.Exit(this);
        }
        static void Main(string[] args)
        {
            Console.WriteLine(" =======Main starts=======");
            Program obj = new Program();
            ThreadStart ts1 = new ThreadStart(obj.Display);
            ThreadStart ts2 = new ThreadStart(obj.Show);
            Thread t1 = new Thread(ts1);
            Thread t2 = new Thread(ts2);
            t1.Name = "001";
            t2.Name = "002";
            t1.Start();
           // t1.Join();//after t1 is over ..only then
            t2.Start();



            // obj.Show();
            //obj.Display();
            Console.WriteLine(" =======Main Ends=======");

        }
    }
}
