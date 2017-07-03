using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Day1.Models
{
    public class TrainingAppContext:DbContext
    {
        public TrainingAppContext() : base("Data Source=RICHA1\\SQLEXPRESS;database=TrainingApp;uid=sa;pwd=info123!")
        {

        }
        public DbSet<Trainer> Trainers { get; set; }
        public DbSet<Training> Trainings { get; set; }
    }
}