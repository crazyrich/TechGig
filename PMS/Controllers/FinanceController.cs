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
    public class FinanceController : ApiController
    {
        //[BasicHttpAuthorizeAttribute(RequireAuthentication = true)]
      
        static readonly IFinanceRepository repository = new FinanceRepository();

        [HttpGet]
        public IEnumerable<Finance> GetAllFinance(string ID, string UserName)
        {
            return repository.GetAll(ID,UserName);
        }

        public IEnumerable<Finance> GetFinanceDetails(string ID)
        {
            return repository.GetFinanceDetails(ID);
        }


        public Finance GetFinance(int ID)
        {
            Finance Finance = repository.Get(ID);
            if (Finance == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return Finance;
        }

        [HttpPut]
        public void PutKeyAccomplishments(Finance Finance)
        {

            if (!repository.UpdateFinance(Finance))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }

    }
}