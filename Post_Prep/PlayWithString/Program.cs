using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlayWithString
{
    class Program
    {
        #region Count Using Length and Split
        static public void getCount(string str)
        {
            int originalLength = str.Length;
            int afterRemoveCount = (str.ToUpper().Replace("A", string.Empty)).Length;
            int length = originalLength - afterRemoveCount;

        }
        static public void getCountBySplit(string str)
        {
            string[] split1 = str.Split('S');
        }
        #endregion

        public static void DifferenceBTWEqualsAndOperator()
        {
            char[] abc = { 'a','b','c'};
            //String a = new String(abc);
            //String b = new String(abc);
            //string a = "string";
            //string b = "string";
            //StringBuilder a = new StringBuilder("abc");
            //StringBuilder b = new StringBuilder("abc");
            //if(a == b)
            //{
            //    Console.WriteLine(" == operator returns: TRUE" );
            //}

            //if (a.Equals(b))
            //{
            //    Console.WriteLine(" EQUALS returns: TRUE");
            //}

            string o = "abc";
            string o1 = new string(abc);
            //object o1 = new string(".NET Interview questions".ToCharArray());
            Console.WriteLine(o == o1);
            Console.WriteLine(o.Equals(o1));
            Console.ReadLine();
        
        }

        public static void DifferenceBTWEqualsAndOperator_INT()
        {
            int a = 1;
            int b = 1;
           
                Console.WriteLine("a == b returns :" + (a == b));
            
                Console.WriteLine("a.Equals(b) returns :" + a.Equals(b));
            
                Console.WriteLine("(Boolean)((object)a.Equals((object)b)) returns :" + (Boolean)((object)a.Equals((object)b)));

                Console.WriteLine("(Boolean)((object)a == ((object)b)) returns :" + (Boolean)((object)a == ((object)b)));

                Console.WriteLine("(Boolean)((string)a.Equals((string)b)) returns :" + (Boolean)(a.ToString().Equals((string)b.ToString())));

                Console.WriteLine("(Boolean)((string)a == ((string)b)) returns :" + (Boolean)((string)a.ToString() == ((string)b.ToString())));



                object c = 1;
                object d = 1;
                object e = c;
                Console.WriteLine("\n\nc == d returns :" + (c == d));

                Console.WriteLine("c.Equals(d) returns :" + c.Equals(d));

                Console.WriteLine("c.Equals(e) returns :" + c.Equals(e));

                Console.WriteLine("c == e returns :" + (c == e));




                string f = "It is confusing.";
                string g = "It is confusing.";
                string h = String.Copy(f);
                Console.WriteLine("\n\nf == g returns :" + (f == g));

                Console.WriteLine("f.Equals(g) returns :" + f.Equals(g));

                Console.WriteLine("String.ReferenceEquals(g, f) returns :" + (String.ReferenceEquals(g, f)));

                Console.WriteLine("h.Equals(f) returns :" + h.Equals(f));

                Console.WriteLine("h == f returns :" + (h == f));

                Console.WriteLine("String.ReferenceEquals(h, f) returns :" + (String.ReferenceEquals(h,f)));

                Console.WriteLine("\n\n object f == g returns :" + ((object)f == (object)g));

                Console.WriteLine(" object f.Equals(g) returns :" + (object)f.Equals((object)g));

                Console.WriteLine("object String.ReferenceEquals(g, f) returns :" + (String.ReferenceEquals((object)g, (object)f)));

            

        }
        static void Main(string[] args)
        {
            //getCount("NURAG AMISHR");
            //getCountBySplit("SAKSHI SHARMA");
            //DifferenceBTWEqualsAndOperator();
            DifferenceBTWEqualsAndOperator_INT();
            Console.ReadLine();


        }
    }
}
