using Day1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Day1.Controllers
{
    public class TrainerController : Controller
    {
        //
        // GET: /Trainer/
        TrainingAppContext db = new TrainingAppContext();
        public ActionResult Index()
        {
            IEnumerable<Trainer> res = db.Trainers.ToList();//like from t1 in table select t1
            return View(res);//sending model to view
        }
        public ActionResult Details(int Id)
        {
            var res = db.Trainers.Find(Id);
            if (res != null)
            {
                return View(res);
            }
            else
            {
                //return View("Index");
                return HttpNotFound();
            }
        }
        [HttpGet]
        public ActionResult Edit(int Id)
        {
            var res = db.Trainers.Find(Id);
            if (res != null)
            {
                return View(res);
            }
            else
            {
                //return View("Index");
                return HttpNotFound();
            }
        }
        [HttpPost]
        public ActionResult Edit(int Id,Trainer trainer)
        {
            var res = db.Trainers.Find(Id);
            if (res != null)
            {
                res.Id = trainer.Id;
                res.Name = trainer.Name;
                res.TrainingId = trainer.TrainingId;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public ActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Create(Trainer newTrainer)
        {
            if (newTrainer != null)
            {
                db.Trainers.Add(newTrainer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public ActionResult Delete(int Id)
        {
            var res = db.Trainers.Find(Id);
            if (res != null)
            {
                return View(res);
            }
            else
            {
                //return View("Index");
                return HttpNotFound();
            }
        }
        [HttpPost]
        public ActionResult Delete(int Id, Trainer newTrainer)
        {
            var res = db.Trainers.Find(Id);
            if (res != null)
            {
                db.Trainers.Remove(res);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
