using Microsoft.EntityFrameworkCore;
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
                context.SaveChanges();
                AddOption(question.Option1, question.Id, 1);
                AddOption(question.Option2, question.Id, 1);
                AddOption(question.Option3, question.Id, 1);
                AddOption(question.Answer1, question.Id, 2);
                if (question.Answer2 != null)
                {
                    AddOption(question.Answer2, question.Id, 2);
                }
                await context.SaveChangesAsync();
                return question.Id;
            }
            catch (Exception ex) 
            {
                Console.WriteLine("Error: ", ex.Message);
                return -1;
            }
        }

        protected void AddOption(string content, int idQuestion, int type)
        {
            Option option = new Option();
            QuestionOption questionOption = new QuestionOption();
            option.Content = content;
            context.Option.Add(option);
            context.SaveChanges();
            questionOption.IdOption = option.Id;
            questionOption.IdQuestion = idQuestion;
            questionOption.Type = type;
            context.QuestionOption.Add(questionOption);
            context.SaveChanges();
        }

        protected void GetQuestionOptions(int idQuestion)
        {
            var options = context.QuestionOption.Where(q => q.IdQuestion == idQuestion).ToList();
            foreach(var opt in options)
            {
                context.Option.Find(opt.IdOption);
            }
        }

        protected List<QuestionOption> GetQuestionAnswers(int idQuestion)
        {
            var answers = context.QuestionOption.Where(q => q.IdQuestion == idQuestion && q.Type == 2).ToList();
            foreach(var ans in answers)
            {
                context.Option.Find(ans.IdOption);
            }

            return answers;
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
                var questionList = context.Question.Where(q => q.IdTest == idTest).ToList();
                foreach(var q in questionList)
                {
                    GetQuestionOptions(q.Id);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
            }
        }

        public async Task<int> CheckQuestionsTest(Test test,int idStudent)
        {
            int grade = 0;
            bool isValid = true;
            foreach(var question in test.QuestionList.ToList())
            {
                var q = context.Question.Where(q => q.Id == question.Id).FirstOrDefault();
                var answers = GetQuestionAnswers(q.Id);
                if (q == null)
                {
                    isValid = false;
                    break;
                }
                if(q.QuestionType == "image" || q.QuestionType == "option")
                {
                    if(question.UserAnswer1 == answers[0].IdOption)
                    {
                        grade += q.Value;
                    }
                }else if(q.QuestionType == "check" || q.QuestionType == "blank")
                {
                    if ((question.UserAnswer1 == answers[0].IdOption && question.UserAnswer2 == answers[1].IdOption) || 
                        (question.UserAnswer1 == answers[1].IdOption && question.UserAnswer2 == answers[0].IdOption))
                    {
                        grade += q.Value;
                    }
                }
                else
                {
                    isValid = false;
                    break;
                }
            }
            var student = context.User.Find(idStudent);
            if (student != null && isValid)
            {
                foreach(var studentTest in context.StudentTest.ToList())
                {
                    if(studentTest.IdUser == idStudent && studentTest.IdTest == test.Id)
                    {
                        studentTest.IsPass = grade >= test.PassingGrade;
                        studentTest.IsDone = true;
                        studentTest.Grade = grade;
                        context.Update(studentTest);
                        await context.SaveChangesAsync();
                        break;
                    }
                }
            }
            else
            {
                isValid = false;
            }
            if (isValid)
            {
                return grade;
            }
            return -1;
        }

    }
}
