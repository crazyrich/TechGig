using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMVC.Models
{
    public class MenuService
    {


        public static List<Item> itemMenu = new List<Item>
            {
                new Item { itemID=1001,itemName="Khichdi",itemPrepTime=2,itemPrice=30},
                new Item{ itemID = 1002, itemName = "Butter Chicken", itemPrepTime = 2, itemPrice = 130 },
                new Item{ itemID = 1003, itemName = "Chilli Chicken", itemPrepTime = 2, itemPrice = 100 },
               
            };
          

    }
}