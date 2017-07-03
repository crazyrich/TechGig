using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace ShowBalance
{
    [ServiceContract]
    public interface Interface1
    {
        [OperationContract]
        string Check_Balance(int mobileNum);
        [OperationContract]
        string Check_Validity(int mobileNum);   
    }
}
