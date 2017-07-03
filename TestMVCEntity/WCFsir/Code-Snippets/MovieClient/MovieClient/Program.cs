using MovieClient.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MovieClient
{
    class Program
    {
        static void Main(string[] args)
        {
            char flag = 'y';
            do
            {
                Console.WriteLine("Press 1 for Add Movie .");
                Console.WriteLine("Press 2 to view Movie list.");
                Console.WriteLine("Press 3 for view Movie by Id .");
                Console.WriteLine("Press 4 for delete Movie by Id .");

                int x = Convert.ToInt32( Console.ReadLine());
                switch (x)
                {
                    case 1:
                        AddMovie();
                        break;
                    
                    case 2:
                        ListMovie();
                        break;
                    case 3:
                        ListMovieById();
                        break;
                    case 4:
                        deleteMovie();
                        break;
                    default:
                        Console.WriteLine("Plese enter valid input");
                        break;
                }
                Console.WriteLine("press y to stop anything else cont..");
                flag = Convert.ToChar(Console.ReadLine());
                Console.Clear();
            } while (flag != 'y' || flag != 'Y');
        }

        private static void deleteMovie()
        {
            ServiceReference1.MovieServiceLibraryClient client = new MovieServiceLibraryClient();

            Console.WriteLine("Enter the Movie Id : ");
            int id = Convert.ToInt32(Console.ReadLine());
            client.RemoveMovie(id);
            Console.WriteLine(" Movie  removed !!");
        }

        private static void ListMovieById()
        {
            ServiceReference1.MovieServiceLibraryClient client = new MovieServiceLibraryClient();

            Console.WriteLine("Enter the Movie Id : ");
            int id = Convert.ToInt32(Console.ReadLine());
            Movie m= client.GetMovie(id);
            Console.WriteLine(m.Name +" " + m.Releasedate);

        }


       
        private static void ListMovie()
        {
            ServiceReference1.MovieServiceLibraryClient client = new MovieServiceLibraryClient();
            foreach (var item in client.GetAllMovie())
            {
                Console.WriteLine(item.Name +" "+ item.Releasedate);
            }
        }

        private static void AddMovie()
        {
            Console.WriteLine("Enter movie name :");
            string name = Console.ReadLine();
            Console.WriteLine("Enter realease date :");
            string rdate = Console.ReadLine();
            ServiceReference1.MovieServiceLibraryClient client = new MovieServiceLibraryClient();
            Movie mv = new Movie() {Name= name, Releasedate=rdate };
            client.AddMovie(mv);
        }
    }
}
