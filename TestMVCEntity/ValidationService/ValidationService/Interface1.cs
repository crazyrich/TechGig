using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ValidationService
{
    [ServiceContract]
    interface Interface1
    {
        [OperationContract]
        bool Login(string username, string password);
    }
}
