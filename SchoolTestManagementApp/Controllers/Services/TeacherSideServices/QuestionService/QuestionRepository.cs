using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using SchoolTestManagementApp.Controllers.Services.utils;
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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public QuestionRepository(ExamDataContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        public async Task<Question> AddQuestion(Question question)
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
                if(question.QuestionType  == "image" && question.ImageFile != null && question.ImageUrl != "")
                {
                    ImageFile saveImage = new ImageFile(_webHostEnvironment);
                    saveImage.Save(question.ImageFile, question.ImageUrl);
                }
                await context.SaveChangesAsync();
                return question;
            }
            catch (Exception ex) 
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
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

        public void UpdateQuestion(Question question)
        {
            try
            {
                var distructions = GetQuestionOptions(question.Id).Where(o => o.Type == 1).ToList();
                var answers = GetQuestionOptions(question.Id).Where(o => o.Type == 2).ToList();

                UpdateOption(distructions[0].IdOption, question.Option1);
                UpdateOption(distructions[1].IdOption, question.Option2);
                UpdateOption(distructions[2].IdOption, question.Option3);
                UpdateOption(answers[0].IdOption, question.Answer1);

                if(question.Answer2 != null)
                {
                    UpdateOption(answers[1].IdOption, question.Answer2);
                }

                if (question.QuestionType == "image" && question.ImageFile != null)
                {
                    ImageFile image = new ImageFile(_webHostEnvironment);
                    image.Save(question.ImageFile, question.ImageUrl);
                    image.Remove(question.CurrentImage);
                }
                context.Question.Update(question);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
            }
        }

        protected void UpdateOption(int id, string content)
        {
            var option = context.Option.Find(id);
            option.Content = content;
            context.Option.Update(option);
        }

        public async Task<bool> DeleteQuestion(int idQuestion)
        {
            try
            {
                var question = context.Question.FirstOrDefault(q => q.Id == idQuestion);
                if (question != null)
                {
                    GetQuestionOptions(idQuestion);
                    foreach (var optionQuestion in question.QuestionOption)
                    {
                        RemoveOption(optionQuestion.IdOption);
                    }
                    context.Question.Remove(question);
                }

                if(question.QuestionType == "image")
                {
                    ImageFile image = new ImageFile(_webHostEnvironment);
                    image.Remove(question.ImageUrl);
                }

                return await context.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return false;
            }
        }

        protected void RemoveOption(int idOption)
        {
            var option = context.Option.Find(idOption);
            var questionOption = context.QuestionOption.Where(q => q.IdOption == idOption).FirstOrDefault();
            context.QuestionOption.Remove(questionOption);
            context.Option.Remove(option);
        }

        public List<QuestionOption> GetQuestionOptions(int idQuestion)
        {
            var options = context.QuestionOption.Where(q => q.IdQuestion == idQuestion).ToList();
            foreach(var opt in options)
            {
                context.Option.Find(opt.IdOption);
            }
            return options;
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
                var answers = GetQuestionOptions(q.Id).Where(o => o.Type == 2).ToList();
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
