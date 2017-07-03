using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace RestaurantService
{
    [ServiceContract]
   public interface IUserService
    {
        [OperationContract]
        List<Restaurant> GetAllRest();
    }
}
