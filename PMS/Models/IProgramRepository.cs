using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PortfolioWebApp.Models
{
    public interface IProgramRepository
    {
        IEnumerable<Program> GetAll(string ID);
        IEnumerable<Program> GetProgramByUserId(string ID, string LoginId);
        Program Get(string ID);
        int CreateProgram(Program prog);
        int DeleteProgram(Program prog);
        int UpdateProgram(Program prog);

    }
}