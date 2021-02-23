using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService
{
    public interface IStudentTestRepository
    {
        void PublishTest(List<int> idClassrooms, int idTest);
        Task<bool> UpdateStudentTest(int idStudentTest, StudentTest studentTest);
        Task<bool> DeleteStudentTest(int idStudentTest);
        StudentTest GetTest(int idStudent);
        List<StudentTest> GetAllTests(int idStudent);
    }
}
