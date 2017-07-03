using Day1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Day1.Controllers
{


    public class HomeController : Controller
    {
        public ActionResult IndexJson()
        {
            var list = new List<Training>()
            {
                new Training{Id=1,Topic="C#", Description="OOp's programming Language !"},
                new Training{Id=2,Topic="WCF", Description="OOp's programming Language 2!"}

            };
            return Json(list,JsonRequestBehavior.AllowGet);
        }

        //
        // GET: /Home/

        //public ActionResult Index()
        //{
        //    return View();
        //}
        public ActionResult Index(int id)
        {
            ViewBag.Id = id;
            return View();
        }
        public ActionResult First()
        {
            return View();        
        }
        public ContentResult Index1()
        {
            return Content("This is from Content Result !");        
        }
        public FileResult FileIndex()
        {
            return File("~/Content/1.png","image/png","xyz.png");
        }
        public ActionResult Second()
        {
            //return RedirectToAction("Third");
            return View();
        }
        public ActionResult Third()
        {
            return View();
        }
    }
}
