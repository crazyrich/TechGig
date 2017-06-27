using System.Collections.Generic;
using System.Linq;
//using System.Web;
//using System.Web.Mvc;
using System.Net;

//using System.Web.Http.Cors;
using PortfolioWebApp.Models;
using System.Net.Http;
using System.Web.Http;

namespace PortfolioWebApp.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MileStoneController : ApiController
    {
        static readonly IMileStoneRepository repository = new MileStoneRepository();

        public IEnumerable<MileStone> GetMileStone()
        {
            return repository.GetAllMileStone();
        }

        public MileStone GetProject(string ID)
        {
            MileStone mileStone = repository.GetMileStone(ID);
            if (mileStone == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return mileStone;
        }

        [HttpPut]
        public void PutMileStone(MileStone mileStone)
        {
            if (!repository.UpdateMilestone(mileStone))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        public IEnumerable<MileStone> GetMileStoneByprogramId(string ParentId, string ProgrameId, string UserId)
        {
            return repository.GetMileStoneByprogramId(ParentId,ProgrameId,UserId);
        }
        
    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DeleteMilestoneController : ApiController
    {
        static readonly IMileStoneRepository repository = new MileStoneRepository();

        
        [HttpDelete]
        public void DeleteMilestone(MileStone mileStone)
        {
            if (!repository.DeleteMilestone(mileStone))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        
    }


}
