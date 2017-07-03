using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace NewsService
{
    [ServiceContract]
    public interface INews
    {
        [OperationContract]
        List<News> GetNews();
        [OperationContract]
        void AddNews(News newNews);
    }
}
