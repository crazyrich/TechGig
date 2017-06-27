using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IProjectRepository
    {
        IEnumerable<Project> GetAll();
        Project Get(string ID);
    }
}