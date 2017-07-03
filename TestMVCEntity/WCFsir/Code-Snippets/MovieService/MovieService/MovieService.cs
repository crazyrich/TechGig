using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace MovieService
{
   public class MovieService : IMovieServiceLibrary
    {

       static List<Movie> list = new List<Movie>()
       {
           new Movie{Id=1, Name="xyz", Releasedate="1-1-2019"},
           new Movie{Id=2, Name="abc", Releasedate="1-1-2018"}
       };

        public List<Movie> GetAllMovie()
        {
            return list.ToList();
        }


        public Movie GetMovie(int Id)
        {
            var res = list.ToList().Find(x=> x.Id==Id);
            if (res != null)
            {
                return res;
            }
            else
            {
                throw new FaultException("Id is Invalid !!");
            }

        }

        public void RemoveMovie(int Id)
        {
            var res = list.ToList().Find(x => x.Id == Id);
            if (res !=null)
            {
                list.Remove(res);
                
            }
        }

        public void EditMovie(int Id, Movie movie)
        {
            var res = list.ToList().Find(x => x.Id == Id);
            if (res != null)
            {
                //res.Id = movie.Id;
                res.Name = movie.Name;
                res.Releasedate = movie.Releasedate;
            }
        }

        public void AddMovie(Movie movie)
        {
            list.Add(movie);
        }
    }
}
