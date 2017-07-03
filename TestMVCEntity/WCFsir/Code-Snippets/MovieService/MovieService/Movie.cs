using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace MovieService
{
    [DataContract]
   public class Movie
    {
        [DataMember]
        public int Id{ get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string Releasedate { get; set; }
    }
}
