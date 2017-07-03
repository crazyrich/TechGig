using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

#region OUT
namespace Day1_Demos
{
    class Employee
    {
        public bool FindRecord(int EmpID, out string name, out string projectName, out string Email, ref int counter)
        {
            if(EmpID==1)
            {
                name= "Ram";
                projectName = "Vertex";
                Email = "ram@gmail.com";
            }
            else if(EmpID==2)
            {
                name = "Ramesh";
                projectName = "Mitchell";
                Email = "ramesh@gmail.com";
            }
            else
            {
                name = "Krishna";
                projectName = "Retail";
                Email = "krishna@gmail.com";
            }
            counter++;
            return true;
        }
    }

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            int EmpID = 3;
            string name,email, projectname;
            int counter = 1;
            bool returnvalue;

            returnvalue=  obj.FindRecord(EmpID, out name , out projectname,out  email, ref counter);

            Console.WriteLine(name+"   "+email+"   "+projectname+"  "+counter+" "+returnvalue);
           
        }
    }
}

#endregion

-================================


#region Params

namespace Day1_Demos
{
    class Employee
    {
        public void Sum(string name, params int [] arr  )
        {
            int addition = 0;
            foreach (int item in arr)
            {
                addition = addition + item;
            }
            Console.WriteLine(addition);
        }
        
    }

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            obj.Sum("ram");
            obj.Sum("ram",1);
            obj.Sum("ram", 1, 2);
            obj.Sum("ram", 1, 2, 3);
            obj.Sum("ram", 1, 2, 3,4);
            obj.Sum("ram", 1, 2, 3,4,5);
            obj.Sum("ram", 1, 2, 3,4,5,6,7,8,9,10);

           
        }
    }
}

#endregion

------------------------------------------

#region INTERFACE
using System;

namespace Day1_Demos
{

    interface IDetails
    {
          void PersonalDetails();
          void ProjectDetails();
          int i=10;
    }

    interface ISalary
    {
        void SalaryDetails();
    }
    class Employee : IDetails, ISalary
    {
         public void PersonalDetails()
        {
            Console.WriteLine("PersonalDetails");
        }

        public void ProjectDetails()
        {
            Console.WriteLine("ProjectDetails");
        }

        public void SalaryDetails()
        {
            Console.WriteLine("SalaryDetails");
        }
    }

   

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            
           
        }
    }
}
#endregion
=========================


#region HAShTable
using System;
using System.Collections;
using System.Collections.Generic;

namespace Day1_Demos
{

    
    class Employee  
    {
        public int empID;
        public string empName;
        public int salary;
        public void Show()
        {
            Console.WriteLine(empID+"  "+ empName+"   "+salary);
        }       
    }

   

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Hashtable hashtable = new Hashtable();
            hashtable.Add(21601, "Amit");
            hashtable.Add(21603, "Amam");
            hashtable.Add(21605, "Amar");
            hashtable.Add(21607, "Amitesh");
            hashtable.Add(21608, "Amrinder");
            hashtable.Add(21602, "Amitkumar");


            foreach (DictionaryEntry item in hashtable)
            {
                Console.WriteLine(item.Key+"   " + item.Value);                
            }
            Console.WriteLine("=================================");

            System.Console.WriteLine(hashtable.Keys.Count);
            Console.WriteLine("=================================");
            System.Console.WriteLine(hashtable.Values.Count);
            Console.ReadLine();
        }
    }
}

#endregion

=========================

#region GET SET
using System;
using System.Collections;
using System.Collections.Generic;

namespace Day1_Demos
{

    
    class Employee  
    {
         int empID;
         string empName;
         int salary;



        public int EmpID
         {
             set
             {
                 this.empID = value;
                 Console.WriteLine("Set is called ");
             }
            get
             {
                 Console.WriteLine("Get is called ");
                 return this.empID;
             }
         }
    }
 


  
    class MainClass
    {
        static void Main(string[] args)
        {

            Employee obj = new Employee();

            obj.EmpID( 1001);

            int x = obj.EmpID;

            Console.WriteLine(x);
            
            Console.ReadLine();
        }
    }
}



#endregion
==================================


using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.SqlClient;


namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
       

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok;user id =sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected ");

            SqlCommand command = new SqlCommand("select * from Login where loginid=@loginid and password=@pass", connection);
            command.Parameters.Add("@loginid", txtLoginID.Text);
            command.Parameters.Add("@pass", txtPassword.Text);

             SqlDataReader reader =  command.ExecuteReader();
            if(reader.Read())
            {
                MessageBox.Show("User Valid");
            }
            else
            {
                MessageBox.Show("User Invalid ");
            }
        }

       
    }
}
==============================

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.SqlClient;


namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
       

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok;user id =sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected ");

            SqlCommand command = new SqlCommand("delete  Login set  values(@id, @pass)", connection);


int result = command.ExecuteNonQuery();
            
         
        }

       
    }
}
++++++++++++++++++++++++++++++++++++++



using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;
using EmployeeLib;
using System.Runtime.InteropServices;

namespace ConsoleApplication1
{
    [AttributeUsage(AttributeTargets.Class)]
    public class BugAttribute : Attribute
    {
        private int bugcode;
        private string description;
        public BugAttribute(int bcode, string desc)
        {
            this.bugcode = bcode;
            this.description = desc;
            Console.WriteLine("Inside Attribute Constructor");
        }
        public int Bugcode
        {
            get { return bugcode; }
        }
        public string Description
        {
            get { return description; }
        }
    }

    [Bug(101, "Database Bug")]
    public class Tester
    {
        public void LogError()
        {
            var obj = new { name = "mohit", id = 1234 };
            Console.WriteLine(obj.name + " " + obj.id);
        }
    }


    class CustomAttribute
    {
        public static void Main(string[] args)
        {
            Tester obj = new Tester();
            obj.LogError();
            var attributes = obj.GetType().GetCustomAttributes(true);
            foreach (var att in attributes)
            {
                BugAttribute b =  att as BugAttribute  ;
                if (b != null)
                {
                    Console.WriteLine(b.Bugcode + "<>" + b.Description);
                }
            }
            Console.ReadLine();
        }
    }
}using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            #region Format Exception

            try
            {
                Console.WriteLine("Enter Age ");
                int age = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Age is " + age);
            }
            catch(FormatException fe)
            {
                Console.WriteLine("Invalid value to convert to Int ");
            }
            
            #endregion


            #region   Connection Exception
            try
            {
                SqlConnection connection = new SqlConnection();
                connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok1231;user id =sa;password=info123!";
                connection.Open();
            }
            catch(SqlException se)
            {
                Console.WriteLine( "Invalid value is connection string");
            }
            #endregion


            #region Divide by Zero Exception
            try
            {
                int a = 10;
                int b = 0;
                Console.WriteLine(a / b);
            }
            catch(DivideByZeroException de)
            {
                Console.WriteLine("Cant divide value by Zero ");
            }
            #endregion


            #region Array out of bound Exception
            try
            {
                int[] array = { 1, 2, 3, 4 };
                int counter = 0;
                while (counter < 5)
                {
                    Console.WriteLine(array[counter]);
                    counter++;
                }
            }
            catch(IndexOutOfRangeException ie)
            {
                Console.WriteLine("Invalid position of array is located ");
            }
            #endregion


            Console.WriteLine("Code is Over ");
        }
    }
}


=====================================

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
           

            try
            {
                Console.WriteLine("Enter Age ");
                int age = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Age is " + age);


                #region connection exception
                SqlConnection connection = new SqlConnection();
                connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok11111;user id =sa;password=info123!";
                connection.Open();
                Console.WriteLine("Connecction Part");
                #endregion


                #region Divide by Zero Exception
                int a = 10;
                int b = 10;
                Console.WriteLine(a / b);
                Console.WriteLine("Division Part");
                #endregion


                #region Array out of bound Exception
                int[] array = { 1, 2, 3, 4 };
                int counter = 0;
                while (counter < 4)
                {
                    Console.WriteLine(array[counter]);
                    counter++;
                }
                Console.WriteLine("Array Part ");
                #endregion
            }
            catch (FormatException fe)
            {
                Console.WriteLine("value not convertable to integer");
            }
            catch (DivideByZeroException de)
            {
                Console.WriteLine("cant divide by zero");
            }
            catch (Exception se)
            {
                Console.WriteLine("I am Catch ");
            }
            
           

                Console.WriteLine("Code is Over ");
            }
        }
    }
 

=========================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
           

            try
            {
                Console.WriteLine("Enter Age ");
                int age = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Age is " + age);


                #region connection exception
                SqlConnection connection = new SqlConnection();
                connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok11111;user id =sa;password=info123!";
                connection.Open();
                Console.WriteLine("Connecction Part");
                #endregion


                #region Divide by Zero Exception
                int a = 10;
                int b = 10;
                Console.WriteLine(a / b);
                Console.WriteLine("Division Part");
                #endregion


                #region Array out of bound Exception
                int[] array = { 1, 2, 3, 4 };
                int counter = 0;
                while (counter < 4)
                {
                    Console.WriteLine(array[counter]);
                    counter++;
                }
                Console.WriteLine("Array Part ");
                #endregion
            }            
            catch (Exception se)
            {
                Console.WriteLine("I am Catch..Exception in the code >>>>>>"+se.Message);
            }
            
           

                Console.WriteLine("Code is Over ");
            }
        }
    }

================================================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{

    class AgeException : Exception
    {
        public string Message
        {
            get
            {
                return "Age must be between 18-60";
            }
        }
    }







    class Program
    {
        static void Main(string[] args)
        {
           

            try
            {
                Console.WriteLine("Enter Age ");
                int age = Convert.ToInt32(Console.ReadLine());

                if (age < 18 || age > 60)
                    throw new AgeException();
                
                Console.WriteLine("Age is " + age+" and this is a valid age ");             
            }            
            catch (Exception se)
            {
                Console.WriteLine("I am Catch  >>>>>>"+se.Message);
            }
            finally
            {
                Console.WriteLine("I am Finally Block ");
            }
            
           

                Console.WriteLine("Code is Over ");
            }
        }
    }
 
 =======================================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;
using EmployeeLib;
using System.Runtime.InteropServices;

namespace ConsoleApplication1
{
    [AttributeUsage(AttributeTargets.Class)]
    public class BugAttribute : Attribute
    {
        private int bugcode;
        private string description;
        public BugAttribute(int bcode, string desc)
        {
            this.bugcode = bcode;
            this.description = desc;
            Console.WriteLine("Inside Attribute Constructor");
        }
        public int Bugcode
        {
            get { return bugcode; }
        }
        public string Description
        {
            get { return description; }
        }
    }

    [Bug(101, "Database Bug")]
    public class Tester
    {
        public void LogError()
        {
            var obj = new { name = "mohit", id = 1234 };
            Console.WriteLine(obj.name + " " + obj.id);
        }
    }


    class CustomAttribute
    {
        public static void Main(string[] args)
        {
            Tester obj = new Tester();
            obj.LogError();
            var attributes = obj.GetType().GetCustomAttributes(true);
            foreach (var att in attributes)
            {
                BugAttribute b =  att as BugAttribute  ;
                if (b != null)
                {
                    Console.WriteLine(b.Bugcode + "<>" + b.Description);
                }
            }
            Console.ReadLine();
        }
    }
}

==============================================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;
using EmployeeLib;
using System.Runtime.InteropServices;
using System.IO;

namespace ConsoleApplication1
{
    
 public class MainClass
 {
     public void WriteToStream( )
     {         
          int EmpID; string EmpName, Email;
         Console.WriteLine("Enter Emp ID");
         EmpID = Convert.ToInt32(Console.ReadLine());
         Console.WriteLine("Enter Emp Name");
         EmpName = Console.ReadLine();
         Console.WriteLine("Enter Emp Email");
         Email = Console.ReadLine();


         FileStream fs = new FileStream("C:\\a\\File1.txt",FileMode.Append,FileAccess.Write,FileShare.Write);
         StreamWriter sw = new StreamWriter(fs);
         sw.WriteLine(EmpID);
         sw.WriteLine(EmpName);
         sw.WriteLine(Email);
         sw.Close();
         fs.Close();
         Console.WriteLine("Data Writen to File");
     }

     public void ReadFromStream()
     {
         FileStream fs = new FileStream("C:\\a\\File1.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
         StreamReader sr = new StreamReader(fs);         
         string line;
         while( (line=sr.ReadLine()) != null)
         {
             Console.WriteLine(line);
         }
         Console.WriteLine("-------------------------");
         sr.Close();
         fs.Close();
     }

     public void BinaryWrite()
     {
         FileStream fs = new FileStream("C:\\a\\File2.txt", FileMode.Append, FileAccess.Write, FileShare.Write);
         BinaryWriter bw = new BinaryWriter(fs);

         int empid = 1001;
         string name = "ram";
         bool married = true;
         double salary = 12345.324;

         bw.Write(empid);
         bw.Write(name);
         bw.Write(married);
         bw.Write(salary);

         bw.Close();
         fs.Close();
         Console.WriteLine("Data Writen to File");
     }
     public void BinaryRead()
     {
         FileStream fs = new FileStream("C:\\a\\File2.txt", FileMode.Open, FileAccess.Read, FileShare.Read);
         BinaryReader br = new BinaryReader(fs);
         Console.WriteLine("Emp ID " + br.ReadInt32());
         Console.WriteLine("Emp Name " +br.ReadString());
         Console.WriteLine("Emp Married " + br.ReadBoolean());
         Console.WriteLine("Emp Salary "+ br.ReadDouble());

         br.Close();
         fs.Close();
     }
     public void DirectoryIn()
     {
         DirectoryInfo dir = new DirectoryInfo("c:\\");
         foreach (var item in dir.GetDirectories())
         {
             Console.WriteLine(item.FullName);
         }
     }



     public static void Main()
     {
        

         MainClass obj = new MainClass();
       //  obj.WriteToStream( );
         //obj.ReadFromStream();
       //  obj.BinaryWrite();
       //  obj.BinaryRead();
         obj.DirectoryIn();
     }
 }    
 
}

===============================

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;
using EmployeeLib;
using System.Runtime.InteropServices;
using System.IO;

namespace ConsoleApplication1
{
    public class Product
    {
        public string prodID;
        public int qty;
        public void Show()
        {
            Console.WriteLine("Product Details are Here ");
            Console.WriteLine("Prod ID "+ prodID);            
            Console.WriteLine("Prod Qty " + qty);
        }
     public static Product operator +(Product p1, Product p2)
     {
         Product p = new Product();
         p.qty = p1.qty + p2.qty;
         return p;
     }
     public static void Main()
     {
         Product mobile = new Product() { prodID = "P001", qty = 10 };
         Product laptop = new Product() { prodID = "P002", qty = 2 };

         Product finalProducts = mobile + laptop;
             Console.WriteLine("Final Quantity Count "+ finalProducts.qty);
     }
 }    
 
}

========================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;
using EmployeeLib;
using System.Runtime.InteropServices;
using System.IO;

namespace ConsoleApplication1
{
    public class Product
    {
        public string prodID;
        public double qty,price;
        public void Show()
        {
            Console.WriteLine("Product Details are Here ");
            Console.WriteLine("Prod ID "+ prodID);            
            Console.WriteLine("Prod Qty " + qty);
            Console.WriteLine("Prod Price " + price);
        }
     public static Product operator +(Product p1, Product p2)
     {
         Product p = new Product();
         double p1cost = p1.price * p1.qty;
         double p2cost = p2.price * p2.qty;


         p.qty = p1.qty + p2.qty;
         p.price = p1cost + p2cost;

         return p;
     }




     public static void Main()
     {
         Product mobile = new Product() { prodID = "P001", qty = 10, price=4000 };
         Product laptop = new Product() { prodID = "P002", qty = 2 , price=40000};

         Product finalProducts = mobile + laptop;

         finalProducts.Show();
        //Console.WriteLine("Final Quantity Count "+ finalProducts.qty);
        //Console.WriteLine("Final Bill Amount " + finalProducts.price);
     }
 }    
 
}

++++++++++++++++++++++++++++++++++++++++++++
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;

using System.Runtime.InteropServices;
using System.IO;
using System.Collections;

namespace ConsoleApplication1
{
        class Employee
        {
            private int _exp;
            private string _name;

            public static implicit operator Employee(int i)
            {
                Employee eobj = new Employee();
                eobj._exp = i;
                return eobj;
            }
            public static implicit operator Employee(string i)
            {
                Employee eobj = new Employee();
                eobj._name = i;
                return eobj;
            }
        }
    public class MainClass
    {
     public static void Main()
     {
         Employee obj = new Employee();
         obj = 5;
         obj = "Ashok";

       
     }
 }    
 
}



===================
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using System.Reflection;

using System.Runtime.InteropServices;
using System.IO;
using System.Collections;

namespace ConsoleApplication1
{

    internal class SimpleYield
    {
        private static IEnumerable GetValues()
        {
            Console.WriteLine("Returning 1");
            yield return 1;
            Console.WriteLine("Returning 2");
            yield return 2;
            Console.WriteLine("Returning 3");
            yield return 3;
        }







        private static void Main()
        {
          
            foreach (int i in GetValues())
                Console.WriteLine("In the Main "+ i);
        }
    }

}


====================
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace WindowsFormsApplication2
{
    public partial class Merge : Form
    {
        public Merge()
        {
            InitializeComponent();
        }

        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter;
        DataSet dataSet1, dataSet2;
        DataTable dataTable;
        DataRow dataRow;
        private void Merge_Load(object sender, EventArgs e)
        {
          
        }

        private void button1_Click(object sender, EventArgs e)
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=master;user id =sa;password=info123!";
            adapter = new SqlDataAdapter("select *  from Employee", connection);
            dataSet1 = new DataSet();
            adapter.Fill(dataSet1);
            dataTable = dataSet1.Tables[0];

            dataGridView1.DataSource = dataTable;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=master;user id =sa;password=info123!";
            adapter = new SqlDataAdapter("select *  from Colleges", connection);
            dataSet2 = new DataSet();
            adapter.Fill(dataSet2 );
            dataTable = dataSet2.Tables[0];

            dataGridView2.DataSource = dataTable;
        }

        private void button3_Click(object sender, EventArgs e)
        {

            dataSet1.Merge(dataSet2);
            dataGridView3.DataSource = dataSet1.Tables[0];                    
            SqlCommandBuilder cmd = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet1);
            MessageBox.Show("dONE ");
        }
    }
}
++++++++++++++++++++++++++++













using System;

namespace Day1_Demos
{
    class Employee
    {
        public bool FindRecord(int EmpID, out string name, out string projectName, out string Email, ref int counter)
        {
            if(EmpID==1)
            {
                name= "Ram";
                projectName = "Vertex";
                Email = "ram@gmail.com";
            }
            else if(EmpID==2)
            {
                name = "Ramesh";
                projectName = "Mitchell";
                Email = "ramesh@gmail.com";
            }
            else
            {
                name = "Krishna";
                projectName = "Retail";
                Email = "krishna@gmail.com";
            }
            counter++;
            return true;
        }
    }

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            int EmpID = 3;
            string name,email, projectname;
            int counter = 1;
            bool returnvalue;

            returnvalue=  obj.FindRecord(EmpID, out name , out projectname,out  email, ref counter);

            Console.WriteLine(name+"   "+email+"   "+projectname+"  "+counter+" "+returnvalue);
           
        }
    }
}


-================================
using System;

namespace Day1_Demos
{
    class Employee
    {
        public void Sum(string name, params int [] arr  )
        {
            int addition = 0;
            foreach (int item in arr)
            {
                addition = addition + item;
            }
            Console.WriteLine(addition);
        }
        
    }

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            obj.Sum("ram");
            obj.Sum("ram",1);
            obj.Sum("ram", 1, 2);
            obj.Sum("ram", 1, 2, 3);
            obj.Sum("ram", 1, 2, 3,4);
            obj.Sum("ram", 1, 2, 3,4,5);
            obj.Sum("ram", 1, 2, 3,4,5,6,7,8,9,10);

           
        }
    }
}


------------------------------------------

using System;

namespace Day1_Demos
{

    interface IDetails
    {
          void PersonalDetails();
          void ProjectDetails();
          int i=10;
    }

    interface ISalary
    {
        void SalaryDetails();
    }
    class Employee : IDetails, ISalary
    {
         public void PersonalDetails()
        {
            Console.WriteLine("PersonalDetails");
        }

        public void ProjectDetails()
        {
            Console.WriteLine("ProjectDetails");
        }

        public void SalaryDetails()
        {
            Console.WriteLine("SalaryDetails");
        }
    }

   

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            
           
        }
    }
}
=========================

using System;
using System.Collections;
using System.Collections.Generic;

namespace Day1_Demos
{

    
    class Employee  
    {
        public int empID;
        public string empName;
        public int salary;
        public void Show()
        {
            Console.WriteLine(empID+"  "+ empName+"   "+salary);
        }       
    }

   

  
    class MainClass
    {
        static void Main(string[] args)
        {
            Hashtable hashtable = new Hashtable();
            hashtable.Add(21601, "Amit");
            hashtable.Add(21603, "Amam");
            hashtable.Add(21605, "Amar");
            hashtable.Add(21607, "Amitesh");
            hashtable.Add(21608, "Amrinder");
            hashtable.Add(21602, "Amitkumar");


            foreach (DictionaryEntry item in hashtable)
            {
                Console.WriteLine(item.Key+"   " + item.Value);                
            }
            Console.WriteLine("=================================");

            System.Console.WriteLine(hashtable.Keys.Count);
            Console.WriteLine("=================================");
            System.Console.WriteLine(hashtable.Values.Count);
            Console.ReadLine();
        }
    }
}


=========================
using System;
using System.Collections;
using System.Collections.Generic;

namespace Day1_Demos
{

    
    class Employee  
    {
         int empID;
         string empName;
         int salary;



        public int EmpID
         {
             set
             {
                 this.empID = value;
                 Console.WriteLine("Set is called ");
             }
            get
             {
                 Console.WriteLine("Get is called ");
                 return this.empID;
             }
         }
    }
 


  
    class MainClass
    {
        static void Main(string[] args)
        {

            Employee obj = new Employee();

            obj.EmpID( 1001);

            int x = obj.EmpID;

            Console.WriteLine(x);
            
            Console.ReadLine();
        }
    }
}
==================================


using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.SqlClient;


namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
       

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok;user id =sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected ");

            SqlCommand command = new SqlCommand("select * from Login where loginid=@loginid and password=@pass", connection);
            command.Parameters.Add("@loginid", txtLoginID.Text);
            command.Parameters.Add("@pass", txtPassword.Text);

             SqlDataReader reader =  command.ExecuteReader();
            if(reader.Read())
            {
                MessageBox.Show("User Valid");
            }
            else
            {
                MessageBox.Show("User Invalid ");
            }
        }

       
    }
}
==============================

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.Data.SqlClient;


namespace WindowsFormsApplication2
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
       

        private void button1_Click(object sender, EventArgs e)
        {
            SqlConnection connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=ashok;user id =sa;password=info123!";
            connection.Open();
            MessageBox.Show("Database Connected ");

            SqlCommand command = new SqlCommand("delete  Login set  values(@id, @pass)", connection);


int result = command.ExecuteNonQuery();
            
         
        }

       
    }
}

+++++++++++++++++++++++++++++++++++++++


using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using System.Xml;

namespace WindowsFormsApplication2
{
    public partial class DisconnectedConnection : Form
    {
        public DisconnectedConnection()
        {
            InitializeComponent();
        }

        SqlConnection connection;
        SqlCommand command;
        SqlDataAdapter adapter;
        DataSet dataSet;
        DataTable dataTable;
        DataRow dataRow;


        private void DisconnectedConnection_Load(object sender, EventArgs e)
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=LP-ASHOKSH\\SQLSERVER2008;Initial Catalog=master;user id =sa;password=info123!";
            adapter = new SqlDataAdapter("select *  from Employee", connection);
            dataSet = new DataSet();

            adapter.Fill(dataSet, "Employee");
            dataSet.WriteXml("d:\\a\\Employee.xml");
            dataSet.WriteXmlSchema("d:\\a\\Employee.xsd");
            MessageBox.Show("XML File Generated ");
            
            dataTable = dataSet.Tables[0];


            dataGridView1.DataSource = dataTable;

            adapter.UpdateBatchSize = 7;

            adapter.RowUpdating += new SqlRowUpdatingEventHandler(adapter_RowUpdating);
            adapter.RowUpdated += new SqlRowUpdatedEventHandler(adapter_RowUpdated);


            XmlTextReader reader = new XmlTextReader("d:\\a\\Employee.xml");
            DataSet ds = new DataSet();
            ds.ReadXml(reader);
            dataGridView2.DataSource = ds.Tables[0];



        }

        private static int updatingcounter = 0, updatedcounter = 0;
        private void adapter_RowUpdated(object sender, SqlRowUpdatedEventArgs e)
        {
            updatedcounter++;
            MessageBox.Show("Row Updated Counter is :" + updatedcounter);
        }

        private void adapter_RowUpdating(object sender, SqlRowUpdatingEventArgs e)
        {
            updatingcounter++;
            MessageBox.Show("Row Updating Counter " + updatingcounter);
        }




        private void btnSearch_Click(object sender, EventArgs e)
        {           
            int counter = 0;
            bool flag = false;
            while (counter < dataTable.Rows.Count)
            {
                if (txtEmpID.Text.Equals(dataTable.Rows[counter][0].ToString()))
                {
                    flag = true;
                    txtEmpName.Text = dataTable.Rows[counter][1].ToString();
                    txtSalary.Text = dataTable.Rows[counter][2].ToString();
                    txtAddress.Text = dataTable.Rows[counter][3].ToString();

                    dataRow = dataTable.Rows[counter];
                }
                counter++;
            }

            if (flag)
                MessageBox.Show("Record Found ");
            else
                MessageBox.Show("Record Not Found ");

        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            dataRow[1] = txtEmpName.Text;
            dataRow[2] = txtSalary.Text;
            dataRow[3] = txtAddress.Text;

           // dataTable.Rows.Add(dataRow);
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            //dataSet.Tables[0].Rows.Remove(dataRow);
            dataTable.Rows.Remove(dataRow);
            MessageBox.Show("Row Removed ");
        }

        private void btnInsert_Click(object sender, EventArgs e)
        {
            dataRow = dataTable.NewRow();
            dataRow[0] = txtEmpID.Text;
            dataRow[1] = txtEmpName.Text;
            dataRow[2] = Convert.ToInt32(txtSalary.Text);
            dataRow[3] = txtAddress.Text;

            dataTable.Rows.Add(dataRow);

        }

        private void btnSaveChanges_Click(object sender, EventArgs e)
        {
          SqlCommandBuilder builder = new SqlCommandBuilder(adapter);
            adapter.Update(dataSet, "Employee");
            MessageBox.Show("Changes Saved Permanently");
        }


        
    }
}
