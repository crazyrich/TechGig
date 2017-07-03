using Day1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Day1.Controllers
{
    public class TrainingController : Controller
    {
        TrainingAppContext db = new TrainingAppContext();
        //
        // GET: /Training/

        public ActionResult Index()
        {
            var res = db.Trainings.ToList();//fetching the data like from t1 in table select t1 DOES
            return View(res);
        }
    }
}
