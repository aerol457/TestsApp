using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService
{
    public interface ITestRepository
    {
        Task<int> AddTest(Test test);
        Task<Test> UpdateTest(int idTest, Test test);
        void RemoveTest(int idTest);
        Test GetTestById (string idTest);
        Test GetTestByIdTest (int idTest);
        List<Test> GetTestsByIdTeacher (int idTeacher);
    }
}
