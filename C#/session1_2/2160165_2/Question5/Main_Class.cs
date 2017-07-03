using System;

namespace Question5
{
    public class Ball
    {
        public string color;
        public static int count;

        public Ball()
        {
            count++;
        }
        ~Ball()
        {
            count--;
        }
    }
    public class Main_class
    {
        static void Main(string[] args)
        {
            int c = 0;
            c = Ball.count;
            Console.WriteLine("Count is " + c);
            Ball obj = new Ball();
            c = Ball.count;
            Console.WriteLine("Count is "+ c);

        }
    }
}
