using System;


namespace PersonalDetails
{
    public class Personal
    {
        public void PersonalDetails()
        {
            string name;
            int age;
            char gender;
            string college;
            string phone;

            Console.Write("Enter Name");
            name=Console.ReadLine();
            Console.Write("Enter Age");
            age = Convert.ToInt32(Console.ReadLine());
            Console.Write("Enter Gender");
            gender =Convert.ToChar(Console.ReadLine());
            Console.Write("Enter College");
            college = Console.ReadLine();
            Console.Write("Enter phone");
            phone = Console.ReadLine();

            Console.WriteLine("name "+name+"age "+age+" gender "+gender+"college "+college+"phone "+phone);

        }
    }
}
