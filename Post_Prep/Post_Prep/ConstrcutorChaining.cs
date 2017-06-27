using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using System.Data.OleDb;
using System.IO;
using System.Data;

namespace TimePass
{
    #region using
    //public class Book
    //{
    //    private string bookName;
    //    public void setBookName(string name)
    //    {
    //        bookName = name;
    //    }
    //    public string getBookName()
    //    {
    //        return bookName;
    //    }

    //}


    //class Program
    //{
    //    static void Main(string[] args)
    //    {
    //        using (OleDbConnection conn = new OleDbConnection("connectionName"))
    //        {
    //            Book book = new Book();
    //            book.setBookName("The Alchemist");
    //        }
    //    }
    //}
    #endregion

    #region Default-Parametrized Constructor
    class Library
    {
        //Default
        public Library()
        {
            Console.WriteLine("Base Class - No Parameters");
        }
        
        //Parameterized
        public Library(string name)
        {
            Console.WriteLine("Base Class " + name);
        }

        //static
        static Library()
        {
            Console.WriteLine("Static Base  Class");
        }
    }

    class Book : Library
    {
        //static
        static Book()
        {
            Console.WriteLine("Static Derived Class ");
        } 

        //Default
        public Book()
        {
            Console.WriteLine("Derived Class - No Parameters ");
        }

        //Parameterized
        public Book(string name)
        {
            Console.WriteLine("Derived Class " + name);
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Book book = new Book();
            Console.ReadLine();
        }
    }
    #endregion

}
