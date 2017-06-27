using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using PortfolioWebApp.Models;

namespace PortfolioWebApp.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProjectController : ApiController
    {
        static readonly IProjectRepository repository = new ProjectRepository();

        public IEnumerable<Project> GetAllProject()
        {
            return repository.GetAll();
        }

        public Project GetProject(string ID)
        {
            Project project = repository.Get(ID);
            if (project == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return project;
        }

    }
}
