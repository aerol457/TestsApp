using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService;
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
    public class StudentTestController : Controller
    {
        private IStudentTestRepository _service;
        private ITestRepository _serviceTest;
        private IUserRepository _serviceUser;
        public StudentTestController(IStudentTestRepository service, ITestRepository serviceTest, IUserRepository serviceUser)
        {
            this._service = service;
            this._serviceTest = serviceTest;
            this._serviceUser = serviceUser;
        }

        //[HttpPost]
        //public async Task<IActionResult> CreateStudentTest([FromBody] StudentTest studentTest)
        //{
        //    var isSuccess= await _service.AddStudentTest(studentTest);
        //    if (isSuccess)
        //    {
        //        return Ok(new { success=true,id = studentTest.Id });
        //    }
        //    return Json(new { success = false });
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudentTest(int id, [FromBody] StudentTest studentTest)
        {
            var updatedStudentTest = await _service.UpdateStudentTest(id, studentTest);
            return Json(new { success = updatedStudentTest });

        }

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
        public IActionResult GetAllStudentTestsById(int id)
        {
            var listTestStudent = _service.GetAllTests(id);
            if (listTestStudent != null)
            {
                List<Test> tests = new List<Test>();
                foreach(var studentTest in listTestStudent)
                {
                    var test =_serviceTest.GetTestByIdTest(studentTest.IdTest);
                    _serviceUser.GetUserById(test.IdUser);
                    tests.Add(test);

                }
                return Ok(new {success= true, tests });
            }
            return Json(new { success = false });
        }
    }
}
