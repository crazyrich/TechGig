using CoursePractice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CoursePractice.Controllers
{
    public class CourseController : Controller
    {
        //
        // GET: /Course/
        DbChild db = new DbChild();
        public ActionResult Index()
        {
            IEnumerable<Course> res = db.Courses.ToList();
            return View(res);
        }

    }
}
