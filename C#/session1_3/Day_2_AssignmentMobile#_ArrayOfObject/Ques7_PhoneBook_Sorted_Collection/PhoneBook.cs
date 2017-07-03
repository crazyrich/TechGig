using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Ques7_PhoneBook_Collection
{
    class PhoneBook
    {
        public string name;
        public int number;
        static int count = 0;
        /// <summary>
        /// /Sorted list taking integer and OBJECT
        /// </summary>
        /// 

        static public SortedList<int,PhoneBook> phonebook = new SortedList<int,PhoneBook>();

        public void AddEntry(PhoneBook obj)
        {
            count++;
            Console.WriteLine("Enter Name::");
            obj.name = Console.ReadLine();
            Console.WriteLine("Enter Phone#::");
            obj.number = Convert.ToInt32(Console.ReadLine());
            phonebook.Add(count,obj);
           
          
        }
        public void SearchEntry()
        {
            Console.WriteLine("Enter name you want to search");
            string n = Console.ReadLine();
            
            foreach(var i in phonebook)
            {
                Console.Write("   "+i.Value.name);
                Console.Write("   " + i.Value.number);
                Console.WriteLine("    ");
                
            }
        }
        static void Main(string[] args)
        {
            bool flag=true;
            bool flag2 = true;
            while (flag)
            {
                Console.WriteLine("Choose Options Below>>>>");
                Console.WriteLine("1 > Add New Entry");
                Console.WriteLine("2 > Search AN Entry");
                Console.WriteLine("3 > Quit");
                int choice = Convert.ToInt32(Console.ReadLine());
                PhoneBook obj = new PhoneBook();
                switch (choice)
                {
                    case 1:
                        obj.AddEntry(obj);
                        break;
                    case 2:
                        obj.SearchEntry();
                        break;
                    case 3:
                        flag2 = false;
                        flag = false;
                        break;

                }
            
                while(flag2)
                {
                    Console.WriteLine("Want to enter more Names & Numbers? Y/N");
                    char choice1 = Convert.ToChar(Console.ReadLine());
                    if(choice1=='y')
                     {
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
            }

        }
    }
}
