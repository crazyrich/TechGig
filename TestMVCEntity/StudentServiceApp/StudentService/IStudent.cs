using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;

namespace StudentService
{
    [ServiceContract]
    public interface IStudent
    {
        [OperationContract]
        List<Student> GetAllStudents();

        [OperationContract]
        Student GetStudentById(int Id);

        [OperationContract]
        void AddStudent(Student newStudent);

        [OperationContract]
        void EditStudent(int Id,Student newStudent);

        [OperationContract]
        void DeleteStudent(int Id);



    }
}
