using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Data.SqlClient;
using PortfolioWebApp.Models;
using System.Data.OleDb;
using System.IO;
using System.Data;


namespace PortfolioWebApp.Models
{
    public class CustomerRepository : ICustomerRepository
    {
        public IEnumerable<Customer> GetAll()
        {
            List<Customer> customers = new List<Customer>();

            //string query = string.Format("SELECT [CustomerID], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country], [Phone], [Fax] FROM [ProjectManagement].[dbo].[Customers]");

            //using (SqlConnection con =
            //        new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            //{
            //    using (SqlCommand cmd = new SqlCommand(query, con))
            //    {
            //        con.Open();
            //        SqlDataReader reader = cmd.ExecuteReader();

            //        while (reader.Read())
            //        {
            //            Customer customer = new Customer();
            //            customer.CustomerID = reader.GetString(0);
            //            customer.CompanyName = reader.GetString(1);
            //            customer.ContactName = reader.GetString(2);
            //            customer.ContactTitle = reader.GetString(3);
            //            customer.Address = reader.GetString(4);
            //            customer.City = reader.GetString(5);

            //            if (reader.GetValue(6) != null)
            //            {
            //                customer.Region = reader.GetValue(6).ToString();
            //            }
            //            else
            //            {
            //                customer.Region = string.Empty;
            //            }

            //            if (reader.GetValue(7) != null)
            //            {
            //                customer.PostalCode = reader.GetValue(7).ToString();
            //            }
            //            else
            //            {
            //                customer.PostalCode = string.Empty;
            //            }

            //            customer.Country = reader.GetString(8);
            //            customer.Phone = reader.GetString(9);

            //            if (reader.GetValue(10) != null)
            //            {
            //                customer.Fax = reader.GetValue(10).ToString();
            //            }
            //            else
            //            {
            //                customer.Fax = string.Empty;
            //            }

            //            customers.Add(customer);
            //        }
            //        con.Close();
            //    }
            //}
            string connString = "";
            
            //string path = "D:\\Ashwani\\HostedApp\\Customers.xlsx";
            //if (strFileType.Trim() == ".xls")
            //{
            //    connString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + path + ";Extended Properties=\"Excel 8.0;HDR=Yes;IMEX=2\"";
            //}
            //else if (strFileType.Trim() == ".xlsx")
            //{
            //    connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=\"Excel 12.0 Xml;HDR=NO;\"";
            //}
            //connString = String.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES""", "D:\\Ashwani\\HostedApp\\Customers.xlsx");
            //connString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=D:\\Ashwani\\HostedApp\\Customers.xlsx;Extended Properties=\"Excel 12.0 Xml;HDR=NO;\"";
            //connString = @"Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + path + ";Extended Properties=Excel 12.0;Persist Security Info=False";
            // string constr = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

            string file = HttpContext.Current.Server.MapPath("~/App_Data/Customers.xlsx");

            string strFileType = Path.GetExtension(file).ToLower();

            if (strFileType.Trim() == ".xls")
            {
                connString = string.Format(ConfigurationManager.AppSettings["Excel2003OleDBConnection"], file);
            }
            else if (strFileType.Trim() == ".xlsx")
            {
                connString = string.Format(ConfigurationManager.AppSettings["Excel2007OleDBConnection"], file);
            }
                        
            using (OleDbConnection conn = new OleDbConnection(connString))
            {

                conn.Open();
                OleDbCommand command = new OleDbCommand("Select * from [Sheet1$A1:K]", conn);
                OleDbDataReader reader = command.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Customer customer = new Customer();
                        customer.CustomerID = reader.GetString(0);
                        customer.CompanyName = reader.GetString(1);
                        customer.ContactName = reader.GetString(2);
                        customer.ContactTitle = reader.GetString(3);
                        customer.Address = reader.GetString(4);
                        customer.City = reader.GetString(5);

                        if (reader.GetValue(6) != null)
                        {
                            customer.Region = reader.GetValue(6).ToString();
                        }
                        else
                        {
                            customer.Region = string.Empty;
                        }

                        if (reader.GetValue(7) != null)
                        {
                            customer.PostalCode = reader.GetValue(7).ToString();
                        }
                        else
                        {
                            customer.PostalCode = string.Empty;
                        }

                        customer.Country = reader.GetString(8);
                        customer.Phone = reader.GetString(9);

                        if (reader.GetValue(10) != null)
                        {
                            customer.Fax = reader.GetValue(10).ToString();
                        }
                        else
                        {
                            customer.Fax = string.Empty;
                        }

                        customers.Add(customer);
                    }
                }

                conn.Close();
            }
            return customers.ToArray();
        }

        public Customer Get(string customerID)
        {
            Customer customer = new Customer();
            string query = string.Format(" SELECT [CustomerID], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country], [Phone], [Fax] FROM [ProjectManagement].[dbo].[Customers] " +
                "  WHERE CustomerID LIKE '%" + customerID + "%'");

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        customer.CustomerID = reader.GetString(0);
                        customer.CompanyName = reader.GetString(1);
                        customer.ContactName = reader.GetString(2);
                        customer.ContactTitle = reader.GetString(3);
                        customer.Address = reader.GetString(4);
                        customer.City = reader.GetString(5);

                        if (reader.GetValue(6) != null)
                        {
                            customer.Region = reader.GetValue(6).ToString();
                        }
                        else
                        {
                            customer.Region = string.Empty;
                        }

                        if (reader.GetValue(7) != null)
                        {
                            customer.PostalCode = reader.GetValue(7).ToString();
                        }
                        else
                        {
                            customer.PostalCode = string.Empty;
                        }

                        customer.Country = reader.GetString(8);
                        customer.Phone = reader.GetString(9);

                        if (reader.GetValue(10) != null)
                        {
                            customer.Fax = reader.GetValue(10).ToString();
                        }
                        else
                        {
                            customer.Fax = string.Empty;
                        }

                    }
                    con.Close();
                }
            }
            return customer;
        }

        public Customer Add(Customer item)
        {
            string query = string.Format("INSERT INTO [ProjectManagement].[dbo].[Customers] " +
                        " ( [CustomerID], [CompanyName], [ContactName], [ContactTitle], [Address], [City], [Region], [PostalCode], [Country] " +
                        " ,[Phone], [Fax] ) VALUES " +
                       " ( '{0}', '{1}', '{2}', '{3}', '{4}',  '{5}', '{6}', '{7}', '{8}',  '{9}', '{10}' )", item.CustomerID, item.CompanyName, item.ContactName,
                       item.ContactTitle, item.Address, item.City, item.Region, item.PostalCode, item.Country, item.Phone, item.Fax);

            using (SqlConnection con =
                    new SqlConnection("your connection string"))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return item;
        }

        public bool Remove(string customerID)
        {
            string query = string.Format("DELETE FROM [ProjectManagement].[dbo].[Customers] WHERE CustomerID LIKE '{0}", customerID);

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;
        }

        public bool Update(Customer item)
        {
            string query = string.Format("UPDATE [ProjectManagement].[dbo].[Customers] " +
                    " SET [CustomerID] = '{0}'," +
                    " [CompanyName] = '{1}', " +
                    " [ContactName] = '{2}', " +
                    " [ContactTitle] = '{3}', " +
                    " [Address] = '{4}', " +
                    " [City] = '{5}', " +
                    " [Region] = '{6}', " +
                    " [PostalCode] = '{7}', " +
                    " [Country] = '{8}', " +
                    " [Phone] = '{9}', " +
                    " [Fax] = '{10}' " +
                    " WHERE CustomerID LIKE '{11}'", item.CustomerID, item.CompanyName, item.ContactName, item.ContactTitle, item.Address, item.City, item.Region,
                     item.PostalCode, item.Country, item.Phone, item.Fax, item.CustomerID);

            using (SqlConnection con =
                    new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
            }

            return true;
        }
    }
}