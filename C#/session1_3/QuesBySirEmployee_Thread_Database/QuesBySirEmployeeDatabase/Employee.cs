﻿using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace QuesBySirEmployeeDatabase
{
    class Employee
    {
         static SqlConnection connection = new SqlConnection();
         int id = 0;
         string name;
         int phone = 0;
         string email;
         string project;
           
        public void ConnectDatabase()
        {
            connection.ConnectionString = "Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;user id=sa;password=info123!";
            
        }
        public void FetchDetails()
        {
            connection.Open();
            SqlCommand command = new SqlCommand("select * from Employee",connection);
            SqlDataReader reader = command.ExecuteReader();
            if(reader.Read())
            {
                foreach(var i in reader)
                {
                    Console.WriteLine(reader[0] + " ");
                }
            }
           
            connection.Close();
        }
        public void AcceptDetails()
        {
           
            Console.WriteLine("Enter Id:");
            id=Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Name:");
            name=Console.ReadLine();

            Console.WriteLine("Enter Phone:");
            phone=Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Enter Email:");
            email=Console.ReadLine();

            Console.WriteLine("Enter Project:");
            project=Console.ReadLine();
        }
        public void InsertRecords(Employee obj)
        {
            SqlCommand command = new SqlCommand("Ïnsert into Employee values(@id,@name,@phone,@email,@project)",connection);
            command.Parameters.Add("@id",obj.id);
            command.Parameters.Add("@name", obj.name);
            command.Parameters.Add("@phone", obj.phone);
            command.Parameters.Add("@email", obj.email);
            command.Parameters.Add("@project", obj.project);
        }
        public void ShowDetails(Employee obj)
        {
            Console.WriteLine(obj.name+" "+obj.phone+" "+obj.email+ " "+obj.project);
        }
        static void Main(string[] args)
        {
            //Employee obj;
            //obj.ConnectDatabase();
           // obj.FetchDetails();
            //connection.Close();
            
            ArrayList<Employee> list1 = new ArrayList<Employee>();
            Console.WriteLine("How many employees details you want to enter?");
            int n=Convert.ToInt32(Console.ReadLine());

            for (int i = 0; i < n;i++ )
            {
                Employee obj = new Employee();
                obj.AcceptDetails();
                list1.Add(obj);
               
                //obj.ShowDetails(obj);
                //obj.InsertRecords(obj);
            }
        }
    }
}

































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































