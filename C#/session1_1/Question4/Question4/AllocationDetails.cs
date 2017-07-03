using System;
using PersonalDetails;
using ProjectDetails;

namespace Question4
{
    class AllocationDetails
    {
        static void Main(string[] args)
        {
            Personal obj = new Personal();
            Project obj2 = new Project();
            obj.PersonalDetails();
            obj2.ProjectDetails();
        }
    }
}
