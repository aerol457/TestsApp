using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService
{
    public interface ITestRepository
    {
        Task<Test> AddTest(Test test);
        void UpdateTest(Test test);
        void UpdateQuantity(int idTest,int quantity);
        Task<bool> RemoveTest(int idTest);
        Test GetTestById (string idTest);
        Test GetTestByIdTest (int idTest);
        List<Test> GetTestsByIdTeacher (int idTeacher);
        void PostTestToCancel(int idTest);
    }
}
