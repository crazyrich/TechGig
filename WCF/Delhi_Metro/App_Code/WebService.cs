using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {

    public WebService () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod]
    public List<string> Source()
    {
        TestMVCentityEntities1 db = new TestMVCentityEntities1();
        var source = db.FareLists.Select(c=>c.SourceStation).ToList();
        return source;
    }
    [WebMethod]
    public List<string> Destination()
    {
        TestMVCentityEntities1 db = new TestMVCentityEntities1();
        var destination = db.FareLists.Select(c => c.DestinationStation).ToList();
        return destination;
    }
    [WebMethod]
    public double Cal_Fare(int count,string source,string destination) 
    {
        TestMVCentityEntities1 db = new TestMVCentityEntities1();
        var fare = db.FareLists.Where(c => c.SourceStation == source).Where(q => q.DestinationStation == destination);
        double totalFare;
         
        if (fare.Count() > 0)
        {
            totalFare = fare.First().Fare * count;
            return totalFare;
        }
        else
        { 
            return 0;
        }
        
    }

    
}
