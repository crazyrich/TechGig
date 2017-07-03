using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BillingService
{
    public class BillingDetails: Interface1
    {
        FileStream fs = new FileStream("D:\\filehandling",FileMode.OpenOrCreate,FileAccess.Write,FileShare.Write);
        public void Accept_BillDetails(int billID, string bill_Date, int amount)
        {
            StreamWriter sw = new StreamWriter(fs);
            sw.Write(billID + " " + bill_Date + " " + amount);
            sw.Close();
            fs.Close();
        }

        public void Accept_CustomerDetails(int customerID, string customer_Name)
        {
            StreamWriter sw = new StreamWriter(fs);
            sw.Write(customerID + " " + customer_Name);
            sw.Close();
            fs.Close();
            
        }

        public void Accept_ProductDetails(int productID, string productName, int qtyInStock)
        {
            StreamWriter sw = new StreamWriter(fs);
            sw.Write(productID + " " + productName + " " + qtyInStock);
            sw.Close();
            fs.Close();
        }
    }
}
