using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace Salary_Profile_Service
{
    [DataContract]
    public class MyException
    {
        [DataMember]
        public string Msg{get;set;}
        [DataMember]
        public string StackTrace{get;set;}
        [DataMember]
        public int LineNumber { get; set; }
    }
}