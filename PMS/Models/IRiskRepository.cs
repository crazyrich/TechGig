using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PortfolioWebApp.Models
{
    public interface IRiskRepository
    {
        //IEnumerable<Risk> GetAll();
        //Risk Get(string ID);
        bool UpdateRisk(Risk item);
        IEnumerable<Risk> GetRiskByUserId(int ProgramId, string UserId);
        bool DeleteRisk(Risk item);
        IEnumerable<UserPrograms> GetPrograms(int Id);
        IEnumerable<UserProjects> GetProjects(int Id);
        IEnumerable<ItemType> GetItemType();
        Risk GetRiskCount(string level, string UserName);
    }
}
