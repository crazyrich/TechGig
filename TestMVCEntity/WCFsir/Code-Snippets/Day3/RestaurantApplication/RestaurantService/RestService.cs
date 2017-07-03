using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace RestaurantService
{
    public class RestService : IRestaurantService , IUserService
    {
        newEntities db = new newEntities();

        public List<Restaurant> GetAllRestaurnat()
        {
            return db.Restaurants.ToList();
        }

        public Restaurant GetRestaurnat(int Id)
        {
            var res = db.Restaurants.ToList().Find(e=>e.Id==Id);
            if (res != null)
            {
                return res;
            }
            else
            {
                MyException exception = new MyException {
                LineNumber=6,
                Msg = "Restaurant id is not found !!",
                StackTrace="Hello"
                };
                throw new FaultException<MyException>(exception);
            }
        }

        public void AddRestaurant(Restaurant newRestaurant)
        {
            if (newRestaurant !=null)
            {
                db.Restaurants.Add(newRestaurant);
                db.SaveChanges();
            }
        }

        public void RemoveRestaurant(int Id)
        {
            var res = db.Restaurants.ToList().Find(e => e.Id == Id);
            if (res != null)
            {
                db.Restaurants.Remove(res);
                db.SaveChanges();
            }
            else
            {
                throw new FaultException("Restaurant id is not valid  !!");
            }
        }


        public void EditRestaurant(int Id, Restaurant newRest)
        {
            var res = db.Restaurants.ToList().Find(e=>e.Id==Id);
            if (res != null && newRest != null)
            {
                res.Name = newRest.Name;
                res.MobileNumber = newRest.MobileNumber;
                res.City = newRest.City;
                res.EmailAddress = newRest.EmailAddress;

                db.SaveChanges();
            }
            else
            {
                throw new FaultException("Something happen bad !!");
            }
        }

        public List<Restaurant> GetAllRest()
        {
            return db.Restaurants.ToList();
        }
    }
}