using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private IQuestionRepository _service;
        public QuestionController(IQuestionRepository service)
        {
            this._service = service;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Question question)
        {
            var addedQuestion = await _service.AddQuestion(question);
            if(addedQuestion != null)
            {
                return Ok(new { success = true, question = addedQuestion });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpPut]
        public IActionResult Update([FromForm] Question question)
        {
            _service.UpdateQuestion(question);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isReqSuccess = await _service.DeleteQuestion(id);
            return Ok(new { success = isReqSuccess});
        }

        [HttpGet("{id}")]
        public IActionResult GetQuestionById(int id)
        {
            var question = _service.GetQuestionById(id);
            if(question != null)
            {
                return Ok(new { data = question });
            }
            return NotFound();
        }
    }
}
