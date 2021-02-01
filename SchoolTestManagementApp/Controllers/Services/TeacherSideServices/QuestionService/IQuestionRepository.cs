using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService
{
    public interface IQuestionRepository
    {
        Task<int> AddQuestion(Question question);
        Task<Question> UpdateQuestion(int idQuestion, Question question);
        Task<bool> DeleteQuestion(int idQuestion);
        Question GetQuestionById(int idQuestion);
        void GetAllQuestionByIdTest(int idTest);
        Task<int> CheckQuestionsTest(Test test, int idStudent);
    }
}
