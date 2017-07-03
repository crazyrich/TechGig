using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace RestaurantMVC.Models
{
    public class DbChild :DbContext
    {
        public DbChild()
            : base("Data Source=RICHA1\\SQLEXPRESS;database=MVC2;uid=sa;pwd=info123!")
        {

        }
       // public DbSet<MenuService> MenuServices { get; set; }
        public DbSet<MenuServiceDB> MenuServicedb { get; set; }
        public DbSet<Order> orders { get; set; }

    }
}