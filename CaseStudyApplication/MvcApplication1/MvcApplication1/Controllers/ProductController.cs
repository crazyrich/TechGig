using MvcApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class ProductController : ApiController
    {
        static readonly ProductRepository repository = new ProductRepository();
        [System.Web.Http.HttpGet]
        public List<Product> GetAllProducts()
        {
            return repository.GetAll();
        }

        [System.Web.Http.HttpPut]
        public void PutKeyAccomplishments(Product product)
        {
            if (!repository.AddSingleProduct(product))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        [System.Web.Http.HttpDelete]
        public void DeleteProduct(Product product)
        {
            if (!repository.DeleteSingleProduct(product))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
