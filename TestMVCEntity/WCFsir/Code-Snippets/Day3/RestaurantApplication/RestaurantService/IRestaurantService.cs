using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace RestaurantService
{
    [ServiceContract]
   public interface IRestaurantService
    {
        [OperationContract]
        List<Restaurant> GetAllRestaurnat();

        [FaultContract(typeof(MyException))]
        [OperationContract]
        Restaurant GetRestaurnat(int Id);

        [OperationContract]
        void AddRestaurant(Restaurant newRestaurant);

        [OperationContract]
        void RemoveRestaurant(int Id);

        [OperationContract]
        void EditRestaurant(int Id, Restaurant newRest);
    }

}
