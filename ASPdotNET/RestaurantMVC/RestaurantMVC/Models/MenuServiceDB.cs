using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMVC.Models
{
    public class MenuServiceDB
    {
        public int Id { get; set; }
        public string itemName{get;set;}
        public int itemPrepTime{set;get;}
        public int itemPrice { set; get; }
    }
}