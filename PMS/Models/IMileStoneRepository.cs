using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IMileStoneRepository
    {
        IEnumerable<MileStone> GetAllMileStone();
        MileStone GetMileStone(string ID);
        bool UpdateMilestone(MileStone item);
        bool DeleteMilestone(MileStone item);
        IEnumerable<MileStone> GetMileStoneByprogramId(string ParentId, string ProgrameId, string UserId);
    }
}