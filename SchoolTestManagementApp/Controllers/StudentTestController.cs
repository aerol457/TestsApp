using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService;
using SchoolTestManagementApp.Data.Services.AuthService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentTestController : Controller
    {
        private IStudentTestRepository _service;
        private ITestRepository _serviceTest;
        private IAuthRepository _serviceUser;
        public StudentTestController(IStudentTestRepository service, ITestRepository serviceTest, IAuthRepository serviceUser)
        {
            this._service = service;
            this._serviceTest = serviceTest;
            this._serviceUser = serviceUser;
        }

        [Authorize]
        [HttpPost("{idTest}")]
        public IActionResult PublishTestToStudents([FromBody] List<int> idClassrooms, int idTest)
        {
            _service.PublishTest(idClassrooms, idTest);
            return Ok();
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudentTest(int id, [FromBody] StudentTest studentTest)
        {
            var updatedStudentTest = await _service.UpdateStudentTest(id, studentTest);
            return Json(new { success = updatedStudentTest });

        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudentTest(int id)
        {
            var isReqSuccess = await _service.DeleteStudentTest(id);
            return Json(new { success = isReqSuccess });
        }

        [HttpGet("{id}")]
        public IActionResult GetStudentTestById(int id)
        {
            var test = _service.GetTest(id);
            if (test != null)
            {
                _serviceUser.GetUserById(test.IdUser);
                return Ok(new { success= true,test});
            }
            return Json(new { success = false });
        }

        [HttpGet("GetTests/{id}")]
        public IActionResult GetAllStudentTestsById(int id, string userType, int idUser)
        {
            var listTestStudent = _service.GetAllTests(id);
            if (listTestStudent != null)
            {
                List<Test> tests = new List<Test>();
                foreach(var studentTest in listTestStudent)
                {
                    var test =_serviceTest.GetTestByIdTest(studentTest.IdTest);
                    _serviceUser.GetUserById(test.IdUser);
                    string teacherName = test.IdUserNavigation.Name;
                    test.IdUserNavigation = null;
                    test.TeacherName = teacherName;

                    if ((test.IsAccess && !test.IsCancel && userType != "teacher") || 
                        (userType  == "teacher" && test.IdUser == idUser))
                    {
                        tests.Add(test);
                    }
                }
                return Ok(new {success= true, tests });
            }
            return Json(new { success = false });
        }
    }
}
