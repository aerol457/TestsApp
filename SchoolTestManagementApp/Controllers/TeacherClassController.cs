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

        //[HttpGet("{idUser}")]
        //public IActionResult GetClassrooms(int idUser)
        //{
        //    var classrooms = _service.GetClassroomsByIdUser(idUser);
        //    if (classrooms != null)
        //    {
        //        return CreatedAtAction(nameof(GetClassrooms), new { classrooms });
        //    }
        //    return Unauthorized();
        //}

        //[HttpGet("[action]/{idTest}")]
        //public IActionResult GetClassroomsAssignToTest(int idTest)
        //{
        //    var classrooms = _serviceClassTest.GetClassroomsByIdTest(idTest);
        //    if (classrooms != null)
        //    {
        //        return CreatedAtAction(nameof(GetClassrooms), new { classrooms });
        //    }
        //    return Unauthorized();
        //}

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

        //Dont use
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacherClass(int id, [FromBody] TeacherClassroom teacherClass)
        {
            var updatedTeacher = await _service.UpdateStudent(id, teacherClass);
            if(updatedTeacher != null)
            {
                return Ok(new { data = updatedTeacher});
            }
            return NotFound();
        }
    }
}
