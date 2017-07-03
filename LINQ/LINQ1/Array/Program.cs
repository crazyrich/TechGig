using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Array
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] city = { "Triund", "Manali", "Chd", "Noida", "New Delhi" };
            var result = from cty in city
                         where cty == "Noida"
                         select cty;

            foreach (var item in result)
            {
                Console.WriteLine(item);
            }
            if (result.Count() > 0)
            {
                Console.WriteLine("Value Found !");
            }
            else
            {
                Console.WriteLine("Value Not Found !");
            }
            ///////////////////////
            //Marks greater than 15
            int[] marks = { 10, 15, 14, 20, 23, 24 };
            var result1 = from mark in marks
                         where mark >= 15
                         select mark;
            foreach (var item in result1)
            {
                Console.WriteLine(item);
            }



        }

    }
}
