using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMVC.Models
{
    public class Item
    {
        public int itemID { get; set; }
        public string itemName { get; set; }
        public int itemPrepTime { get; set; }
        public int itemPrice { get; set; }
    }
}