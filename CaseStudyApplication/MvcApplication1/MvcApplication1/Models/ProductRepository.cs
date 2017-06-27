using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MvcApplication1.Models
{
    public class ProductRepository
    {
        public List<Product> GetAll()
        {
            List<Product> listOfProducts = new List<Product>();

            string query = @"select SNO,Productid,name,quantity,unitprice from Products order by SNO";
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CaseStudyApp"].ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {

                    con.Open();
                    cmd.CommandType = CommandType.Text;

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Product product = new Product();

                        product.sno = Convert.ToInt32(reader["SNO"]);
                        product.productid = Convert.ToString(reader["productid"]);
                        product.name = Convert.ToString(reader["name"]);
                        product.unitprice = Convert.ToDecimal(reader["unitprice"]);
                        product.quantity = Convert.ToInt32(reader["quantity"]);

                        listOfProducts.Add(product);

                    }
                    con.Close();
                }

            }
            return listOfProducts;
        }

        public bool AddSingleProduct(Product product)
        {
            string id = Convert.ToString(product.productid);
            string name = Convert.ToString(product.name);
            int quantity = Convert.ToInt32(product.quantity);
            decimal unitprice = Convert.ToDecimal(product.unitprice);

            string query = @"insert into products (Productid,name,quantity,unitprice) values('" + id + "','" + name + "'," + quantity + "," + unitprice + ");";


            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CaseStudyApp"].ConnectionString))
            {
                SqlCommand cmd = new SqlCommand(query, con);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            return true;
        }

        public bool DeleteSingleProduct(Product product)
        {
            string query = "DELETE FROM Products where productid = '" + product.productid + "'";
            using (SqlConnection con = new SqlConnection(ConfigurationManager.ConnectionStrings["CaseStudyApp"].ConnectionString))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            return true;
        }
    }
}