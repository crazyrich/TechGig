using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace Salary_Profile_Service
{
    public class SalaryProfile : ISalary,IProfile 
    {
        TestMVCentityEntities db = new TestMVCentityEntities();

        public List<Profile> GetAllProfile()
        {
            return db.Profiles.ToList();
        }

        public void AddProfile(Profile newProfile)
        {
            Profile obj = new Profile()
            {
                ProfileId = newProfile.ProfileId,
                Name = newProfile.Name,
                Age = newProfile.Age,
                Designation = newProfile.Designation,
            };
            db.Profiles.Add(newProfile);
            db.SaveChanges();
        }

        public void DeleteProfile(int Id)
        {
            
            var res = db.Profiles.ToList().Find(x=>x.ProfileId==Id);
            if (res != null)
            {
                db.Profiles.Remove(res);
                db.SaveChanges();
            }
            else
            {
                MyException ex = new MyException()
                {
                    Msg="Message Text !!",
                    StackTrace="Stack Trace Text ! !",
                    LineNumber=10,

                };
                throw new FaultException<MyException>(ex);
            }
        }

        public Salary GetSalary(int Id)
        {
            var res = db.Salaries.ToList().Find(x=>x.SalaryId==Id);
            return res;
        }

        public void EditSalary(int Id, Salary salary)
        {
            var res = db.Salaries.ToList().Find(c=>c.SalaryId==Id);
            if(res!=null)
            {
                res.Amount = salary.Amount;
                res.Tax = salary.Tax;
                res.SalaryId = salary.SalaryId;
            }
            db.SaveChanges();
        }


        public Profile GetProfileById(int Id)
        {
            var res = db.Profiles.ToList().Find(x=>x.ProfileId==Id);
            if (res != null)
            {
                return res;
            }
            else
            {
                throw new FaultException("Faulty !");
            }
        }
    }
}