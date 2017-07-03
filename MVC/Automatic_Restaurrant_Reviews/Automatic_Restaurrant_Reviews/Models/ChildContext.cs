using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Automatic_Restaurrant_Reviews.Models
{
    public class ChildContext : DbContext
    {
        public ChildContext() :base("Data Source=RICHA1\\SQLEXPRESS;uid=sa;pwd=info@123!;Initial Catalog=rich2")
        {

        }
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Review> Reviews { get; set; }

    }
}