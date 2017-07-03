using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Objects;

namespace Models
{
    class Program
    {
        static void Main(string[] args)
        {
            richEntities1 db = new richEntities1();
            ObjectParameter param1 = new ObjectParameter("name",typeof(string));
            var result = db.proc21(3);
            Console.WriteLine( "Value is "+param1.Value);
            Console.WriteLine("DONE");
        }
        
    }
}

//LAZY LOADING---

//richEntities db = new richEntities();
//Inserting
//            //Product prod = new Product( )
//            //{
//            //    productID = "P006",
//            //    name = "Mothboard",
//            //    supplier = "HP retailers",
//            //    brand = "HP",

//            //};
//            //db.Products.Add(prod);
//            //db.SaveChanges();
//            //Console.WriteLine("INSERTED !");

//            //var list =  db.Products.ToList();
//            //foreach(var i in list)
//            //{
//            //    Console.WriteLine(i.productID+" "+i.name+"  "+i.supplier);

//            //}


//            Product prod = db.Products.SingleOrDefault(x => x.productID=="P001");
//            db.Products.Remove(prod);
//            db.SaveChanges();


//////////////////////////////////////
//LAZY LOADING---

  //Car newcar =new Car()
  //          {
  //              Brand="Nissa",
  //              ModelNo="M002",
  //          };
  //          CarDetail cardetails= new CarDetail()
  //          {
  //          BuyerName="Ramu",
  //          PurchaseDate=System.DateTime.Now,
  //          CarID=1,
            
  //          };
            

  //          //newcar.CarDetails.Add(cardetails);//cardetails firts then carDetails
  //          //db.Cars.Add(newcar);

  //          //db.CarDetails.Add(cardetails);
  //          db.SaveChanges();
  //          Console.WriteLine("INSERTED !");

///////////////////
//LAZY LOADING---

//////Fetch Details of Cars And Corresponding CarDetails
//            richEntities db = new richEntities();
//            Car carRecord = db.Cars.Single(x => x.ModelNo=="M001");
//            Console.WriteLine(carRecord.CarID+" "+carRecord.Brand+" "+carRecord.ModelNo);

//            foreach(var i in carRecord.CarDetails)
//            {
//                Console.WriteLine(i.CarDetailID+" "+i.BuyerName+" "+i.PurchaseDate+" ");
//            }
//            Console.WriteLine("Done");

  //////////CarDetails--->>> Cars
            //LAZY LOADING---
            //richEntities db = new richEntities();
            //CarDetail carDetail = db.CarDetails.SingleOrDefault(x=> x.BuyerName=="Ramu");
            //Console.WriteLine(carDetail.BuyerName+" "+carDetail.PurchaseDate);
            //Console.WriteLine(carDetail.Car.Brand+" "+carDetail.Car.ModelNo);


////EAGER loading-----
//            richEntities db = new richEntities();
//            var readcar = db.Cars.Include("CarDetails");
//            foreach(var i in readcar)
//            {
//                Console.WriteLine(i.CarID+" "+i.Brand+""+i.ModelNo);
//                foreach(var j in i.CarDetails)
//                {
//                    Console.WriteLine("-----"+j.CarID+" "+j.BuyerName+" "+j.PurchaseDate);                
//                }
//            }
            
//////////////
//richEntities db = new richEntities();
//            User user1 = new User() { UserName="ashok.sharma",FirstName="ashok",LastName="sharma"};
//            User user2 = new User() { UserName="deepak.sharma",FirstName="deepak",LastName="sharma"};
//            User user3 = new User() { UserName="aadi.sharma",FirstName="aadi",LastName="sharma"};
//            User user4 = new User() { UserName = "anand.sharma", FirstName = "anand", LastName = "sharma" };

//            Role role1 = new Role() { RoleName="SysAdmin",RoleDescription="All Permissions"};
//            Role role2 = new Role() { RoleName = "Instructor", RoleDescription = "Limited Permissions" };

//            role1.Users.Add(user1);
//            role1.Users.Add(user2);
//            role2.Users.Add(user3);
//            role2.Users.Add(user4);

//            db.Roles.Add(role1);
//            db.Roles.Add(role2);
//            db.SaveChanges();


//////
// richEntities db = new richEntities();
//            User user = db.Users.SingleOrDefault(x=> x.UserName=="ashok.sharma");
//            Role role = db.Roles.SingleOrDefault(x=> x.RoleName=="Instructor");
//            role.Users.Remove(user);
//            db.SaveChanges();


////

            //richEntities1 db = new richEntities1();
            //JapaniesCar japanCar = new JapaniesCar()
            //{
            //    Brand = "Maruti",
            //    Region = "North",
            //    ModelNo = "M001",
            //    AdditionalDetails = "Red Color",

            //};
            //db.Cars.Add(japanCar);
            //db.SaveChanges();