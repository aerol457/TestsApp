using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService;
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
        private readonly IWebHostEnvironment webHostEnvironment;
        public TestController(IQuestionRepository serviceQuestion, ITestRepository serviceTest, IWebHostEnvironment hostEnvironment, IUserRepository serviceUser, IStudentTestRepository serviceStudentTest)
        {
            this._serviceQuestion = serviceQuestion;
            this._serviceUser= serviceUser;
            this._serviceTest = serviceTest;
            this._serviceStudentTest = serviceStudentTest;
            this.webHostEnvironment = hostEnvironment;
        }


        [HttpPost("{idUser}")]
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
                return CreatedAtAction(nameof(CreateTest), new { idTest });
            }
            return Unauthorized();
        }

        [HttpPost("[action]")]
        public IActionResult CreateQuestionImages([FromForm]List<IFormFile> images)
        {
           foreach(var file in images)
            {
                SaveImage saveImage = new SaveImage(webHostEnvironment);
                saveImage.Save(file, file.FileName);
            }
            return Ok();
        }

        [HttpPut("{idTest}")]
        public async Task<IActionResult> UpdateTest(int idTest, [FromBody] Test test)
        {
            var updatedTest = await _serviceTest.UpdateTest(idTest, test);
            if(updatedTest != null)
            {
                return Ok(new { data = updatedTest });
            }
            return Unauthorized();
        }

        [HttpGet("{idTest}")]
        public IActionResult GetTest(string idTest)
        {
            var test = _serviceTest.GetTestById(idTest);
            if (test != null)
            {
                return Ok(new { success= "true", test });
            }
            return Json(new { success= "false"});
        }

        [HttpGet("[action]/{idTest}")]
        public IActionResult GetFullTest(int idTest)
        {
            var test = _serviceTest.GetTestByIdTest(idTest);
            if (test != null)
            {
                _serviceQuestion.GetAllQuestionByIdTest(test.Id);
                _serviceUser.GetUserById(test.IdUser);
                return Ok(new { test});
            }
            return NotFound();
        }

        [HttpGet("all-tests/{idTeacher}")]
        public IActionResult GetAllTest(int idTeacher)
        {
            List<Test> tests = _serviceTest.GetTestsByIdTeacher(idTeacher);
            if (tests != null)
            {
                return Ok(new { tests });
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> PublishTest([FromBody] StudentTest studentTest)
        {
            bool isSuccess = await _serviceStudentTest.AddStudentTest(studentTest);
            if (isSuccess)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
