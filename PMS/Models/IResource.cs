using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    
    public interface IResource
    {
        IEnumerable<ViewModelResource> GetAll(string userid);
        IEnumerable<ViewModelResource> Get(string ID, string userid);
        IEnumerable<GetAllResourceForEdit> GetDataForModification(int ID,string userid);
        bool UpdateResource(Resource item);
        bool DeleteResource(Resource item);
        IEnumerable<ResourceDetails> GetResourceDetail(string userid);
        IEnumerable<ResourceProjectDetails> GetResourceProjectDetail(string userid);
		IEnumerable<ResourceForModal> GetResourceDetailsForModal(ResourceForModalArgs Args);
        IEnumerable<Designation> GetDesignation();
        IEnumerable<Skill> GetSkill();
        Resource GetResourceCount(string level, string UserName);
        IEnumerable<GetResourceType> GetDataForresourceType();
        IEnumerable<GetResourceLocation> GetDataForresourceLocation();
        bool AddResource(ResourceDetails item);
        IEnumerable<ResourceDetails> GetResourceDetails();
        int AssignResourceProject(ResourceProject oResource);
        IEnumerable<ResourceProgramProjectDetails> GetResourceProgramProjectList();
        int DeleteResourceProject(string Id);
    }
}