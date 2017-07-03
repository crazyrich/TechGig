using System;


namespace M2
{
    class DefaultValues
    {

        string name;
        int age;
        double salary;
        bool married;
        char gender;

       
        public void showdetails()
       {



           Console.WriteLine("string"+name);
           Console.WriteLine("int" + age);
           Console.WriteLine("double" + salary);
           Console.WriteLine("bool" + married);
           Console.WriteLine("char" + gender); 
           Console.ReadLine();
            
        }

        static void Main(string[] args)
        {
            DefaultValues obj1 = new DefaultValues();
            obj1.showdetails();
        }
    }
}
