using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Ques6_Product_Collection
{
    class Product
    {
        public string productID;
        public string productName;
        
    }
    class MainClass
    {
        static void Main(string[] args)
        {
            Hashtable ht = new Hashtable();
            
            for (int i = 0; i < 2;i++ )
            {
                Product obj = new Product();
                Console.WriteLine("ENTER ID::");
                obj.productID = Console.ReadLine();
                Console.WriteLine("ENTER PRODUCT NAME::");
                obj.productName = Console.ReadLine();
                ht.Add(i+1,obj);
            }
            foreach(DictionaryEntry i in ht)
            {
                //Console.Write(" "+ i.Key+"  ");
                Product p = new Product();
                p = (Product)i.Value;
                Console.Write("ID> "+p.productID+" ");
                Console.Write("Name> "+p.productName+" ");
                Console.WriteLine(" ");
              
            }

        }
    }
}
