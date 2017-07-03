using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Q2_Mobile_SmartPhone_iPhone
{
    class Program
    {
        static void Main(string[] args)
        {
            richEntities db = new richEntities();
            SmartPhone smart = new SmartPhone()
            {
                MobileID = 101,
                ModelNo = "123.12.1",
                Price = 10000,
                AndroidVer = "KitKat",
            };
            db.Mobiles.Add(smart);
            db.SaveChanges();
        }
    }
}
