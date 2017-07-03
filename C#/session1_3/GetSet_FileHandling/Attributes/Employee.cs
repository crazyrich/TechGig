using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Attributes
{
    class Employee
    {
        public void Show(int EmpID,string Email,string name)
        {
            FileStream fs = new FileStream("D:\\a2\\file2.txt",FileMode.OpenOrCreate,FileAccess.Write,FileShare.Write);
            StreamWriter sw = new StreamWriter(fs);
            sw.WriteLine(EmpID);
            sw.WriteLine(Email);
            sw.WriteLine(name);

            sw.Close();
            fs.Close();
            Console.WriteLine("WRITTEN!");

           // Console.WriteLine(EmpID+" "+name+" "+Email);
        }
        public void BinaryWrite()
        {
            FileStream fs = new FileStream("D:\\a2\\file2.txt", FileMode.OpenOrCreate, FileAccess.Write, FileShare.Write);
            BinaryWriter bw = new BinaryWriter(fs);

            int EmpID = 1003;
            string name = "ram";
            bool married = true;
            double salary=1233.22;
            bw.Write(EmpID);
            bw.Write(name);
            bw.Write(married);
            bw.Write(salary);

            bw.Close();
            fs.Close();
        }

        public void BinaryRead()
        {
            FileStream fs = new FileStream("D:\\a2\\file2.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
            BinaryReader br = new BinaryReader(fs);
            Console.WriteLine("EMpID "+br.ReadInt32());
            Console.WriteLine("name "+br.ReadString());
            Console.WriteLine("married  "+br.ReadBoolean());
            Console.WriteLine("salary "+br.ReadDouble());

            br.Close();
            fs.Close();
        }
        public void WriteFromSTream()
        {
            int EmpID;
            string name;
            string email;
            Console.WriteLine("Enter THe EMPLOYEE iD");
            EmpID = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter THe EMPLOYEE Name");
            name = Console.ReadLine();
            Console.WriteLine("Enter THe EMPLOYEE EMAIL");
            email = Console.ReadLine();

        }
        public void ReadFromSTream()
        {
            FileStream fs = new FileStream("D:\\a2\\file2.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
            StreamReader sr = new StreamReader(fs);

            Console.WriteLine(sr.ReadToEnd());
            //////line by line
            string line;
            while((line=sr.ReadLine())!=null)
            {
                Console.WriteLine(line);
            }
            sr.Close();
            fs.Close();
        }

        /// <summary>
        /// //Directoryinfo
        /// </summary>
        /// <param name="args"></param>
        /// 
        public void DirectoryIn()
        {
            DirectoryInfo dir = new DirectoryInfo("C:\\");
            foreach(var item in dir.GetDirectories())
            {
                Console.WriteLine(item.FullName);
            }
        
        }
        static void Main(string[] args)
        {
            Employee obj = new Employee();
          //  obj.ReadFromSTream();
            //obj.BinaryRead();
           // obj.BinaryWrite();
          obj.DirectoryIn();
          
        }
    }
}
