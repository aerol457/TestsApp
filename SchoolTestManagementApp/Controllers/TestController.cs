using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Controllers.TeacherSideServices.ClassroomTest;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService;
using SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService;
using SchoolTestManagementApp.Data.Services.UserService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController: Controller
    {
        private IQuestionRepository _serviceQuestion;
        private ITestRepository _serviceTest;
        private IUserRepository _serviceUser;
        private IStudentTestRepository _serviceStudentTest;
        private IClassroomTestRepository _serviceClassroomTest;
        private ITeacherClassRepository _serviceTeacherClass;
        private IProfessionRepository _serviceProfession;
        private readonly IWebHostEnvironment webHostEnvironment;
        public TestController(IQuestionRepository serviceQuestion, ITestRepository serviceTest, IWebHostEnvironment hostEnvironment, 
                                IUserRepository serviceUser, IStudentTestRepository serviceStudentTest, 
                                    IClassroomTestRepository serviceClassroomTest, ITeacherClassRepository serviceTeacherClass, IProfessionRepository serviceProfession)
        {
            this._serviceQuestion = serviceQuestion;
            this._serviceUser= serviceUser;
            this._serviceTest = serviceTest;
            this._serviceStudentTest = serviceStudentTest;
            this._serviceClassroomTest = serviceClassroomTest;
            this._serviceTeacherClass = serviceTeacherClass;
            this._serviceProfession = serviceProfession;
            this.webHostEnvironment = hostEnvironment;
        }

        [HttpGet("{idTest}")]
        public IActionResult GetTest(string idTest)
        {
            var test = _serviceTest.GetTestById(idTest);
            if (test != null)
            {
                return Ok(new { success = "true", test });
            }
            return Json(new { success = "false" });
        }

        [HttpGet("[action]/{idTest}")]
        public IActionResult GetFullTest(int idTest)
         {
            var test = _serviceTest.GetTestByIdTest(idTest);
            if (test != null)
            {
                _serviceQuestion.GetAllQuestionByIdTest(test.Id);
                _serviceUser.GetUserById(test.IdUser);
                var assignClassrooms = _serviceClassroomTest.GetClassroomsByIdTest(test.Id);
                var classrooms = _serviceTeacherClass.GetClassroomsByIdUser(test.IdUser);
                return Ok(new {success = true, test, classrooms, assignClassrooms });
            }
                return Json(new {success = false});
        }

        [HttpGet("[action]/{idTeacher}")]
        public IActionResult GetInitialTest(int idTeacher)
        {
            var teacher = _serviceUser.GetUserById(idTeacher);
            var classrooms = _serviceTeacherClass.GetClassroomsByIdUser(idTeacher);
            var profession = _serviceProfession.getProfessionById(teacher.Id);
            return Json(new { profession, classrooms});
        }

        [HttpGet("all-tests/{idTeacher}")]
        public IActionResult GetAllTest(int idTeacher)
        {
            List<Test> tests = _serviceTest.GetTestsByIdTeacher(idTeacher);
            if (tests != null)
            {
                return Ok(new { success= true, tests });
            }
            return Json(new { success = false });
        }

        [HttpPost]
        public async Task<IActionResult> CreateTest([FromBody] Test test)
        {
            var idTest = await _serviceTest.AddTest(test);
            if (idTest != -1)
            {
                foreach (var question in test.QuestionList)
                {
                    question.IdTest = idTest;
                    await _serviceQuestion.AddQuestion(question);
                }
                foreach (var file in test.Images)
                {
                    SaveImage saveImage = new SaveImage(webHostEnvironment);
                    saveImage.Save(file, file.FileName);
                }
                if (test.IdClassrooms.Count != 0)
                {
                    await _serviceStudentTest.PublishTest(test);
                }
                return Ok(new { success= true, idTest });
            }
            return Json(new { success = false });
        }

        //[HttpPost("[action]")]
        //public IActionResult CreateQuestionImages([FromForm]List<IFormFile> images)
        //{
        //   foreach(var file in images)
        //    {
        //        SaveImage saveImage = new SaveImage(webHostEnvironment);
        //        saveImage.Save(file, file.FileName);
        //    }
        //    return Ok();
        //}

        //[HttpPost("[action]")]
        //public async Task<IActionResult> PublishTest([FromBody] StudentTest studentTest)
        //{
        //    bool isSuccess = await _serviceStudentTest.PublishTest(studentTest);
        //    if (isSuccess)
        //    {
        //        return Ok();
        //    }
        //    return NotFound();
        //}

        [HttpPost("[action]/{idStudent}")]
        public async Task<IActionResult> CheckTest([FromBody] Test test, [FromRoute]int idStudent)
        {
            int grade = await _serviceQuestion.CheckQuestionsTest(test, idStudent);
            if (grade != -1)
            {
                return Ok(new { success= true, grade });
            }
            return Json(new { success = false });

        }

        [HttpPut("{idTest}")]
        public async Task<IActionResult> UpdateTest(int idTest, [FromBody] Test test)
        {
            var updatedTest = await _serviceTest.UpdateTest(idTest, test);
            if (updatedTest != null)
            {
                return Ok(new {success = false, data = updatedTest });
            }
            return Json(new { success = false });

        }
    }
}
