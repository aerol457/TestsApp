using System;
using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SchoolTestManagementApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/profession")]
    public class ProfessionContoller : Controller
    {
        private IProfessionRepository _service;
        public ProfessionContoller(IProfessionRepository service)
        {
            this._service = service;
        }

        [HttpGet]
        public IActionResult GetAllProfession()
        {
            List<Profession> getProfessions = _service.getAllProfession();
            if (getProfessions != null)
            {
                return Ok(new { professions = getProfessions });
            }
            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult GetProfessionById(int id)
        {
            var getProfession = _service.getProfessionById(id);
            if (getProfession != null)
            {
                return Ok(new { profession = getProfession });
            }
            return NotFound();
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create([FromBody] Profession profession)
        {
            var getProfession = _service.Add(profession.Name);
            if (getProfession != null)
            {
                return Ok(new { success = true, profession = getProfession });
            }
            return Json(new { success = false });
        }
    }
}
