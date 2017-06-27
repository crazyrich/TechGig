using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using PortfolioWebApp.Models;
using System.Net.Http;
using System.Web.Http;
using System.Data;


namespace PortfolioWebApp.Controllers
{
    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ResourceController : System.Web.Http.ApiController
    {
        static readonly IResource repository = new ResourceRepository();

        public IEnumerable<ViewModelResource> GetAllResource([FromUri] string userid)
        {
            return repository.GetAll(userid);
        }

        public IEnumerable<ResourceDetails> GetAllResource()
        {
            return repository.GetResourceDetails();
        }
        //GET Resource by ID
        public IEnumerable<ViewModelResource> GetResource(string ID, [FromUri] string userid)
        {
            IEnumerable<ViewModelResource> resource = repository.Get(ID,userid);
            if (resource == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return resource;
        }

        //UPDATE resource
        [HttpPut]
        public void PutKeyAccomplishments(Resource resource)
        {

            if (!repository.UpdateResource(resource))
            {
                throw new System.Web.Http.HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //GETResourceForEdit
        public IEnumerable<GetAllResourceForEdit> GetDataForModification([FromUri]int ID, [FromUri] string userid)
        {
            return repository.GetDataForModification(ID, userid);
        }

        public IEnumerable<GetResourceType> GetDataForresourceType()
        {
            return repository.GetDataForresourceType();
        }

        public IEnumerable<GetResourceLocation> GetDataForresourceLocation()
        {
            return repository.GetDataForresourceLocation();
        }
        //DELETE
        [HttpDelete]
        public void DeleteResource(Resource resource)
        {
            if (!repository.DeleteResource(resource))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

        //Get Resource for modal PopUp
         [HttpPost]
        public IEnumerable<ResourceForModal> GetResourceDetailsForModal([FromBody]ResourceForModalArgs Args) 
        {

            return repository.GetResourceDetailsForModal(Args);
        
        }

        /// <summary>
        /// Get Resource Count for the Programm/Project
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
         public Resource GetResourceCount(string level, string UserName)
         {
            return repository.GetResourceCount(level, UserName);
         }

         public IEnumerable<ResourceProgramProjectDetails> GetResourceProgramProjectList()
         {
             return repository.GetResourceProgramProjectList();
         }
        [HttpGet]
         public int DeleteResourceProject(string Id)
         {
             return repository.DeleteResourceProject(Id);
         }

         [HttpPost]
         public bool AddResource([FromBody] ResourceDetails oResource)
         {
             bool isSuccess = repository.AddResource(oResource);
             return isSuccess;
         }

         [HttpPost]
         public int AssignResourceProject([FromBody] ResourceProject oResource)
         {
             int isSuccess = repository.AssignResourceProject(oResource);
             return isSuccess;
         }

    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GetResourceDetailsController : ApiController
    {
        static readonly IResource repository = new ResourceRepository();



        public IEnumerable<ResourceDetails> GetResourceDetail(string userid)
        {
            return repository.GetResourceDetail(userid);
        }

    }


    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class GetResourceProjectDetailsController : ApiController
    {
        static readonly IResource repository = new ResourceRepository();

        public IEnumerable<ResourceProjectDetails> GetResourceProjectDetail(string userid)
        {
            return repository.GetResourceProjectDetail(userid);
        }

    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DesignationController : ApiController
    {
        static readonly IResource repository = new ResourceRepository();

        public IEnumerable<Designation> GetDesignationDetail()
        {
            return repository.GetDesignation();
        }

    }

    [System.Web.Http.Cors.EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SkillController : ApiController
    {
        static readonly IResource repository = new ResourceRepository();

        public IEnumerable<Skill> GetSkillDetail()
        {
            return repository.GetSkill();
        }

    }
    

}
