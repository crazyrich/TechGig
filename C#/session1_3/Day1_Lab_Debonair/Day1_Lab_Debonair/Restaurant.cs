using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Day1_Lab_Debonair
{
   #region ITEM
    class Item
    {
       public int itemID;
       public  string itemName;
       public   int itemPrepTime;
    }
   #endregion


    #region MENU
    class Menu
    { 
       public static Item [] itemMenu;
    
        static Menu()
        {
            itemMenu = new Item[5];
            #region MENU_ITEM_1
            itemMenu[0] = new Item();
            itemMenu[0].itemID = 1001;
            itemMenu[0].itemName = "Dal Makhani";
            itemMenu[0].itemPrepTime = 10;
           #endregion
            #region MENU_ITEM_2
            itemMenu[1] = new Item();
            itemMenu[1].itemID = 1002;
            itemMenu[1].itemName = "Butter Chicken";
            itemMenu[1].itemPrepTime =21;
            #endregion
            #region MENU_ITEM_3
            itemMenu[2] = new Item();
            itemMenu[2].itemID = 1003;
            itemMenu[2].itemName = "Fish Curry";
            itemMenu[2].itemPrepTime = 31;
            #endregion
        }
     }

    #endregion


    #region ORDER
    class Order
    {
       public static  int orderID=100;
        public DateTime orderDate;
        public Item[] orderCart;
        public static int count = 100;
       
       public Order()
        {
            count++;
           ++orderID;
            orderDate = DateTime.Now;
            orderCart = new Item[3];
        }

       public void GetValues(int id)
       {
           if (id == 1001)
           { 
           
           }
       }
    }

    #endregion


    #region RESTAURANT
    class Restaurant
    {
        public static SortedList<int, Order> list;
        Queue orders = new Queue();
        #region SHOW MENU
        public void ShowMenu()
        {
            Menu obj = new Menu();
            Console.WriteLine("ITEMS ARE::::");
            Console.WriteLine(" 1 " + Menu.itemMenu[0].itemName);
            Console.WriteLine(" 2 " + Menu.itemMenu[1].itemName);
                Console.WriteLine(" 3 " + Menu.itemMenu[2].itemName);
        }
        #endregion

        #region TAKE ORDER
        public void takeOrder()
        {
         
            bool flag = true;
            int counter=0;
            list=new SortedList<int,Order>();
             Order order = new Order();
            while(flag)
            {
                
                int choice=Convert.ToInt32(Console.ReadLine());
               
              
                order.orderCart[counter]=new Item();

                if (choice == 1)
                {
                    order.orderCart[counter].itemID = 1001;
                    order.orderCart[counter].itemName = "Dal Makhani";
                    order.orderCart[counter].itemPrepTime=10 ;
                }
                else if (choice == 2)
                {
                    order.orderCart[counter].itemID = 1002;
                    order.orderCart[counter].itemName = "Butter Chicken";
                    order.orderCart[counter].itemPrepTime = 20;
                }
                else if (choice == 3)
                {
                    order.orderCart[counter].itemID = 1003;
                    order.orderCart[counter].itemName = "Fish Curry";
                    order.orderCart[counter].itemPrepTime =30;
                }
                else
                {
                    Console.Write("Choose Valid option!!");
                    continue;
                }
                
                while(true)
                {
                  Console.WriteLine("Do You Want To Continue? Y/N");
                  char choice1=Convert.ToChar(Console.ReadLine());
                  if(choice1=='y')
                  {
                      Console.WriteLine("Choose Your Next Item");
                      break;
                  }
                  else if (choice1 == 'n')
                  {
                     flag = false;
                     break;
                  }
                  else
                  {
                    Console.WriteLine("Choose Valid Option!");
                    continue;
                   }
                 }
                counter++;
            
             }
            Random random = new Random();
            int rand=random.Next(100,999);
            list.Add(rand,order);
            orders.Enqueue(order);
            Console.WriteLine("OrderID>"+Order.orderID);
            Console.WriteLine("Your Cart Has >>>");

            for (int i = 0; i < 3; i++)
            {
                Console.WriteLine(" itemID>" + order.orderCart[i].itemID + "  " + order.orderCart[i].itemName + "   " + order.orderCart[i].itemPrepTime);
            }
            foreach (var i in list)
            { //Console.WriteLine(i.Key + " ");
                 foreach (var j in i.Value.orderCart)
                {
                    Console.WriteLine(j.itemName + " ");
                }
            }
            int sum=0;
            for (int i = 0; i < 3; i++)
            {
                sum=sum+((Order)orders.Peek()).orderCart[i].itemPrepTime ;
              
            }
            Console.WriteLine("Actual Preptaion time is  " + sum);
         }

        #endregion

        #region CHECKSTATUS
        public void CheckStatus()
        {
           // Console.WriteLine("Enter orderID To CheckStatus>>");
           ///int id= Convert.ToInt32(Console.ReadLine());
           
           bool containsId=orders.Contains(Order.orderID);
            if(containsId==true)
            {
                Console.WriteLine("Still In Queue!!");  
            }
            else if (containsId == false)
            {
                Console.WriteLine("Ready To Serve");
            }
           
        }
        #endregion

        static void Main(string[] args)
        {
            Restaurant obj = new Restaurant();
             obj.ShowMenu();
             obj.takeOrder();
             obj.CheckStatus();
        }
    }
   #endregion
}
