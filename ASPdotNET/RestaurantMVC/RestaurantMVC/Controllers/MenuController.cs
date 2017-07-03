using RestaurantMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace RestaurantMVC.Controllers
{
    public class MenuController : Controller
    {
        //
        // GET: /Menu/
        DbChild db = new DbChild();
        //MenuServiceDB msdb = new MenuServiceDB();
        #region Show Menu
        public ActionResult Index()
        {
            var res = db.MenuServicedb.ToList();
            return View(res);
        }
      
        public ActionResult Details(int Id)
        {
            var res=db.MenuServicedb.Find(Id);
            if(res!=null)
            {
                return View(res);
            }
            else
            {
                return View();
            }
            
        }
        [HttpGet]
        public ActionResult Edit(int Id)
        {
            var res = db.MenuServicedb.Find(Id);
            if (res != null)
            {
                return View(res);
            }
            else
            {
                return HttpNotFound();
            }
        }
        [HttpPost]
        public ActionResult Edit(int Id,MenuServiceDB menuServicedb)
        { 
            var res = db.MenuServicedb.Find(Id);
            if (res != null)
            {
                res.Id = menuServicedb.Id;
                res.itemName = menuServicedb.itemName;
                res.itemPrepTime = menuServicedb.itemPrepTime;
                res.itemPrice = menuServicedb.itemPrice;
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
        public ActionResult Create(MenuServiceDB menuService)
        {
            if (menuService != null)
            {
                db.MenuServicedb.Add(menuService);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
        #endregion

        #region TakeOrder

        public ActionResult TakeOrder()
        {
            Order order = new Order();
            ViewBag.xyz = new SelectList(db.MenuServicedb,"Id","itemName");
            return View(order);
        }





        #endregion

    }
}
























////Edit-------------->
//bool flag = false;
//            var res = new Item();

//            for (int i = 0; i < 3; i++)
//            {
//                if (Id == MenuService.itemMenu[i].itemID)
//                {
//                    res = MenuService.itemMenu[i];
//                    flag = true;
//                    break;
//                }
//                else
//                {
//                    continue;
//                }
//            }
//            if (flag == true)
//            {
//                return View(res);
//            }
//            else
//            {
//                return View();
//            }
//[POST]

//bool flag = false;
//            var res = new Item();

//            for (int i = 0; i < 3; i++)
//            {
//                if (Id == MenuService.itemMenu[i].itemID)
//                {
//                    res = MenuService.itemMenu[i];
//                    flag = true;
//                    break;
//                }
//                else
//                {
//                    continue;
//                }
//            }
//            if (flag == true)
//            {
//                res.itemID = MenuService.itemMenu[i].itemID;
//                res.Id = trainer.Id;
//                res.Name = trainer.Name;
//                res.TrainingId = trainer.TrainingId;
//                db.SaveChanges();
//                return RedirectToAction("Index");
//            }
//            else
//            {
//                return View();
//            }