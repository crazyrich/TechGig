using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;

using System.Runtime.InteropServices;
using System.IO;

namespace EventDelegate_Practice
{
    class Program
    {
        public delegate void del1();
        // public event del1 event1;
        public static void Show()
        {
            Console.WriteLine("Event Delegate Function");
        }
        public static void Main(string[] args)
        {
            Program p1 = new Program();
            del1 obj = new del1(Show);
            obj();
            Console.WriteLine("result");
        }
    }

    class Program
    {

    }
}

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

class Testing
{
    public delegate int del1(string s);
    public static int WriteToDB(string name)
    {
        Console.WriteLine("Writing Data to DB  " + name);
        return 100;
    }
    public static int WriteToFile(string name)
    {
        Console.WriteLine("Writing Data to Files  " + name);
        return 1000;
    }
    public static int WriteToScreen(string name)
    {
        Console.WriteLine("Writing Data to Screen " + name);
        return 10000;
    }

    public static void Main()
    {
        del1 obj1 = new del1(WriteToDB);
        obj1 += new del1(WriteToFile);
        obj1 += new del1(WriteToScreen);

        int result = obj1("ashok");

        Console.WriteLine(result);


    }
}    
 




