using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Net.Http.Headers;
using System.Web.Http.Cors;
using PortfolioWebApp.Models;

namespace PortfolioWebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        
        {
            config.EnableCors();

            //config.Routes.MapHttpRoute(
            //    name: "ActionApi",
            //    routeTemplate: "api/{controller}/{action}/{customerID}"
            //);

            config.Routes.MapHttpRoute(
              name: "ActionApi",
              routeTemplate: "api/{controller}/{action}/{id}",
              defaults: new { id = RouteParameter.Optional }
          );

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

           

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            //config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            // config.EnableCors();

            // config.MapHttpAttributeRoutes();


            // //For ApiController in ASP.NET  MVC to  support multiple GET methods ;
            // //Add an additional routing before  default routing as follows
            // config.Routes.MapHttpRoute(
            //     name: "ActionApi",
            //     routeTemplate: "api/{controller}/{action}/{id}",
            //     defaults: new { id = RouteParameter.Optional }
            //);

            // config.Routes.MapHttpRoute(
            //     name: "DefaultApi",
            //     routeTemplate: "api/{controller}/{id}",
            //     defaults: new { id = RouteParameter.Optional }
            // );

            // config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            //  GlobalConfiguration.Configuration.Filters.Add(new BasicAuthenticator());
        }
    }
}
