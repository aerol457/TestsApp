using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ClassService;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService;
using SchoolTestManagementApp.Data.Services.AuthService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        
        private IAuthRepository _service;
        private IProfessionRepository _serviceProfession;
        private IClassRepository _serviceClass;
        private ITeacherClassRepository _serviceTeacherClass;
        private IConfiguration _config;

        public UserController(IAuthRepository service, IConfiguration config, 
                                IProfessionRepository serviceProfession, IClassRepository serviceClass,
                                    ITeacherClassRepository serviceTeacherClass)
        {
            this._service = service;
            this._config = config;
            this._serviceProfession = serviceProfession;
            _serviceClass = serviceClass;
            this._serviceTeacherClass = serviceTeacherClass;
        }

        [HttpPost("[action]")]
        public IActionResult Auth([FromBody] User user)
        {
            var authUser = _service.AuthenticateUser(user.Email, user.PasswordHash);
            if(authUser != null)
            {
                authUser.PasswordHash = "";
                authUser.PasswordSalt = "";
                if (authUser.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)authUser.IdProfession);
                    authUser.Classrooms = _serviceTeacherClass.GetConnectedClassroomsByIdUser(authUser.Id);

                }
                else if(authUser.UserType == "student")
                {
                    _serviceClass.getClassById((int)authUser.IdClassroom);
                }
                Auth auth = new Auth(_config);
                var tokenString = auth.GenerateJSONWebToken(authUser.Email, authUser.DateJoined);
                return Ok(new { success = true,  user = authUser, token = tokenString, expiresIn = 3600 * 24 });
            }
            return Json(new { success= false });
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromForm] User user)
        {
            var isValid = _service.ValidateUser(user, true, -1);
            if(isValid.Count == 0)
            {
                var createdUser = await _service.Add(user); 
                if (createdUser.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)createdUser.IdProfession);
                    _serviceTeacherClass.GetConnectedClassroomsByIdUser(user.Id);

                }
                else if (createdUser.UserType == "student")
                {
                    _serviceClass.getClassById((int)createdUser.IdClassroom);
                }
                createdUser.PasswordHash = "";
                createdUser.PasswordSalt = "";
                Auth auth = new Auth(_config);
                var tokenString = auth.GenerateJSONWebToken(createdUser.Email, createdUser.DateJoined);
                return Ok(new { success = true, user = createdUser, token = tokenString, expiresIn = 3600 * 24 });
            }
            return Json(new {success = false, errors= isValid });
        }


        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _service.GetUserById(id);
            if(user != null)
            {
                user.PasswordHash = "";
                user.PasswordSalt = "";
                if (user.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)user.IdProfession);
                }
                else if (user.UserType == "student")
                {
                    _serviceClass.getClassById((int)user.IdClassroom);
                }
                return Ok(new { success=true, user });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpGet("[action]/{id}")]
        public IActionResult GetUserAndConnectedClassrooms(string id)
        {
            var user = _service.GetUserByIdCard(id);
            if (user != null)
            {
                user.PasswordHash = "";
                user.PasswordSalt = "";
                var classrooms = new List<Classroom>();
                if (user.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)user.IdProfession);
                    classrooms = _serviceTeacherClass.GetConnectedClassroomsByIdUser(user.Id);
                }
                else if (user.UserType == "student")
                {
                    classrooms.Add(_serviceClass.getClassById((int)user.IdClassroom));
                }
                return Ok(new { success = true, user, classrooms });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpGet("[action]/{id}")]
        public IActionResult GetStudent(string id)
         {
            var student = _service.GetUserByIdCard(id);
            if(student != null)
            {
                student.PasswordHash = "";
                student.PasswordSalt = "";

                return Ok(new { success = false, student });
            }
            return Json(new { success = false });
        }

        [Authorize]
        [HttpPut("[action]")]
        public async Task<IActionResult> Update([FromForm] User user)
        {
             var isValid = _service.ValidateUser(user, false, user.Id);
            if (isValid.Count == 0)
            {
                var updatedUser = await _service.UpdateUser(user);
                updatedUser.PasswordHash = "";
                updatedUser.PasswordSalt = "";
                if (updatedUser.UserType == "teacher")
                {
                    updatedUser.IdProfessionNavigation =  _serviceProfession.getProfessionById((int)updatedUser.IdProfession);

                }
                else if (updatedUser.UserType == "student")
                {
                    updatedUser.IdClassroomNavigation =  _serviceClass.getClassById((int)updatedUser.IdClassroom);
                }
                return Ok(new { success = true, user = updatedUser});
            }
            return Json(new { success = false, errors = isValid});
        }

        [HttpPut("[action]")]
        public IActionResult CheckValidCredentials([FromBody] User user)
        {
            var authUser =  _service.AuthenticateUser(user.Email, user.PasswordHash);
            return Ok(new { success = authUser != null });
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> UpdateClass([FromBody] User user)
        {
            var isUpdate = await _service.UpdateUserClass(user);
            return Ok(new { success = isUpdate });
        }



    }
}
