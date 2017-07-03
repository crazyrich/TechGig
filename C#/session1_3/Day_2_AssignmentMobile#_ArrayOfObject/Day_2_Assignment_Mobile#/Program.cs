using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Day_2_Assignment
{
    class Program
    {
        static ArrayList mobileList; 
        static SortedList<string, ArrayList> list = new SortedList<string, ArrayList>();
        static void Main(string[] args)
        {
            bool flag = true;
            bool flag1 = true;
            bool flag2 = true;
            bool flag3 = true;
            
            while (flag == true)
            {
                Console.WriteLine("Enter the Name of the person:");
                string name = Console.ReadLine();
                flag1 = true;
                mobileList = new ArrayList();
                while (flag1 == true)
                { 
                    Console.WriteLine("Enter the mobile number:");
                    mobileList.Add(Convert.ToInt32(Console.ReadLine()));
                    while (flag2 == true)
                    {
                        Console.WriteLine("Want to enter Another mobile number also? Y/N");
                        char result = Convert.ToChar(Console.ReadLine());
                        if (result == 'y')
                        {
                            break;
                        }
                        else if (result == 'n')
                        {
                            flag1 = false;
                            break;
                        }
                        else
                        {
                            Console.WriteLine("Choose Valid Number!");
                            continue;
                        }
                     }
                }
                list.Add(name,mobileList);
              
                    while (flag3==true)
                    {
                        Console.WriteLine("Do you want to enter Another person? Y/N");
                        char result2 = Convert.ToChar(Console.ReadLine());
                        if (result2 == 'y')
                        {
                            //flag1 = false;
                            break;
                        }
                        if (result2 == 'n')
                        {
                            flag = false;
                            break;
                        }
                        else
                        {
                            Console.WriteLine("CHoose Valid Option!");
                            continue;
                        }
                     }
                    
             }
            //Print the list
            foreach (var i in list)
            {
                Console.WriteLine(i.Key + " ");
                ArrayList al = i.Value;
                foreach (var j in al)
                {
                    Console.WriteLine(j + " ");
                }

            }
            //printing ends
           
            

        }
    }
}
