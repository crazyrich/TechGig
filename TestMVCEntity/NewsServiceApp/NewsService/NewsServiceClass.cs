using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace NewsService
{
    public class NewsServiceClass : INews
    {
        richEntities db = new richEntities();
        public List<News> GetNews()
        {
            return db.News.ToList();
        }

        public void AddNews(News newNews)
        {   
            if(newNews !=null)
            {
                db.News.Add(newNews);
                db.SaveChanges();
            }
            else
            {
                throw new FaultException("Invlaid ! !");
            }
        }
    }
}