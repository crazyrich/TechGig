using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace RestaurantService
{
    [ServiceContract]
   public  interface IUser
    {
        [OperationContract]
        List<Restaurant> AllForUser();
    }
}
