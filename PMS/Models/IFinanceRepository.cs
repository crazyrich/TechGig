using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PortfolioWebApp.Models;

namespace PortfolioWebApp.Models
{
    public interface IFinanceRepository
    {
        IEnumerable<Finance> GetAll(string ID, string UserName);
        IEnumerable<Finance> GetFinanceDetails(string ID);
        Finance Get(int ID);
        bool UpdateFinance(Finance item);
    }
}