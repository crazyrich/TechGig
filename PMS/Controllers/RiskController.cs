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
    public class RiskController : ApiController
    {
        static readonly IRiskRepository repository = new RiskRepository();

        // [BasicHttpAuthorizeAttribute(RequireAuthentication = true)]
        //public IEnumerable<Risk> GetAllRisk()
        //{
        //    return repository.GetAll();
        //}

        //public Risk GetRisk(string ID)
        //{
        //    Risk risk = repository.Get(ID);
        //    if (risk == null)
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //    return risk;
        //}


        [HttpPut]
        public void PutKeyAccomplishments(Risk risk)
        {

            if (!repository.UpdateRisk(risk))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        [HttpGet]
        public IEnumerable<Risk> GetRiskForUser([FromUri]int programid, [FromUri] string userid)
        {

            return repository.GetRiskByUserId(programid, userid);
        }
        [HttpGet]
        public IEnumerable<UserPrograms> GetRiskPrograms(int Id)
        {

            return repository.GetPrograms(Id);
        }
        [HttpGet]
        public IEnumerable<UserProjects> GetRiskProjects(int Id)
        {

            return repository.GetProjects(Id);
        }

        [HttpDelete]
        public void DeleteRisk(Risk item)
        {
            if (!repository.DeleteRisk(item))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        [HttpGet]
        public IEnumerable<ItemType> GetAllItemType()
        {

            return repository.GetItemType();
        }

        /// <summary>
        /// Get Risk Count for the Programm/Project
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public Risk GetRiskCount(string level, string UserName)
        {
            return repository.GetRiskCount(level, UserName);
        }
    }
}
