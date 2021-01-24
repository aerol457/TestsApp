using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ExamDataContext context;

        public QuestionRepository(ExamDataContext context)
        {
            this.context = context;
        }

        public async Task<int> AddQuestion(Question question)
        {
            try
            {
                context.Question.Add(question);
                await context.SaveChangesAsync() ;
                return question.Id;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return -1;
            }
        }

        public async Task<bool> DeleteQuestion(int idQuestion)
        {
            try
            {
                var question = context.Question.FirstOrDefault(q => q.Id == idQuestion);
                if (question != null)
                {
                    context.Question.Remove(question);
                }
                return await context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return false;
            }
        }
        public async Task<Question> UpdateQuestion(int idQuestion, Question question)
        {
            try
            {
                var oldQuestion = context.Question.FirstOrDefault(q => q.Id == idQuestion);
                if (oldQuestion != null)
                {
                    oldQuestion.Content1 = question.Content1;
                    oldQuestion.Content2 = question.Content2;
                    oldQuestion.Content3 = question.Content3;
                    oldQuestion.Option1 = question.Option1;
                    oldQuestion.Option2 = question.Option2;
                    oldQuestion.Option3 = question.Option3;
                    oldQuestion.Answer1 = question.Answer1;
                    oldQuestion.Answer2 = question.Answer2;
                    oldQuestion.Answer3 = question.Answer3;
                    oldQuestion.ImageUrl = question.ImageUrl;
                    oldQuestion.Value = question.Value;
                    await context.SaveChangesAsync();
                    return oldQuestion;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public Question GetQuestionById(int idQuestion)
        {
            try
            {
                return context.Question.FirstOrDefault(q => q.Id == idQuestion);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public void GetAllQuestionByIdTest(int idTest)
        {
            try
            {
                context.Question.Where(q => q.IdTest == idTest).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
            }
        }


    }
}
