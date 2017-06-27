using PortfolioWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;

namespace PortfolioWebApp.Controllers
{
    public class IssueController :ApiController
    {
        static readonly IIssue repository = new IssueRepository();

        [HttpGet]
        public IEnumerable<Issue> GetIssueForUser([FromUri]int programid, [FromUri] string userid)
        {

            return repository.GetIssueByUserId(programid, userid);
        }

        [HttpPut]
        public void PutKeyAccomplishments(Issue issue)
        {

            if (!repository.UpdateIssue(issue))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        [HttpDelete]
        public void DeleteIssue(Issue item)
        {
            if (!repository.DeleteIssue(item))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public Issue GetIssueCount(string level, string UserName)
        {
            return repository.GetIssueCount(level, UserName);
        }
    }
}