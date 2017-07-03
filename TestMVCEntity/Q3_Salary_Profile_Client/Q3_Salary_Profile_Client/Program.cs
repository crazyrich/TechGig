using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Q3_Salary_Profile_Client.ServiceReference1;
using System.ServiceModel;

namespace Q3_Salary_Profile_Client
{

    class Program
    {
        SalaryClient client1 = new SalaryClient("WS2007HttpBinding_ISalary");
        ProfileClient client2 = new ProfileClient("BasicHttpBinding_IProfile");

        static void Main(string[] args)
        {
            try
            {

                Program obj = new Program();
                bool flag = true;
                while (flag)
                {
                    Console.WriteLine("1 ---- Get Salary By Id");
                    Console.WriteLine("2 ---- Edit Salary");
                    Console.WriteLine("3 ---- Get All Profiles");
                    Console.WriteLine("4 ---- Get Profile By Id ");
                    Console.WriteLine("5 ---- Delete Profile");
                    Console.WriteLine("6 ---- Add New Profile");
                    int choice = Convert.ToInt32(Console.ReadLine());
                    switch (choice)
                    {
                        case 1:
                            obj.GetSalaryById();
                            break;

                        case 2:
                            obj.EditSalary();
                            break;

                        case 3:
                            obj.GetAllProfiles();
                            break;

                        case 4:
                            obj.GetProfileById();
                            break;
                        case 5:
                            obj.DeleteProfile();
                            break;
                        case 6:
                            obj.DeleteProfile();
                            break;
                        default:
                            Console.Write("Choose Valid Option");
                            break;
                    }
                    bool flag2 = true;
                    while (flag2)
                    {
                        Console.WriteLine("DO YOU WANT TO CONTINUE? y/n");
                        char choice2 = Convert.ToChar(Console.ReadLine());
                        if (choice2 == 'y')
                        {
                            break;
                        }
                        else if (choice2 == 'n')
                        {
                            flag = false;
                            break;
                        }
                        else
                        {
                            Console.WriteLine("Choose VAlid Option!!");
                            continue;
                        }
                    }
                }
            }
            catch (Exception exc)
            {
                Console.WriteLine(exc.Message + "  ");
            }
        }

        private void GetProfileById()
        {
            try
            {
                Console.WriteLine("Enter Profile ID :");
                int id = Convert.ToInt32(Console.ReadLine());
                //var res = client2.GetProfileById(id);
                //Console.WriteLine(" " + res.ProfileId + " " + res.Name + " " + res.Age + " " + res.Designation + " ");
            }
            catch (FaultException<MyException> exe)
            {
                Console.WriteLine(" " + exe.Detail.Msg + " " + exe.Detail.StackTrace + " " + exe.Detail.LineNumber);
            }
        }

        private void DeleteProfile()
        {
            Console.WriteLine("Enter Profile ID :");
            int id = Convert.ToInt32(Console.ReadLine());
            client2.DeleteProfile(id);
            Console.WriteLine("Deletion Successful !!");
        }

        private void GetAllProfiles()
        {
            var res = client2.GetAllProfile();
            foreach (var i in res)
            {
                Console.WriteLine(" " + i.ProfileId + " " + i.Name + " " + i.Age + " " + i.Designation);
            }
        }

        private void EditSalary()
        {
            Console.WriteLine("Enter Salary ID :");
            int id = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Edit Amount :");
            int amount = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Edit Tax :");
            int tax = Convert.ToInt32(Console.ReadLine());
            Salary obj = new Salary()
            {
                SalaryId = id,
                Amount = amount,
                Tax = tax,
            };
            client1.EditSalary(id, obj);
        }

        private void GetSalaryById()
        {
            Console.WriteLine("Enter Salary ID :");
            int id = Convert.ToInt32(Console.ReadLine());
            var res = client1.GetSalary(id);
            Console.WriteLine(" " + res.SalaryId + " " + res.Amount + " " + res.Tax + " ");

        }
    }
}
