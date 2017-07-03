using System;


namespace Question6
{
    class Program
    {
        
        static void Main(string[] args)
        {
            int num = 0;
            int choice;
      
            Console.WriteLine("Enter a number");
            num= Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter 1 for square 2 for cube 3 for table");
            choice=Convert.ToInt32(Console.ReadLine());
            switch (choice) {
                case 1:
                    Console.WriteLine("Square of "+num +"  is" +num*num);
                    break;
                case 2:
                    Console.WriteLine("Cube of " + num + "  is" + num *num*num);
                    break;
                case 3:
                    Console.WriteLine("Table of " + num + "  is");
                    Console.WriteLine(num*1);
                    Console.WriteLine(num * 1);
                    Console.WriteLine(num * 2);
                    Console.WriteLine(num * 3);
                    Console.WriteLine(num * 4);
                    Console.WriteLine(num * 5);
                    Console.WriteLine(num * 6);
                    Console.WriteLine(num * 7);
                    Console.WriteLine(num * 8);
                    Console.WriteLine(num * 9);
                    Console.WriteLine(num * 10);
                    break;
                default:
                    Console.WriteLine("BE IN LIMITS!");
                    break;
                    
            }

        }
    }
}
