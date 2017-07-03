

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
 
namespace demos2
{
    class itemnotfoundException : Exception
    {
        public string message
        {
            get
            {
                return ("item not found");
            }
        }
    }
    public enum offerDays { monday,tuesday,wednesday,thursday,friday,saturday,sunday};
    public abstract class Offer
    {
        public int offerId;
        public string offerType, offerName;
        public string offerExpiry;
        public offerDays t;
        public Offer(int id,string type,string name,string expiry)
       {
           offerId = id;
           offerType = type;
           offerName = name;
           offerExpiry = expiry;
          
         
        }
    }
    public class regularoffer : Offer
    {
        public int extrameal;
        public float discount;
        public regularoffer():base(132,"abc","xyz","12-oct")
        {
            extrameal = 0;
            discount = 0;
        }
    }
    public class corpoffer : Offer
    {
        public int vouchercost;
        public corpoffer(): base(111,"qwe","uio","qwer")
        {
            vouchercost = 0;
        }
    }
    interface Irestaurant
    {
        void Showmenu();
        void Takeorder(int custid);
        void checkstatus(int orderid);
        void Showregcusomeroffer(int custid);
        void Corpcustomeroffer(int corpid);
 
 
    }
    public abstract class Customer
    {
        public int customerId;
        public string  custName, custDOB, custadd, custType;
       public  double custmobile;
       public Customer(int id, string name, string dob,  string add, string type,double phone)
       {
           customerId = id;
           custName = name;
           custDOB = dob;
           custadd = add;
           custType = type;
           custmobile = phone;
       }
    }
    public class Regularcust : Customer
    {
        public int custpoints;
        public Regularcust(int id, string name, string dob, string add, string type, double phone,int custpts)
            : base(id,name,dob,add,type,phone)
        {
            custpoints = custpts;
        }
        public void redeempoints(int points)
        {
        }
        public void checkpoint()
        {
        }
    }
    public class Corpcust : Customer
    {
        public int regno;
        public float discount;
        public Corpcust(int id,string name,string dob, string add, string type, double phone,int rno,float dis)
            : base(id,name,dob, add,type,phone)
        {
            regno = rno;
            discount = dis;
        }
        public void calcdiscount(int amt)
        {
        }
    }
    class Item
    {
        public int itemid;
         public string itemname;
        public int preptime;
        public Item(int id,string name,int time)
        {
            itemid = id;
            itemname = name;
            preptime = time;
 
        }
        public Item()
        {
            itemname = " ";
            itemid = 0;
            preptime = 0;
 
        }
 
    }
    class Order
    {
         public int orderid;
          public string  orderdate;
        public int custid;
        public Item[] ordercart;
        public Order()
        { Random r=new Random();
        orderid = r.Next(20, 100);
        orderdate = DateTime.Now.ToString("dd/mm/yy");
         ordercart=new Item[10];
         for (int i = 0; i < 10; i++)
         {
             ordercart[i] = new Item();
         }
 
 
        }
    }
    class Menu
    {
      public  static Item[] menu = new Item[3];
        static Menu()
        {
            menu[0] = new Item(12, "lemon chicken", 120);
            menu[1] = new Item(23, "Double egg roll", 40);
            menu[2] = new Item(17, "pizza", 30);
        }
    }
 
    class Restaurant:Irestaurant
    { public static Queue<Order> z=new Queue<Order>();
    public Customer[] custlist = { new Regularcust(12, "sherlock", "06-12-1990", "221b", "regular", 123456, 100), 
                                     new Corpcust(13, "watson", "06-10-1992", "221b", "corp", 654321, 10, 12f), 
                                     new Corpcust(15, "azura", "12-10-1986", "123r", "corp", 65432122, 120, 16f) };
    public Offer[] offerlist = {new regularoffer(),new corpoffer(),new regularoffer()};
        
        public void Showmenu()
    {
        int z = 0;
            
           foreach (var item in Menu.menu)
           {
               
                Console.WriteLine(z+" "+item.itemid+" "+item.itemname);
                z++;
            }
        }
        public void Takeorder(int custid)
        { int n,i=0,ch,r=0;
            Menu m = new Menu();
            Order o = new Order();
            try
            {
                do
                {
 
                    Console.WriteLine("enter item to be ordered");
                    n = Convert.ToInt32(Console.ReadLine());
                    if (n >= 3)
                        throw new itemnotfoundException();
                    else
                        o.ordercart[i] = Menu.menu[n];
 
                    i++;
                    Console.WriteLine("do you wish to buy more items press 1-continue 0-exit");
                    ch = Convert.ToInt32(Console.ReadLine());
 
                } while (ch != 0);
                z.Enqueue(o);
 
                Console.WriteLine("u have bought these items with id " + o.orderid + "on date " + o.orderdate);
                for (int l = 0; l < i; l++)
                {
                    Console.WriteLine("order are " + o.ordercart[l].itemname);
                    r += o.ordercart[l].preptime;
 
                }
                Console.WriteLine("the total preperation time will be " + r);
                foreach (var item in custlist)
                {
                    if (item.customerId == custid)
                    {
                        if (item.custType == "regualar")
                        {
                            Showregcusomeroffer(custid);
                            break;
                        }
                        else
                        {
                            Corpcustomeroffer(custid);
                            break;
                        }
                    }
                }
            }
            catch (itemnotfoundException e)
            {
                Console.WriteLine(e.message);
            }
        }
        public void checkstatus(int orderid)
        { int flag=0;
            
            foreach (var item in z)
            {
                if (item.orderid == orderid)
                { flag++;
                    Console.WriteLine("order is still in queue");
                  
                    break;
                }
            }
               if(flag==0)
                    Console.WriteLine("ready to serve");
            
        }
        public void Showregcusomeroffer(int custid)
        {
            int purchase;
            regularoffer r = new regularoffer();
            
            Console.WriteLine("enter purchase");
            purchase = Convert.ToInt32(Console.ReadLine());
            if ((DateTime.Now.DayOfWeek.Equals(offerDays.saturday) || DateTime.Now.DayOfWeek.Equals(offerDays.sunday)) && purchase > 1000)
            {
                r.discount = 10;
            }
 
            else
            {
                Console.WriteLine("u get a pizza");
            }
        }
        public void Corpcustomeroffer(int corpid)
        {
            Console.WriteLine("on the purchase of 1000 u get a meal voucher of 1000");
        }
 
    }
    class Samriti
    {
        static void Main(string[] args)
        {
            int n,ch,x;
            Restaurant res = new Restaurant();
            Console.WriteLine("enter choice 1-menu 2-order item 3-check status");
            ch = Convert.ToInt32(Console.ReadLine());
            do
            {
                switch (ch)
                {
                    case 1: res.Showmenu(); break;
                    case 2:
                        x = Convert.ToInt32(Console.ReadLine());
                        res.Takeorder(x); break;
                    case 3: n = Convert.ToInt32(Console.ReadLine());
                        res.checkstatus(n);
                        break;
                }
                Console.WriteLine("enter choice 1-menu 2-order item 3-check status");
                ch = Convert.ToInt32(Console.ReadLine());
            } while (ch != 0);
                Console.ReadLine();
        }
    }
}