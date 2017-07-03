using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;

namespace Ques1_Abstract
{
   public enum TransactionTypeChoice { WithInBank, NTFS, RTGC };
    #region Struct Beneficiary Outside AnyClass
   
    public struct Beneficiary
    {
        public long accountNumber;
        public string name;
        public string bankName;
        public double maxLimit;
        public TransactionTypeChoice transactionType;

     public Beneficiary(long accountNumber,string name,string bankName, double maxLimit, TransactionTypeChoice transactionType)
        { 
        this.accountNumber=accountNumber;
        this.name = name;
        this.bankName=bankName;
        this.maxLimit=maxLimit;
        this.transactionType=transactionType;
        }
    }
    #endregion
   public  class FundTransfer
    {
       public List<Beneficiary> list = new List<Beneficiary>();
        public void ShowAllBenificiary()
        { 
         foreach(var i in list)
          {
              Console.WriteLine(" "+i.accountNumber+" "+i.bankName+" "+i.maxLimit+" "+i.transactionType );
          }
        }

        public void AddToBeneficiary()
        {
            bool Flag = true;
            while (Flag)
            {
                Beneficiary st = new Beneficiary();
                string transaction;
                Console.WriteLine("ENter details into Beneficiary>>>   ");
                Console.WriteLine("Account Number");
                st.accountNumber = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Name");
                st.name = Console.ReadLine();
                Console.WriteLine("Bank Name");
                st.bankName = Console.ReadLine();
                Console.WriteLine("Max limit");
                st.maxLimit = Convert.ToInt32(Console.ReadLine());

                while (true)
                {
                    Console.WriteLine("Trasaction Type (    WithInBank, NTFS, RTGC    )");
                    transaction = Console.ReadLine();
                    if ((TransactionTypeChoice.NTFS.ToString()) == transaction)
                    {
                        st.transactionType = TransactionTypeChoice.NTFS;
                        break;
                    }
                    else if ((TransactionTypeChoice.WithInBank.ToString()) == transaction)
                    {
                        st.transactionType = TransactionTypeChoice.WithInBank;
                        break;
                    }
                    else if ((TransactionTypeChoice.RTGC.ToString()) == transaction)
                    {
                        st.transactionType = TransactionTypeChoice.RTGC;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("Not A Valid TYpe");
                        continue;
                    }
                }

                list.Add(st);


                bool flag3 = true;
                while (flag3)
                {
                    Console.WriteLine("Do you want to enter Another beneficiary? Y/N");
                    char result2 = Convert.ToChar(Console.ReadLine());
                    if (result2 == 'y')
                    {
                        //flag1 = false;
                        break;
                    }
                    if (result2 == 'n')
                    {
                        Flag = false;
                        break;
                    }
                    else
                    {
                        Console.WriteLine("CHoose Valid Option!");
                        continue;
                    }
                }
            }

            //foreach (var i in list)
            //{
            //    Console.WriteLine(" " + i.accountNumber + " " + i.bankName+" "+i.maxLimit); 
            //}
        }

        public void ShowAllBenificiary(TransactionTypeChoice choice)
        { 
            
            foreach(var i in list)
            {
                if (i.transactionType == choice)
                {
                    Console.WriteLine( i.name+" "+i.accountNumber+" "+i.bankName+" "+i.maxLimit+" "+i.transactionType);
                }
            }
        }
    }
    class Payee
    {
        static void Main(string[] args)
          {
              FundTransfer obj = new FundTransfer();
              obj.AddToBeneficiary();
              obj.ShowAllBenificiary(TransactionTypeChoice.NTFS);
          }
    }
}
