using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace Salary_Profile_Service
{
    [ServiceContract]
    public interface IProfile
    
    {

      
        [OperationContract]
        List<Profile> GetAllProfile();

        [FaultContract(typeof(MyException))]
        [OperationContract]
        Profile GetProfileById(int Id);

        [FaultContract(typeof(MyException))]
        [OperationContract]
        void DeleteProfile(int Id);

        [OperationContract]
        void AddProfile(Profile newProfile);
    }
}
