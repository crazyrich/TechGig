using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace ProductionService
{
    [ServiceContract]
    public interface IProduction
    {
        [OperationContract]
        List<Product> GetAllProducts();

        [OperationContract]
        void AddProduct(Product newProduct);

        [OperationContract]
        void Update(string name,int unit);
    }
}
