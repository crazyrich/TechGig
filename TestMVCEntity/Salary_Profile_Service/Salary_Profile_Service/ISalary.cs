using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace Salary_Profile_Service
{
    [ServiceContract]
 public interface ISalary
    {
        [OperationContract]
        Salary GetSalary(int Id);

        [OperationContract]
        void EditSalary(int Id,Salary salary);
    }
}
