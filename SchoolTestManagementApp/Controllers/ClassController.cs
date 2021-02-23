using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ClassService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private IClassRepository _service;
        public ClassController(IClassRepository service)
        {
            this._service = service;
        }

        [HttpGet]
        public IActionResult GetAllClass()
        {
            var classes = _service.getAllClass();
            if (classes != null)
            {
                return Ok(new { classrooms = classes });
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetClassById(int id)
        {
            var getClass = _service.getClassById(id);
            if (getClass != null)
            {
                return Ok(new { classroom = getClass });
            }
            return NotFound();
        }

        [HttpPost]
        public IActionResult Create([FromBody] Classroom classroom)
        {
            var getClassroom = _service.Add(classroom.Name);
            if (getClassroom != null)
            {
                return Ok(new { success = true, classroom = getClassroom });
            }
            return Json(new { success = false });
        }
    }


}
