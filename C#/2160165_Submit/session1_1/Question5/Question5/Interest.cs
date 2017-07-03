using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question5
{
    class Interest
    {
        float amount;
        int duration;
        int rate;

        float SimpleInterest(float amt,int t,int r) {
            float total;
            amount = amt;
            duration = t;
            rate = r;
            total=(amt*t*r)/100;
            return total;
        }

        float TotalReturn(float t) {
            float cal;
            cal = amount + t;
            return cal;

        }
        static void Main(string[] args)
        {
            float total=0;
            float final;
            Interest obj = new Interest();
            total=obj.SimpleInterest(1200,5,10);
            Console.WriteLine("Simple Interest is "+total + " ");
            final=obj.TotalReturn(total);
            Console.WriteLine("Total return is "+final + " ");
        }
    }
}
