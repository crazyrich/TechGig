  using System;
        using System.Collections.Generic;
        using System.ComponentModel.DataAnnotations.Schema;
        using System.Data.Entity;
        using System.Linq;
        using System.Text;
        using System.Threading.Tasks;

namespace Sale_Day3
{
    class TPH
    {
      

        /////////////---------------------->TPC

                static void Main(string[] args)
                {
                    using (var context = new InheritanceMappingContext())
                    {
                        CreditCard creditCard = new CreditCard()
                        {
                            BillingDetailId = 2,
                            ExpiryMonth = "March",
                            ExpiryYear = "2014",
                            Owner = "krishna",
                            Number = "987654321",
                            CardType = 1
                        };
                        BankAccount bankaccount = new BankAccount()
                        {
                            BankName = "ICICI",
                            BillingDetailId = 12,
                            Owner = "raman",
                            Number = "987654",
                            Swift = "abc"

                        };
                        context.BillingDetails.Add(creditCard);
                        context.BillingDetails.Add(bankaccount);

                        context.SaveChanges();
                        Console.WriteLine("TPC Done ");
                    }
                }

            }
            public abstract class BillingDetail
            {
                [DatabaseGenerated(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None)]

                public int BillingDetailId { get; set; }
                public string Owner { get; set; }
                public string Number { get; set; }
            }

            public class BankAccount : BillingDetail
            {
                public string BankName { get; set; }
                public string Swift { get; set; }
            }

            public class CreditCard : BillingDetail
            {
                public int CardType { get; set; }
                public string ExpiryMonth { get; set; }
                public string ExpiryYear { get; set; }
            }

            public class InheritanceMappingContext : DbContext
            {
                public DbSet<BillingDetail> BillingDetails { get; set; }

                public InheritanceMappingContext()
                    : base("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!")
                {

                }

                protected override void OnModelCreating(DbModelBuilder modelBuilder)
                {


                    modelBuilder.Entity<BankAccount>().Map(m =>
                    {
                        m.MapInheritedProperties();
                        m.ToTable("BankAccounts");
                    });

                    modelBuilder.Entity<CreditCard>().Map(m =>
                    {
                        m.MapInheritedProperties();
                        m.ToTable("CreditCards");
                    });
                }
            }
 }
   


//public class MyConnection : DbContext
//{ 
//    public MyConnection() : base("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!")
//    { }
//    public DbSet<Sale> Sales { set; get; }
//}
//public class Sale
//{
//    public int SaleID { get; set; }
//    public string CustomerName { get; set; }
//    public int SaleAmount { get; set; }
//    public DateTime SaleDate { get; set; }    

//}

///////////////////////////---------------->TPT
//class Program
//{
//    static void Main(string[] args)
//    {
//        using (var context = new InheritanceMappingContext())
//        {
//            CreditCard creditCard = new CreditCard()
//            {
//                BillingDetailId = 2,
//                ExpiryMonth = "March",
//                ExpiryYear = "2014",
//                Owner = "krishna",
//                Number = "987654321",
//                CardType = 1
//            };
//            BankAccount bankaccount = new BankAccount()
//            {
//                BankName = "ICICI",
//                BillingDetailId = 2,
//                Owner = "raman",
//                Number = "987654",
//                Swift = "abc"
//            };
//            context.BillingDetails.Add(creditCard);
//            context.BillingDetails.Add(bankaccount);
//            context.SaveChanges();
//            Console.WriteLine("Done ");
//        }

//    }
//}

//public abstract class BillingDetail
//{
//    public int BillingDetailId { get; set; }
//    public string Owner { get; set; }
//    public string Number { get; set; }
//}

//[System.ComponentModel.DataAnnotations.Schema.Table("BankAccounts")]
//public class BankAccount : BillingDetail
//{
//    public string BankName { get; set; }
//    public string Swift { get; set; }
//}

//[System.ComponentModel.DataAnnotations.Schema.Table("CreditCards")]
//public class CreditCard : BillingDetail
//{
//    public int CardType { get; set; }
//    public string ExpiryMonth { get; set; }
//    public string ExpiryYear { get; set; }
//}


//public class InheritanceMappingContext : DbContext
//{

//    public InheritanceMappingContext()
//        : base("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!")
//    {

//    }
//    public DbSet<BillingDetail> BillingDetails { get; set; }

//}

    //////=----------------------------------------->>>>>>>>>>>TPH
    //     public static void Main(string[] args)
    //    {
    //        using (var context = new InheritanceMappingContext())
    //        {
    //            CreditCard creditCard = new CreditCard()
    //            {
    //                BillingDetailId = 2,
    //                ExpiryMonth = "March",
    //                ExpiryYear = "2014",
    //                Owner = "krishna",
    //                Number = "987654321",
    //                CardType = 1
    //            };
    //            BankAccount bankaccount = new BankAccount()
    //            {
    //                BankName = "ICICI",
    //                BillingDetailId = 12,
    //                Owner = "raman",
    //                Number = "987654",
    //                Swift = "abc"

    //            };
    //            context.BillingDetails.Add(creditCard);
    //            context.BillingDetails.Add(bankaccount);

    //            context.SaveChanges();
    //            Console.WriteLine("TPH Done ");
    //        }
    //    }
    //}

    //public abstract class BillingDetail
    //{
    //    public int BillingDetailId { get; set; }
    //    public string Owner { get; set; }
    //    public string Number { get; set; }
    //}

    //public class BankAccount : BillingDetail
    //{
    //    public string BankName { get; set; }
    //    public string Swift { get; set; }
    //}

    //public class CreditCard : BillingDetail
    //{
    //    public int CardType { get; set; }
    //    public string ExpiryMonth { get; set; }
    //    public string ExpiryYear { get; set; }
    //}

    //public class InheritanceMappingContext : DbContext
    //{
    //    public InheritanceMappingContext()
    //        : base("Data Source=RICHA1\\SQLEXPRESS;Initial Catalog=rich;uid=sa;pwd=info123!")
    //    {

    //    }
    //    public DbSet<BillingDetail> BillingDetails { get; set; }
    //    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    //    {
    //        modelBuilder.Entity<BillingDetail>()
    //                    .Map<BankAccount>(m => m.Requires("BillingDetailType").HasValue("BA"))
    //                    .Map<CreditCard>(m => m.Requires("BillingDetailType").HasValue("CC"));
    //    }
    //}
