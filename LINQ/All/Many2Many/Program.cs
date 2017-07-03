using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Many2Many
{
    class Program
    {
        MovieActorContainer db = new MovieActorContainer();
        public void ReadAll()
        {
            //ObjectParameter param = new ObjectParameter("MovieName",typeof(string));
            var res = db.ProcMovieActor();
            foreach(var i in res)
            {
              Console.WriteLine(i.MovieDirector+" "+i.MovieID+" "+i.MovieName); 
            }
        }
        public void Insert()
        {
            Movie mov1 = new Movie() { MovieID = 101, MovieName = "DeadPool", MovieDirector = "DcComics" };
            Actor act1 = new Actor() { ActorID = 110, ActorName = "Ryan" };

            mov1.Actors.Add(act1);
            db.Movies.Add(mov1);
            db.SaveChanges();
        }

        public void Delete()
        {
            Movie mov1 = db.Movies.SingleOrDefault(c=>c.MovieID==101);
            Actor act = db.Actors.SingleOrDefault(c=>c.ActorID==110);
            db.Movies.Remove(mov1);
            db.Actors.Remove(act);
            db.SaveChanges();
        }
        public void Update()
        {
           //Movie mov1 = db.Movies.SingleOrDefault(c => c.MovieID == 101);
            Actor act = db.Actors.SingleOrDefault(c => c.ActorID == 110);
            act.ActorName = "Sagar";
            db.Entry(act).State = EntityState.Modified;
            db.SaveChanges();
        }
        static void Main(string[] args)
        {
            bool flag = true;
            bool flag1=true;
            try
            {
                while (flag)
                {
                    Console.WriteLine("Choose Option: ");
                    Console.WriteLine("0 : INSERT");
                    Console.WriteLine("1 : REMOVE");
                    Console.WriteLine("2 : UPDATE");
                    Console.WriteLine("3 : Read All");



                    int i = Convert.ToInt32(Console.ReadLine());
                    Program obj = new Program();
                    switch (i)
                    {
                        case 0:
                            obj.Insert();
                            break;
                        case 1:
                            obj.Delete();
                            break;
                        case 2:
                            obj.Update();
                            break;
                        case 3:
                            obj.ReadAll();
                            break;
                        default:
                            Console.WriteLine("Invalid Option !");
                            continue;

                    }
                    while (flag1)
                    {
                        Console.WriteLine("Do You Want To Continue?");
                        char choose = Convert.ToChar(Console.ReadLine());
                        if (choose == 'y')
                        {
                            break;
                        }
                        else if (choose == 'n')
                        {
                            flag = false;
                            break;
                        }
                        else
                        {
                            Console.WriteLine("Invalid Option !");
                            continue;
                        }
                    }

                }
            }
            catch(Exception ex)
            {
                Console.WriteLine("" +ex.Message);
            }
            
        }
    }
}
