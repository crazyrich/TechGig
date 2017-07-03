
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace IRestaurant_Customer
{
    #region EXCEPTION
    class ItemNotFound : Exception
    {
        public string Message
        {
            get
            {
                Console.WriteLine("Item NOT FOUND !");
                return "messag::";
            }
        }
    }

    #endregion
    interface IRestaurant
    { 
             void ShowMenu();
             void TakeOrder();
             void CheckStatus();
             void ShowRegularCustomerOffer(int custID);
             void ShowCorpCustomerOffer(int custID);
    }
    #region ITEM CLASS
    class Item
    {
        public int itemID;
        public string itemName;
        public int prepTime;

        public Item(int itemID,string itemName,int prepTime)
        {
            this.itemID= itemID;
            this.itemName =itemName;
            this.prepTime= prepTime;
        }
    
    }
    #endregion


    #region Menu Class
    class Menu
    { 
       public static Item[] itemMenu=new Item[3];
        static Menu()
        {
            itemMenu[0] = new Item(1001, "Chicken Tikka", 3);
            itemMenu[1] = new Item(1002, "Chicken Lazania", 2);
            itemMenu[2] = new Item(1003, "Cheese Turkey", 1);
                   
        }
    
    }

    #endregion

    #region Order class

    class Order
    {
       public  int orderId=100;
        public DateTime orderDate;
        public  List<Item> orderCart=new List<Item>();

        public int customerID;
        public Order()
        {
            orderId++;
            this. orderDate=DateTime.Now; 
        
        }

    
    }
    #endregion

    class Resturant:IRestaurant
    {
       public  Customer[] custList=new Customer[2];
       public List<Offer> offerList = new List<Offer>();
      
        #region ShowMenu
        public void ShowMenu()
        {
            Menu obj = new Menu();
            for (int i=0;i<3;i++)
            {
                Console.WriteLine(i+1+"  "+Menu.itemMenu[i].itemName+" ");
            }
        }

        #endregion

        #region ShowRegularOffer
        public void ShowRegularCustomerOffer(int custID)
        { }
       
        #endregion

        #region ShowCorpOffer
        public void ShowCorpCustomerOffer(int custID)
        { }
         #endregion

        #region TakeOrder
         public void TakeOrder()
        {

             Order obj = new Order();
            bool flag=true;
            bool flag2 = true;
            while (flag)
            {
                try
                {
                    Console.WriteLine("Enter the item No.  ::::::");
                    int choice = Convert.ToInt32(Console.ReadLine());
                    switch (choice)
                    {
                        case 1:
                            Item item1 = new Item(1001, "Chicken Tikka", 3);
                            obj.orderCart.Add(item1);
                            break;
                        case 2:
                            Item item2 = new Item(1002, "Chicken Lazania", 2);
                            obj.orderCart.Add(item2);
                            break;
                        case 3:
                            Item item3 = new Item(1003, "Cheese Turkey", 1);
                            obj.orderCart.Add(item3);
                            break;
                        default:
                            throw new ItemNotFound();
                    }
                }
                catch(ItemNotFound e)
                {
                    Console.WriteLine( "WARNING::::");
                    Console.WriteLine(e.Message);
                }
                #region Continue Or Not
                while (flag2)
                {
                    try
                    {
                        Console.WriteLine("Want To Add More Items? Y/N");
                        int choice2 = Convert.ToChar(Console.ReadLine());
                        if (choice2 == 'y')
                        {
                            break;
                        }
                        if (choice2 == 'n')
                        {
                            flag = false;
                            break;
                        }
                        else
                        {
                            Console.WriteLine("Chosse Valid Option!!");
                            continue;

                        }
                    }
                    catch (FormatException e)
                    {
                        Console.WriteLine("  Warning::: ");
                        Console.WriteLine(e.Message);

                    }
                }
                #endregion

            }
            foreach(var i in obj.orderCart)
            {
                Console.WriteLine(i.itemName+"  ");

            }
            #region Customer In TakeOrder
            Console.WriteLine("Enter CustomerID::::");
            int customerID = Convert.ToInt32(Console.ReadLine());
            foreach(var i in custList)
            {
                if (i.customerID==customerID)
                { 
                    if(i.custType=="Regular")
                    {
                        ShowRegularCustomerOffer(customerID);
                    }
                    else if (i.custType == "Corporate")
                    {
                        ShowCorpCustomerOffer(customerID);
                    }
                }
            }
            #endregion


        }
        #endregion

        #region CheckStatus
        public void CheckStatus()
        {
           
        }

        #endregion

        #region DISPLAY
        public void DisplayMenu()
        {
            bool flag = true;
            bool flag2 = true;
            int customerID;
            try
            {
                while (flag)
                {
                    Console.WriteLine("Choose :::::");
                    Console.WriteLine(" 1:: ShowMenu");
                    Console.WriteLine(" 2:: TakeOrder");
                    Console.WriteLine(" 3:: CheckStatus");
                    int choice = Convert.ToInt32(Console.ReadLine());
                    switch (choice)
                    {
                        case 1:
                            ShowMenu();
                            break;
                        case 2:
                            TakeOrder();
                            break;
                        case 3:
                            CheckStatus();
                            break;
                        case 4:
                            customerID=Convert.ToInt32(Console.ReadLine());
                            ShowRegularCustomerOffer(customerID);
                            break;
                        case 5:
                            customerID = Convert.ToInt32(Console.ReadLine());
                            ShowCorpCustomerOffer(customerID);
                            break;
                        default:
                            Console.WriteLine("Invalid Option!");
                            break;

                    }
                    #region Continue Or Not
                    while (flag2)
                    {
                        try
                        {
                            Console.WriteLine("Do You Want To Continue? Y/N");
                            int choice2 = Convert.ToChar(Console.ReadLine());
                            if (choice2 == 'y')
                            {
                                break;
                            }
                            if (choice2 == 'n')
                            {
                                flag = false;
                                break;
                            }
                            else
                            {
                                Console.WriteLine("Chosse Valid OPtion!!");
                                continue;

                            }
                        }
                        catch (FormatException e)
                        {
                            Console.WriteLine("  Warning::: ");
                            Console.WriteLine(e.Message);

                        }
                    }
                    #endregion


                }
            }catch(FormatException e)
            {
                Console.WriteLine("Warning::::");
                Console.WriteLine(e.Message);
            }

        }
        #endregion
    }

    #region Offer Class

    public enum Days { sun, mon, tues, wed, thurs, fri, sat };
    abstract class Offer
    {
        int offerID;
        string offerType;
        string offerName;
        DateTime offerExpiry;

    }

    class RegularOffer : Offer
    {
        float discount;
        int extraMeal;
       
    }
    class CorporateOffer : Offer
    {
        int voucherCost;
    }

    #endregion


    #region Customer class
    public abstract class Customer
    {
        public int customerID;
        public string custName;
        public DateTime custDOB;
        public int custMobile;
        public string custType;
        public string address;
        public Customer( int customerID,string custName,DateTime custDOB,int custMobile, string custType,string address)
        {
            this.customerID= customerID;
            this.custName=custName;
            this.custDOB= custDOB;
            this.custMobile= custMobile;
            this.custType=custType;
            this.address= address;
        }
    
    }

    class RegularCustomer : Customer
    {
        int customerPoints;
        public RegularCustomer(int customerID, string custName, DateTime custDOB, int custMobile, string custType, string address,int customerPoints) :base(customerID,custName,custDOB,custMobile,custType,address)
        {
            this.customerPoints = customerPoints;
        }
       
        public void RedeemPoints()
        { }
        public void CheckPoints()
        { }
    
    }

    class CorporateCustomer : Customer
    {
        int regNo;
        float discountPercent;

         public CorporateCustomer(int customerID, string custName, DateTime custDOB, int custMobile, string custType, string address,int customerPoints,int regNo,float discountPercent) :base(customerID,custName,custDOB,custMobile,custType,address)
        {
            this.regNo=regNo;
            this.discountPercent= discountPercent;

        }

        public void CalcDiscount(int totalAmount)
        { }
    
    }

  #endregion

    #region MAIN Class
    class Program
    {
        static void Main(string[] args)
        {
            Resturant obj=new Resturant();
            obj.DisplayMenu();
        }
    }
   #endregion

}

