using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace RestaurantService
{
    public class RestService : IRestaurant,IUser
   {
        //ORM object
        richEntities db = new richEntities();

       public List<Restaurant> GetAllRestaurant()
       {
           return db.Restaurants.ToList();
       }

       public Restaurant GetRestaurant(int Id)
       {
           var res = db.Restaurants.ToList().Find(x=>x.Id==Id);
           if (res != null)
           {
               return res;
           }
           else
           {
               MyException exc = new MyException()
               {
                   LineNumber = 6,
                   StackTrace = "Error :",
                   Msg = "ID Not Valid !!"
               };
               throw new FaultException<MyException>(exc);
           }
       }

       public void AddRestaurant(Restaurant newRestaurant)
       {
           if(newRestaurant != null)
           {
               db.Restaurants.Add(newRestaurant);
               db.SaveChanges();
           }
       }

       public void RemoveRestaurant(int Id)
       {
           var res = db.Restaurants.ToList().Find(x => x.Id == Id);
           if (res != null)
           {
               db.Restaurants.Remove(res);
               db.SaveChanges();
           }
           else
           {
               throw new FaultException("Restaurant Id NOT Found !");
           }
       }
       public void EditRestaurant(int Id, Restaurant newRest)
       {
           var res = db.Restaurants.ToList().Find(c=>c.Id==Id);
           if (res != null)
           {
               res.Name = newRest.Name;
               res.MobileNumber = newRest.MobileNumber;
               res.City = newRest.City;
               res.EmailAddress = newRest.EmailAddress;
               db.SaveChanges();
           }
           else
           {
               throw new FaultException("Something  Bad !");
           
           }
       }

       public List<Restaurant> AllForUser()
       {
           return db.Restaurants.ToList();

       }
   }
}