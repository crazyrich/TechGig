using System.Collections.Generic;
using System.Linq;
//using System.Web;
//using System.Web.Mvc;
using System.Net;

//using System.Web.Http.Cors;
using PortfolioWebApp.Models;
using System.Net.Http;
using System.Web.Http;

namespace PortfolioWebApp.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeeklystatusController : System.Web.Http.ApiController
    {
        static readonly IWeeklystatus repository = new WeeklystatusRepository();

        public IEnumerable<Weeklystatus> GetAllWeeklystatus([FromUri]string PID, [FromUri] string userid)
        {
            return repository.GetWeeklyStatusByUserName(userid,PID);
        }

        public Weeklystatus GetWeeklystatus(string ID)
        {
            Weeklystatus weeklystatus = repository.Get(ID);
            if (weeklystatus == null)
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
            return weeklystatus;
        }

        
        [HttpPut]
        public void PutKeyAccomplishments(Weeklystatus weeklystatus)
        {
            //weeklystatus.WeeklyStatus_Id = weeklystatus.WeeklyStatus_Id;
            if (!repository.UpdateKeyAccomplishments(weeklystatus))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        //[Route("KeyIssues")]
        //[HttpPut]
        //public void PutKeyIssues(Weeklystatus weeklystatus)
        //{
        //    //weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
        //    if (!repository.UpdateKeyIssues(weeklystatus))
        //    {
        //        throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        //[Route("FuturePlan")]
        //[HttpPut]
        //public void PutFuturePlan(Weeklystatus weeklystatus)
        //{
        //    // weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
        //    if (!repository.UpdateFuturePlan(weeklystatus))
        //    {
        //        throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        //[Route("Comments")]
        //[HttpPut]
        //public void PutComments(Weeklystatus weeklystatus)
        //{
        //    //weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
        //    if (!repository.UpdateComments(weeklystatus))
        //    {
        //        throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

        public Weeklystatus GetKeyAccomplishMent(string level, int PID)
        {
            return repository.GetKeyAccomplishMent(level, PID);
        
        }

        public IEnumerable<Weeklystatus> GetWeeklyStatusByUserName(string UserName, string ID)
        {
            return repository.GetWeeklyStatusByUserName(UserName,ID);
        }

        public IEnumerable<Weeklystatus> GetAllKeyAccomplishMent(int PID)
        {
            return repository.GetAllKeyAccomplishMent(PID);
        }
    }


    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeeklyKeyIssuesController : System.Web.Http.ApiController
    {
        static readonly IWeeklystatus repository = new WeeklystatusRepository();

        [HttpPut]
        public void PutKeyIssues(Weeklystatus weeklystatus)
        {
            //weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
            if (!repository.UpdateKeyIssues(weeklystatus))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }
                
    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeeklyFuturePlanController : System.Web.Http.ApiController
    {
        static readonly IWeeklystatus repository = new WeeklystatusRepository();

        [HttpPost]
        public void PutFuturePlan(Weeklystatus weeklystatus)
        {
            // weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
            if (!repository.UpdateFuturePlan(weeklystatus))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }
                
    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeeklyCommentsController : System.Web.Http.ApiController
    {
        static readonly IWeeklystatus repository = new WeeklystatusRepository();

        [HttpPut]
        public string PutComments(Weeklystatus weeklystatus)
        {
            //weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
            return repository.UpdateComments(weeklystatus);
            //if (!repository.UpdateComments(weeklystatus))
            //{
            //    throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            //}
        }
    }


    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WeeklyProjectStatusController : System.Web.Http.ApiController
    {
        static readonly IWeeklystatus repository = new WeeklystatusRepository();

        [HttpPut]
        public void PutComments(Weeklystatus weeklystatus)
        {
            //weeklystatus.WeeklyStatus_Id = WeeklyStatus_Id;
            if (!repository.UpdateProjectStatus(weeklystatus))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}

