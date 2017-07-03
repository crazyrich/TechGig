using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;


namespace DisconnectedDatabaseQuesBySir
{
    class Employee
    {
        SqlConnection connection;
        SqlCommand command;
       
        int id;
        string name;
        int phone;
        string email;
        string project;
        List<Employee> list = new List<Employee>();

        #region SEARCH
        public void Search()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();
            Console.WriteLine("CONNECTED");
            SqlCommand command = new SqlCommand("SELECT ID, Name, Phone, Email, Project from EMployee2 Where ID=@id", connection);
            Console.WriteLine("ENter ID GET DETAILS OF::");
            id = Convert.ToInt32(Console.ReadLine());
            command.Parameters.Add("@id", id);
            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                Console.Write(reader[1] + " " + reader[2] + " " + reader[3] + " " + reader[4]);

            }
            else 
            {
                Console.WriteLine("NO RECORD FOUND!!");
            }
            connection.Close();

        }
        #endregion

        #region UPDATE
        public void Update()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();

            SqlCommand command = new SqlCommand("Update Employee2 set Name=@name, Phone=@phone, Email=@email, Project=@project Where ID=@id", connection);
            Console.WriteLine("ENter ID You Want TO UPDATE");
            id = Convert.ToInt32(Console.ReadLine());
            Console.Write("  Name  ");
            name = Console.ReadLine();
            Console.Write("  Phone  ");

            phone = Convert.ToInt32(Console.ReadLine());
            Console.Write("  Email  ");

            email = Console.ReadLine();
            Console.Write("  PROJECT  ");

            project = Console.ReadLine();

            command.Parameters.Add("@id", id);
            command.Parameters.Add("@name", name);
            command.Parameters.Add("@phone", phone);
            command.Parameters.Add("@email", email);
            command.Parameters.Add("@project", project);
            int result=command.ExecuteNonQuery();

            if (result > 0)
            {

                Console.WriteLine("ÜPDATED!");
            }
            else 
            {
                Console.WriteLine("NOT UPDATED!!");
            }
            connection.Close();

        }

        #endregion

        #region DELETE
        public void Delete()
        {
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            connection.Open();

            SqlCommand command = new SqlCommand("Delete Employee2 Where ID=@id", connection);
            Console.WriteLine("ÏD");
            id = Convert.ToInt32(Console.ReadLine());
            command.Parameters.Add("@id", id);
            command.ExecuteNonQuery();
            Console.WriteLine("DELETED!");
            connection.Close();

        }

        #endregion
        #region INSERT
        public void Insert()
        {
            int count = 0;
            connection = new SqlConnection();
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich; user id=sa;password=info123!";
            connection.Open();
            bool flag = true;
            while (flag)
            {
                Employee e = new Employee();

                Console.WriteLine("ÏD");
                e.id = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Name");
                e.name = Console.ReadLine();
                Console.WriteLine("Phone");
                e.phone = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Email");
                e.email = Console.ReadLine();
                Console.WriteLine("Project");
                e.project = Console.ReadLine();

                list.Add(e); 

                bool flag1 = true;
                while (flag1)
                {
                    Console.WriteLine("DO YOU WANT TO ENTER MORE? Y/N");
                    char choice = Convert.ToChar(Console.ReadLine());
                    if (choice == 'y')
                    {
                        break;
                    }
                    if (choice == 'n')
                    {
                        flag = false;
                        break;

                    }
                    else
                    {
                        continue;
                    }
                 }//this 'while'
            }//'flag' while
            count = list.Count();
            Console.WriteLine("DO YOU WANT TO SAVE PERMANENTLY? Y/N");
            char choice3 = Convert.ToChar(Console.ReadLine());
            while (true)
            {
                if (choice3 == 'y')
                {
                    foreach (var i in list)
                    {
                        Console.WriteLine(i.id + " ");
                        command = new SqlCommand("Insert Into Employee2 Values(@id,@name,@phone,@email,@project)", connection);

                        command.Parameters.Add("@id", i.id);
                        command.Parameters.Add("@name", i.name);
                        command.Parameters.Add("@phone", i.phone);
                        command.Parameters.Add("@email", i.email);
                        command.Parameters.Add("@project", i.project);

                        //Console.WriteLine("INSERTED");
                        int result = command.ExecuteNonQuery();
                        if (result > 0)
                        {

                            Console.WriteLine("INSERTED!");
                        }
                        else
                        {
                            Console.WriteLine("NOT INSERTED!!");
                        }
                    }
                    break;
                }//if ends
                else if (choice3 == 'n')
                {
                    list.Clear();
                    Console.WriteLine("DISCARDED!!");
                    break;
                }
                else
                {
                    Console.WriteLine("INVALID OPTION!!");
                    continue;
                }
                connection.Close();
            }//while ends
        }//fxn ends
        #endregion

        #region MAIN
        static void Main(string[] args)
        {
            Employee obj = new Employee();
            bool flag=true;
            while (flag)
            {
                Console.WriteLine("1 - Search");
                Console.WriteLine("2 - Insert");
                Console.WriteLine("3 - Update");
                Console.WriteLine("4 - Delete");
                Console.WriteLine("5 - Save Permanently To DataBase");
                int choice = Convert.ToInt32(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        obj.Search();
                        break;

                    case 2:
                        obj.Insert();
                        break;

                    case 3:
                        obj.Update();
                        break;
                    case 4:
                        obj.Delete();
                        break;
                    default:
                        Console.Write("Choose Valid OPtion");
                        break;
                }
                bool flag2 = true;
                while (flag2)
                {
                    Console.WriteLine("DO YOU WANT TO CONTINUE? Y/N");
                    char choice2 = Convert.ToChar(Console.ReadLine());
                    if (choice2 == 'y')
                    {
                        break;
                    }
                    else if (choice2 == 'n')
                    {
                        flag = false;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Choose VAlid Option!!");
                        continue;
                    }
                }
            }

        }
        #endregion
    }
}
     