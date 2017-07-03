using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CoursePractice.Models
{
    public class DbChild : DbContext
    {
        public DbChild()
            : base("Data Source=RICHA1\\SQLEXPRESS;database=CoursePractices;uid=sa;pwd=info123!")
        {

        }
        public DbSet<Course> Courses { get; set; }

        public DbSet<Dept> Dept { get; set; }
    }
}