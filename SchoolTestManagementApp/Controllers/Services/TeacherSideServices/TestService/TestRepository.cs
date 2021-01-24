using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService
{
    public class TestRepository : ITestRepository
    {
        private readonly  ExamDataContext context;
        public TestRepository(ExamDataContext context)
        {
            this.context = context;        
        }

        public async Task<int> AddTest(Test test)
        {
            try
            {
                Random rnd = new Random();
                int id = rnd.Next(100000, 999999);
                int number = rnd.Next(1, 9);
                test.IdTest = id.ToString() + number.ToString();
                context.Test.Add(test);
                await context.SaveChangesAsync();
                return test.Id;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return -1;
            }
        }
        public async Task<Test> UpdateTest(int idTest, Test test)
        {
            try
            {
                var oldTest = context.Test.FirstOrDefault(t => t.Id == idTest);
                if (oldTest != null)
                {
                    oldTest.IdUser = test.IdUser;
                    oldTest.Name = test.Name;
                    oldTest.QuantityOfQuestions = test.QuantityOfQuestions;
                    oldTest.Time = test.Time;
                    oldTest.ProfessionName = test.ProfessionName;
                    oldTest.DateOfSubmission = test.DateOfSubmission;
                    oldTest.DateOfDistribution= test.DateOfDistribution;
                    await context.SaveChangesAsync();
                    return oldTest;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }
        public void RemoveTest(int idTest)
        {
            Test test = context.Test.FirstOrDefault(t => t.Id == idTest);
            context.Test.Remove(test);
            context.SaveChanges();
        }

        public Test GetTestById(string idTest)
        {
            try
            {
                return context.Test.FirstOrDefault(t => t.IdTest == idTest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                throw;
            }
        }

        public Test GetTestByIdTest(int idTest)
        {
            try
            {
                return context.Test.FirstOrDefault(t => t.Id == idTest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                throw;
            }
        }

        public List<Test> GetTestsByIdTeacher(int idTeacher)
        {
            try
            {
                return context.Test.Where(t => t.IdUser == idTeacher).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

    }
}
