using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OneToOne
{
    class Program
    {
        static void Main(string[] args)
        {
            x0032_PPContainer db = new x0032_PPContainer();
            Person per1 = new Person() { PersonID=1001,PassportID=101,PersonAge=21,PersonName="Ashok"};
            Person per2 = new Person() { PersonID = 1002, PassportID = 102, PersonAge = 23, PersonName = "Akshit" };
            Passport pas1 = new Passport() { PersonID = 1001, PassportID = 101, PassportNumber = 123456 };
            Passport pas2 = new Passport() { PersonID = 1002, PassportID = 102, PassportNumber = 12345 };

            //db.Passports.Add(pas1);
            //db.People.Add(per1);
            db.Passports.Add(pas2);
            db.People.Add(per2);
            db.SaveChanges();


        }
    }
}
