using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Q3_Many_Many
{
    class Program
    {
        static void Main(string[] args)
        {
            richEntities db = new richEntities();
            Band band = new Band() { BandID=101,Members=4};
            Band band2 = new Band() { BandID = 102, Members = 10 };
            Band band3 = new Band() { BandID = 103, Members = 3 };
            Band band4= new Band() { BandID = 104, Members = 5 };

            Event e1 = new Event() { EventID=201,Region="Los Angels"};
            Event e2 = new Event() { EventID = 202, Region = "Los Vegas" };
            Event e3 = new Event() { EventID = 203, Region = "Amsertdam" };
            Event e4 = new Event() { EventID = 204, Region = "Spain" };

            e1.Bands.Add(band);
            e1.Bands.Add(band4);
            e1.Bands.Add(band2);
            e1.Bands.Add(band3);

            db.Events.Add(e1);
            //db.Events.Add();
            db.SaveChanges();



        }
    }
}
