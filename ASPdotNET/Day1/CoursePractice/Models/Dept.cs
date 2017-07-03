using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CoursePractice.Models
{
    public class Dept
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public int CourseId { set; get; }
    }
}