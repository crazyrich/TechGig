using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Day1.Models
{
    public class Trainer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TrainingId { get; set; }
        public string specification { get; set; }
    }
}