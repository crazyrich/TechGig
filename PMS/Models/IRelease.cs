using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IRelease
    {
        Release GetCalender(string year, string month);
        IEnumerable<Release> GetAllReleases(string year, string month, string ReleaseId);
    }
}