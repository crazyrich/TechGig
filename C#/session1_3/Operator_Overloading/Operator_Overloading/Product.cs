using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Operator_Overloading
{
    class Product
    {
        public string name;
        public int qty;
        public void Show()
        {
            Console.WriteLine("Product details:::");
            Console.WriteLine(name+" ");
            Console.WriteLine(qty+" ");

        }
        public static Product operator +(Product p1,Product p2)
        {
            Product p3 = new Product();
            p3.qty=p1.qty + p2.qty;
            return p3;
        }
       
        static void Main(string[] args)
        {
            Product mobile = new Product() { name = "android", qty = 5 };
            Product laptop= new Product() { name = "windows", qty = 10 };
            Product final = mobile + laptop;
            //mobile.Show();
            Console.WriteLine(final.qty+" ");
        }
    }
}
