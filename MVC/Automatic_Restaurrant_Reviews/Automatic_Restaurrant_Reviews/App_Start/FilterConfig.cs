using System.Web;
using System.Web.Mvc;

namespace Automatic_Restaurrant_Reviews
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}