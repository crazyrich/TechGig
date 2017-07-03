using System;
using System.Collections.Generic;
using System.Data.Linq.Mapping;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LINQ1
{
    [Table(Name="Product")]
    class Product
    {
        private string productID;
        private string name;
        private string supplier;
        private string brand;
   
       
        [Column(Storage = "productID", Name = "productID", IsPrimaryKey = true)]
        public string ProductID
        {
            set
            {
                productID = value;
            }
            get
            {
                return productID;
            }
        }
        [Column(Storage="name",Name="name")]
        public string NAME
        {
            set
            {
                name = value;
            }
            get
            {
                return name;
            }
        }
        [Column(Storage = "supplier", Name = "supplier")]

        public string SUPPLIER
        {
            set
            {
                supplier = value;
            }
            get
            {
                return supplier;
            }
        }
        [Column(Storage = "brand", Name = "brand")]

        public string BRAND
        {
            set
            {
                brand = value;
            }
            get
            {
                return brand;
            }
        }
       
      
      
    }
}
