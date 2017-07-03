using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace MovieService
{
    [ServiceContract]
    public interface IMovieServiceLibrary
    {
        [OperationContract]
        List<Movie> GetAllMovie();

        [OperationContract]
        Movie GetMovie(int Id);

        [OperationContract]
        void RemoveMovie(int Id);

        [OperationContract]
        void EditMovie(int Id, Movie movie);

        [OperationContract]
        void AddMovie(Movie movie);
    }
}
