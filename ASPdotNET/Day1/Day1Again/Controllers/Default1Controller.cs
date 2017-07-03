using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Day1Again.Controllers
{
    public class Default1Controller : Controller
    {
        //
        // GET: /Default1/

        //public ActionResult Index()
        //{
        //    return View();
        //}
        public string First()
        {
            return "HELLO WORLD ";
        }
        public ViewResult Second()
        {
            return View();
        }

    }
}
