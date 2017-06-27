using System.Collections.Generic;
using System.Linq;
using System.Web;
//using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using PortfolioWebApp.Models;


namespace PortfolioWebApp.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //[RoutePrefix("Programs")]
    public class ProgramController : ApiController
    {
        readonly IProgramRepository repository = new ProgramRepository();

        public IEnumerable<Program> GetAllProgram(string ID)
        {
            return repository.GetAll(ID);
        }

        // [HttpGet]
        //public IEnumerable<Program> GetAllProgram([FromUri] string ID, [FromUri] string LoginId)
        //{
        //    return repository.GetAll(ID);
        //}

        [HttpGet]
        //[Route("GetProgram/ProgramId/{ProgramId}/LoginId/{LoginId}")]
        public IEnumerable<Program> GetProgramByUserId([FromUri] string ProgramId, [FromUri] string LoginId)
        {
            return repository.GetProgramByUserId(ProgramId, LoginId);
        }

        public Program GetProgram(string ID)
        {
            Program program = repository.Get(ID);
            if (program == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return program;
        }

        [HttpPost]
        public int CreateNewProgram([FromBody]Program prog)
        {
            int x = repository.CreateProgram(prog);
            return x;
        }

        [HttpDelete]
        public int DeleteProgramProject([FromBody]Program prog)
        {
            int x = repository.DeleteProgram(prog);
            return x;
        }
        [HttpPut]
        public int UpdateProgramProject([FromBody]Program prog)
        {
            int x = repository.UpdateProgram(prog);
            return x;

        }




        //public void PutProgram(string customerID, Customer customer)
        //{
        //    customer.CustomerID = customerID;
        //    if (!repository.Update(customer))
        //    {
        //        throw new HttpResponseException(HttpStatusCode.NotFound);
        //    }
        //}

    }
}
