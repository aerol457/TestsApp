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

        public async Task<Test> AddTest(Test test)
        {
            try
            {
                Random rnd = new Random();
                int id = rnd.Next(100000, 999999);
                int number = rnd.Next(1, 9);
                test.DateOfDistribution = DateTime.Today;
                test.IdTest = id.ToString() + number.ToString();
                context.Test.Add(test);
                await context.SaveChangesAsync();
                return test;
            }catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public void UpdateTest(Test test)
        {
            try
            {
                context.Test.Update(test);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
            }
        }

        public async Task<bool> RemoveTest(int idTest)
        {
            Test test = context.Test.FirstOrDefault(t => t.Id == idTest);
            context.Test.Remove(test);
            return await context.SaveChangesAsync() > 0;
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

        public void UpdateQuantity(int idTest, int quantity)
        {
            var test = context.Test.Find(idTest);
            test.QuantityOfQuestions = quantity;
            context.Test.Update(test);
            context.SaveChanges();
        }

        public void PostTestToArchive(int idTest)
        {
            var test = context.Test.Find(idTest);
            if (test != null)
            {
                test.Archive = true;
                context.Test.Update(test);
                context.SaveChanges();
            }
        }
    }
}
