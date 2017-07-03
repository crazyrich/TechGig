using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestaurantMVC.Models
{
    public class Order
    {
       
            public int Id{get;set;}
            public string orderDate { get; set; }
            public List<MenuServiceDB> orderCart { get; set; }
            public Order()
            {
                orderDate = DateTime.Now.ToString();
               
            }
        
    }
}