using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService
{
    public class StudentTestRepository : IStudentTestRepository
    {
        private readonly ExamDataContext context;

        public StudentTestRepository(ExamDataContext context)
        {
            this.context = context;
        }

        public void PublishTest(List<int> classrooms, int idTest)
        {
            try
            {
                foreach(int idClass in classrooms)
                {
                    var idClassExits = context.ClassroomTest.Where(c => c.IdTest == idTest && c.IdClassroom == idClass).FirstOrDefault(); 
                    if(idClassExits == null)
                    {
                        foreach(User s in context.User)
                        {
                            if(s.IdClassroom == idClass)
                            {
                            StudentTest student = new StudentTest();
                                student.IdUser = s.Id;
                                student.IdTest = idTest;
                                student.Grade = 0;
                                student.IsDone = false;
                                context.StudentTest.Add(student);
                            }
                        }
                        ClassroomTest classroomTest = new ClassroomTest();
                        classroomTest.IdClassroom = idClass;
                        classroomTest.IdTest = idTest;
                        context.ClassroomTest.Add(classroomTest);
                    }
                }
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
            }
        }

        public async Task<bool> DeleteStudentTest(int idStudentTest)
        {
            try
            {
                var student = context.StudentTest.Where(st => st.Id == idStudentTest).FirstOrDefault();
                if(student != null)
                {
                    context.StudentTest.Remove(student);
                }
                return await context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return false;
            }
        }

        public List<StudentTest> GetAllTests(int idStudent)
        {
            try
            {
                return context.StudentTest.Where(st => st.IdUser == idStudent).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public StudentTest GetTest(int idStudent)
        {
            try
            {
                return context.StudentTest.Where(st => st.IdUser == idStudent).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public async Task<bool> UpdateStudentTest(int idStudentTest, StudentTest studentTest)
        {
            try
            {
                var oldStudentTest = context.StudentTest.Where(st => st.Id == idStudentTest).FirstOrDefault();
                if(oldStudentTest != null)
                {
                    oldStudentTest.IdUser = studentTest.IdUser;
                    oldStudentTest.IdTest = studentTest.IdTest;
                }
                return await context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return false;
            }
        }
    }
}
