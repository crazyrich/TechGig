using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventsDelegates
{
    class Testing
    {
        public delegate void del1();
        public event del1 event1;
        public static void WriteToDB()
        {
            Console.WriteLine("Writing Data to DB  ");
        }

        public static void Main()
        {
            Testing testing = new Testing();
            testing.event1 += new del1(WriteToDB);
            testing.event1.Invoke();

        }
    }
}