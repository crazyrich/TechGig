using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ValidationService
{
    public class ValidationClass : Interface1
    {
        ValidationContainer db = new ValidationContainer();
        public bool Login(string username, string password)
        {
            var res= db.Logins.SingleOrDefault(c=>c.LoginID.Trim()==username && c.Password.Trim()==password);
            if (res != null)
            {
                return true;
            }
            else
            {
                return false;
            }
            //bool flag=true;
            //var res = db.Logins.ToList();
            //foreach(var i in res)
            //{
            //    if (username == i.LoginID.Trim() && password == i.Password.Trim())
            //    {
            //        flag = false;
            //        break;
            //    }
            //    else
            //        continue;
                
            //}
            //if (flag == false)
            //{
            //    return true;
            //}
            //else
            //{
            //    return false;
            //}
        }
    }
}
