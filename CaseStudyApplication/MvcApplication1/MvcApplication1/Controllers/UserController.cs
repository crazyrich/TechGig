
using MvcApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace MvcApplication1.Controllers
{
    public class UserController : ApiController
    {

        static readonly UserRepository repository = new UserRepository();

        public List<User> GetAllUsers() {

            return repository.GetAll();
        
        }
    }
}
