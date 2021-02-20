using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService
{
    public interface IQuestionRepository
    {
        Task<Question> AddQuestion(Question question);
        void UpdateQuestion(Question question);
        Task<bool> DeleteQuestion(int idQuestion);
        Question GetQuestionById(int idQuestion);
        void GetAllQuestionByIdTest(int idTest);
        List<QuestionOption> GetQuestionOptions(int idQuestion);
        Task<int> CheckQuestionsTest(Test test, int idStudent);
    }
}
