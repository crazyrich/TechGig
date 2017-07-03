using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Model1Container db = new Model1Container();
            JapaneseCar jp = new JapaneseCar()
            {
                CarID=1001,
                Engine="ABC",
                Price=1000,
                Wheels=4,
                Region="Tokyo",
            };
            db.Cars.Add(jp);
            db.SaveChanges();
        }
    }
}
