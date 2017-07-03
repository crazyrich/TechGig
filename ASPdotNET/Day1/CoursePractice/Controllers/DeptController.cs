using CoursePractice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CoursePractice.Controllers
{
    public class DeptController : Controller
    {
        //
        // GET: /Dept/
        DbChild db = new DbChild();
        public ActionResult Index()
        {
            IEnumerable<Dept> res = db.Dept.ToList();
            return View(res);
        }

    }
}
