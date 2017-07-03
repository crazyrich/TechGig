using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace BillingService
{
    [ServiceContract]
    interface Interface1
    {
        [OperationContract]
        void Accept_BillDetails(int billID, string bill_Date, int amount);
        [OperationContract]
        void Accept_CustomerDetails(int customerID, string customer_Name);
        [OperationContract]
        void Accept_ProductDetails(int productID, string productName, int qtyInStock);
    }
}
