using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IWeeklystatus
    {
        IEnumerable<Weeklystatus> GetAll();
        Weeklystatus Get(string ID);
        bool UpdateKeyAccomplishments(Weeklystatus item);
        bool UpdateKeyIssues(Weeklystatus item);
        bool UpdateFuturePlan(Weeklystatus item);
        string UpdateComments(Weeklystatus item);
        bool UpdateProjectStatus(Weeklystatus item);
        Weeklystatus GetKeyAccomplishMent(string level, int PID);
        IEnumerable<Weeklystatus> GetWeeklyStatusByUserName(string UserName, string ID);
        List<Weeklystatus> GetAllKeyAccomplishMent(int PID);
    }
}