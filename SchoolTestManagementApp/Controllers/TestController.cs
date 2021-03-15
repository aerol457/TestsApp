using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolTestManagementApp.Controllers.TeacherSideServices.ClassroomTest;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService;
using SchoolTestManagementApp.Data.Services.AuthService;
using SchoolTestManagementApp.Data.Services.StudentSideServices.StudentTestService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.QuestionService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TestService;
using SchoolTestManagementApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        private IQuestionRepository _serviceQuestion;
        private ITestRepository _serviceTest;
        private IAuthRepository _serviceUser;
        private IStudentTestRepository _serviceStudentTest;
        private IClassroomTestRepository _serviceClassroomTest;
        private ITeacherClassRepository _serviceTeacherClass;
        private IProfessionRepository _serviceProfession;
        private readonly IWebHostEnvironment webHostEnvironment;
        public TestController(IQuestionRepository serviceQuestion, ITestRepository serviceTest, IWebHostEnvironment hostEnvironment,
                                IAuthRepository serviceUser, IStudentTestRepository serviceStudentTest,
                                    IClassroomTestRepository serviceClassroomTest, ITeacherClassRepository serviceTeacherClass, IProfessionRepository serviceProfession)
        {
            this._serviceQuestion = serviceQuestion;
            this._serviceUser = serviceUser;
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
                _serviceQuestion.GetAllQuestionByIdTest(idTest);
                foreach (var q in test.Question)
                {
                    var distractions = _serviceQuestion.GetQuestionOptions(q.Id).Where(o => o.Type == 1).ToList();
                    var answers = _serviceQuestion.GetQuestionOptions(q.Id).Where(o => o.Type == 2).ToList();
                    q.Option1 = distractions[0].IdOptionNavigation.Content;
                    q.Option2 = distractions[1].IdOptionNavigation.Content;
                    q.Option3 = distractions[2].IdOptionNavigation.Content;
                    q.Answer1 = answers[0].IdOptionNavigation.Content;
                    if (q.QuestionType == "check" || q.QuestionType == "blank")
                    {
                        q.Answer2 = answers[1].IdOptionNavigation.Content;
                    }
                }
                _serviceUser.GetUserById(test.IdUser);
                var assignClassrooms = _serviceClassroomTest.GetClassroomsByIdTest(test.Id);
                var classrooms = _serviceTeacherClass.GetConnectedClassroomsByIdUser(test.IdUser);
                return Ok(new { success = true, test, classrooms, assignClassrooms });
            }
            return Json(new { success = false });
        }

        [HttpGet("[action]/{idTeacher}")]
        public IActionResult GetInitialTest(int idTeacher)
        {
            var teacher = _serviceUser.GetUserById(idTeacher);
            var classrooms = _serviceTeacherClass.GetConnectedClassroomsByIdUser(idTeacher);
            var profession = _serviceProfession.getProfessionById(teacher.Id);
            return Json(new { profession, classrooms });
        }

        [HttpGet("all-tests/{idTeacher}")]
        public IActionResult GetAllTest(int idTeacher)
        {
            List<Test> tests = _serviceTest.GetTestsByIdTeacher(idTeacher);
            if (tests != null)
            {
                return Ok(new { success = true, tests });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Test test)
        {
            var addedTest = await _serviceTest.AddTest(test);
            if (addedTest != null)
            {
                return Ok(new { success = true, test = addedTest });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpPost("[action]/{idStudent}")]
        public async Task<IActionResult> CheckTest([FromBody] Test test, [FromRoute] int idStudent)
        {
            int grade = await _serviceQuestion.CheckQuestionsTest(test, idStudent);
            if (grade != -1)
            {
                return Ok(new { success = true, grade });
            }
            return Json(new { success = false });

        }

        [Authorize]
        [HttpPut]
        public IActionResult Update([FromBody] Test test)
        {
            _serviceTest.UpdateTest(test);
            return Ok();
        }

        [Authorize]
        [HttpPut("[action]/{idTest}")]
        public IActionResult UpdateQuantityOfQuestions([FromBody] Test test , int idTest)
        {
            _serviceTest.UpdateQuantity(idTest, test.QuantityOfQuestions);
            return Ok();
        }
         
        [Authorize]
        [HttpPut("[action]/{idTest}")]
        public IActionResult TestToCancel(int idTest)
        {
            _serviceTest.PostTestToCancel(idTest);
            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var isReqSuccess = await _serviceTest.RemoveTest(id);
            return Ok(new { success = isReqSuccess });
        }
    }
}
