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

        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] Question question)
        {
            var idQuestion = await _service.AddQuestion(question);
            if(idQuestion != -1)
            {
                return CreatedAtAction(nameof(CreateQuestion), new { id = idQuestion });
            }
            return Unauthorized();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateQuestion(int id, [FromBody] Question question)
        {
            var updatedQuestion = await _service.UpdateQuestion(id, question);
            if (updatedQuestion != null)
            {
                return Ok(new { data = updatedQuestion});
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            var isReqSuccess = await _service.DeleteQuestion(id);
            if (isReqSuccess)
            {
                return Ok();
            }
            return NotFound();
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
