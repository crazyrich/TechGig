using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace ProductionService
{
    public class ProductionService : IProduction,IShopping
    {
        TestMVCentityEntities db = new TestMVCentityEntities();
        public List<Product> GetAllProducts()
        {
            return db.Products.ToList();
        }

        public void AddProduct(Product newProduct)
        {
            Product obj = new Product()
            {
                ProductID = newProduct.ProductID,
                ProductName = newProduct.ProductName,
                ProductPrice = newProduct.ProductPrice,
                Units = newProduct.Units,
            };
            db.Products.Add(obj);
            db.SaveChanges();
        }


        public void Update(string name,int unit)
        {
            var res = db.Products.ToList().Find(x=>x.ProductName.Trim()==name);
            if (res != null)
            {
                res.ProductID = res.ProductID;
                res.ProductName = res.ProductName;
                res.ProductPrice = res.ProductPrice;
                res.Units =res.Units+unit;
                db.SaveChanges();
            }
            else
            {
                throw new FaultException("Update Faulty !!");
            }
        }

        public void UpdateShopping(int Id, int dec)
        {
            var res = db.Products.ToList().Find(x=>x.ProductID==Id);
            if (res != null)
            {
                res.Units = res.Units - dec;
                db.SaveChanges();
            }
            else
            {
                throw new FaultException("Faulty !!");
            }
        }

        public Product GetProducts(int Id)
        {
            var res = db.Products.ToList().Find(x=>x.ProductID==Id);
            if (res != null)
            {
                
                return res;
            }
            else
            {
                MyException exception = new MyException()
                {
                    StackTrace="Stack Trace Text",
                    LineNumber=10,
                    Msg="Message Text"

                };
                throw new FaultException<MyException>(exception);
            }
            //return db.Products.ToList();
        }


        public List<Product> GetProducts()
        {
            return db.Products.ToList();
            
        }
    }
}