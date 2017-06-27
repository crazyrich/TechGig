using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using PortfolioWebApp.Models;

namespace PortfolioWebApp.Controllers
{
    public class BreadCrumbController : ApiController
    {
        readonly IBreadCrumb repository = new BreadCrumbRepository();

        [HttpGet]
        public IEnumerable<Program> GetBreadCrumb([FromUri] string id)
        {
            return repository.GetBreadCrumb(id);
        }
    }
}
