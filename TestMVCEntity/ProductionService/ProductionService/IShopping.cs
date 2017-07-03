using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace ProductionService
{
    [ServiceContract]
    public interface IShopping
    {
        [OperationContract]
        void UpdateShopping(int Id,int dec);
        [FaultContract(typeof(MyException))]
        [OperationContract(Name="GetProductsbyid")]
        Product GetProducts(int Id);

        [OperationContract]
        List<Product> GetProducts();
    }
}
