using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Controllers.TeacherSideServices.ClassroomTest;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherClassController : Controller
    {
        private ITeacherClassRepository _service;
        private IClassroomTestRepository _serviceClassTest;
        public TeacherClassController(ITeacherClassRepository service, IClassroomTestRepository serviceClassTest)
        {
            this._service = service;
            this._serviceClassTest = serviceClassTest;
        }

        [HttpGet("GetStudents/{idUser}")]
        public IActionResult GetStudentsByIdTeacher(int idUser)
        {
            var students = _service.GetStudentsByIdUser(idUser);
            if (students != null)
            {
                return Ok(new { students });
            }
            return Unauthorized();
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] User user)
        {
            var teacherClass = await _service.AddTeacherClassroom(user.Id, (int)user.IdClassroom);
            if (teacherClass != null)
            {
                return Ok(new { success = true, teacherClass });
            }
            return Json(new { success = false });
        }

        [HttpPost("[action]")]
        public IActionResult Remove([FromBody] User user)
        {
            _service.RemoveTeacherClassroom(user.Id, (int)user.IdClassroom);
            return Ok();
        }
    }
}
