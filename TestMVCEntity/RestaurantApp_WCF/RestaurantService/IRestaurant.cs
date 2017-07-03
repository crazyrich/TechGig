using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace RestaurantService
{
    [ServiceContract]
    public interface IRestaurant
    {
        [OperationContract]
        List<Restaurant> GetAllRestaurant();

        [FaultContract(typeof(MyException))]
        [OperationContract]
        Restaurant GetRestaurant(int Id);

        [OperationContract]
        void AddRestaurant(Restaurant newRestaurant);

        [OperationContract]
        void RemoveRestaurant(int Id);
        [OperationContract]
        void EditRestaurant(int id,Restaurant newRest);

    }

}
