//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace RestaurantService
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    
    [DataContract]
    public partial class Restaurant
    {
        [DataMember]
        public int Id { get; set; }
        [DataMember]        
        public string Name { get; set; }
        [DataMember]
        public string City { get; set; }
        [DataMember]        
        public string EmailAddress { get; set; }
        [DataMember]
        public string MobileNumber { get; set; }
    }
}
