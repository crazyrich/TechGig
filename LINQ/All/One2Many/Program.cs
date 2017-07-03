using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace One2Many
{
    class Program
    {
        static void Main(string[] args)
        {
            x0033_RoomDeptContainer db = new x0033_RoomDeptContainer();
            Department dep1 = new Department() { DepartmentID=101,DeptName="CSE"};
            Department dep2 = new Department() { DepartmentID = 102, DeptName = "ECE" };

            Room room1 = new Room() { RoomID=1001,RoomName="Lab 1",DepartmentID=101};
            Room room2 = new Room() { RoomID = 1002, RoomName = "Lab 2", DepartmentID = 101 };

            dep1.Rooms.Add(room2);
            dep1.Rooms.Add(room1);
            db.Departments.Add(dep1);
            db.SaveChanges();
        }
    }
}
