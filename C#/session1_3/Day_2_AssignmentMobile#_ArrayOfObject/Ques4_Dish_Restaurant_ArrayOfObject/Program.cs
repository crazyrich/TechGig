using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ques4_Dish_Restaurant
{
    interface IRestaurant
    {
        Dish getDish(int dishId);
    }
    public class Dish
    {
        public int dishId;
        public string dishName;
        public int dishPrice;
        public int dishMakeTime;

    }

    class Restaurant:IRestaurant
    {
        static Dish[] menu = new Dish[3];
        static Restaurant()
        {
            menu[0] = new Dish();
            Dish m1 = menu[0];
            menu[0].dishId = 1001;
            menu[0].dishName = "Chicken";
            menu[0].dishPrice = 110;
            menu[0].dishMakeTime = 1;

            menu[1] = new Dish();
            Dish m2 = menu[1];
            menu[1].dishId = 1002;
            menu[1].dishName = "Butter Chicken ";
            menu[1].dishPrice = 140;
            menu[1].dishMakeTime = 2;

            menu[2] = new Dish();
            Dish m3 = menu[2];
            menu[2].dishId = 1003;
            menu[2].dishName = "Chilli Chicken";
            menu[2].dishPrice = 120;
            menu[2].dishMakeTime = 1;
        }

       public  Dish getDish(int dishId){
            
            Dish d=new Dish();
            for (int i = 0; i < 3;i++ )
            {
                if(menu[i].dishId==dishId)
                {
                    Console.WriteLine(" "+menu[i].dishId+" "+menu[i].dishName+" "+menu[i].dishPrice+" "+menu[i].dishMakeTime);
                     d = menu[i];
                }
            }
            return d;
         }
    
    }
    class Program
    {
        static void Main(string[] args)
        {
            Restaurant obj = new Restaurant();
            Dish d=obj.getDish(1001);
            Console.WriteLine(" " + d.dishId + " " + d.dishName + " " + d.dishPrice + " " + d.dishMakeTime);
                    

        }
    }
}
