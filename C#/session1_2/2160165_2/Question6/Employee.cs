using System;

namespace Question6
{
    class Employee
    {
        string Name;
        int Id;
        string JoiningDate;

        void PrintDetails()
        {
            bool value = false;

            Console.WriteLine("Enter Name");
            Name = Console.ReadLine();
            Console.WriteLine("Enter Id");
            Id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter JoiningDate as DD/MM/YYYY");
            while (value == false)
            {
                Console.WriteLine("Day OF month");
                int day = Convert.ToInt32(Console.ReadLine());
                Console.Write("Month");
                int month = Convert.ToInt32(Console.ReadLine());
                Console.Write("Year");
                int year = Convert.ToInt32(Console.ReadLine());
                //validate

                if (day<1 || day > 31)
                {
                    Console.WriteLine("Enter A Valid Day");
                    continue;
                }

                if ((month == 04 || month == 06 || month == 09 || month == 11) && day == 31)
                {
                    Console.WriteLine("InVALID");
                    continue;
                }
                else if (month == 02)
                {
                    if (day > 29)
                    {
                        Console.WriteLine("InVALID");
                        continue;
                    }
                    else if (day == 28 && (year % 4 == 0))
                    {
                        Console.WriteLine("InVALID");
                        continue;
                    }
                    else if (day == 29 && (year % 4 != 0))
                    {
                        Console.WriteLine("InVALID");
                        continue;
                    }
                    else if (month <= 0)
                    {
                        Console.WriteLine("InVALID");
                        continue;
                    }
                    else
                        break;
                }
                else if (month <= 0 || month > 12)
                {
                    Console.WriteLine("InVALID");
                    continue;
                }
                else
                {
                    value = true;
                    
                }
                JoiningDate = Convert.ToString(day) + "-" + Convert.ToString(month) + "-" + Convert.ToString(year);
             }
            }

        static void Main(string[] args)
        {
            Employee obj = new Employee();
            obj.PrintDetails();
            Console.WriteLine("Name is {0} Id is {1} JoiningDate is {2}",obj.Name,obj.Id,obj.JoiningDate);
        }
    }
}
