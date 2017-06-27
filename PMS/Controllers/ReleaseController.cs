using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using PortfolioWebApp.Models;

namespace PortfolioWebApp.Controllers
{
    public class ReleaseController : ApiController
    {
        readonly IRelease repository = new ReleaseRepository();
       
        [HttpGet]
        public Release GetCaleder([FromUri] string year, string month)
        {
            return repository.GetCalender(year, month);
        }


        [HttpGet]
        public IEnumerable<Release> GetAllReleases([FromUri] string year, string month, string ReleaseId)
        {
            return repository.GetAllReleases(year, month, ReleaseId);
        }
    }
}
