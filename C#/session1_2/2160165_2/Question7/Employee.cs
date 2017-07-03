using System;


namespace Question7
{
    class Employee
    {
        string name;
        char gender;
       // string designation;
        int experience=3;
       // int salary;
        string status="Active";
        string[] array;
       
        public void Employee1(string name, char gender, string [] array)
        {
             array =new string [4];

            this.name = name;
            this.gender = gender;
       
            //foreach(var i in array)
            //{
             
                if(array[0]=="Fresher")
                {
                   array[1] = "ASE";
                   array[2]="10000";
                }
                else if (array[0] == "Experienced")
                {
                    Console.WriteLine("Enter Your Experience As Well-->");
                   // experience = Convert.ToInt32(Console.ReadLine());
                    if (experience == 3)
                    {
                      array[1] = "ITA";
                      array[2] = "15000";

                    }
                    else
                    {
                        array[1] = "ASE";
                        array[2] = "10000";
                    }
                }
                else
                {
                    Console.WriteLine(" ");
                }
                
            //}
            Console.WriteLine(name + " " + gender+" "+status);
            foreach (var i in array)
            {
                Console.WriteLine(i + " ");
            }
        
        }
       
        static void Main(string[] args)
        {
            Employee obj1 = new Employee();
            obj1.Employee1("Ram", 'F', "Fresher");
            
        }
    }
}
