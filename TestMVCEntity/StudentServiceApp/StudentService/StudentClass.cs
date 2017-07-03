using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Web;

namespace StudentService
{
    public class StudentClass :IStudent
    {
        TestMVCentityEntities db = new TestMVCentityEntities();
        public List<Student> GetAllStudents()
        {
            return db.Students.ToList();
        }

        public void AddStudent(Student newStudent)
        {
            if(newStudent != null)
            {
                db.Students.Add(newStudent);
                db.SaveChanges();
            }
        }

        public void EditStudent(int Id, Student newStudent)
        {
            var res = db.Students.ToList().Find(c=>c.Id==Id);
            if(res!= null)
            {
                res.Id = newStudent.Id;
                res.StudentName = newStudent.StudentName;
                res.StudentCourse = newStudent.StudentCourse;
                res.StudentClass = newStudent.StudentClass;
                db.SaveChanges();
            }
        }

        public void DeleteStudent(int Id)
        {
            var res = db.Students.ToList().Find(c=>c.Id==Id);
            if(res!=null)
            {
                db.Students.Remove(res);
                db.SaveChanges();
            }
        }


        public Student GetStudentById(int Id)
        {
            var res = db.Students.ToList().Find(v=>v.Id==Id);
            if (res != null)
            {
                return res;
            }
            else
            {
                throw new FaultException("FAULT ! !");
            }
        }
    }
}