using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioWebApp.Models
{
    public interface IIssue
    {
        bool UpdateIssue(Issue item);
        IEnumerable<Issue> GetIssueByUserId(int ProgramId, string UserId);
        bool DeleteIssue(Issue item);
        Issue GetIssueCount(string level, string UserName);
    }
}
