using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Question3
{
    class New_Hut
    {
        static string OperatingSystem;
        static string MsOffice;
        static string WebDevelopment;
        static string WindowsDevelopment;

        static void Main(string[] args)
        {
            New_Hut obj1 = new New_Hut();

            New_Hut.OperatingSystem = "Windows7";
            New_Hut.MsOffice = "Office2010";
            New_Hut.WebDevelopment="VS2013 WebDevelopment";
            New_Hut.WindowsDevelopment="VS2013 WebDevelopment";
               
            New_Hut obj2 = new New_Hut();
            New_Hut obj3 = new New_Hut();
            New_Hut obj4 = new New_Hut();
            New_Hut obj5 = new New_Hut();

            Console.WriteLine(" OS is "+OperatingSystem+" WebD "+WebDevelopment+" WinD "+WindowsDevelopment+" MsOffice "+MsOffice);

        }
    }
}
