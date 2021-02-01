using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ClassService;
using SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService;
using SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherService;
using SchoolTestManagementApp.Data.Services.UserService;
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
        
        private IUserRepository _service;
        private IProfessionRepository _serviceProfession;
        private IClassRepository _serviceClass;
        private IConfiguration _config;

        public UserController(IUserRepository service, IConfiguration config, IProfessionRepository serviceProfession, IClassRepository serviceClass)
        {
            this._service = service;
            this._config = config;
            this._serviceProfession = serviceProfession;
            _serviceClass = serviceClass;
        }

        [HttpPost("[action]")]
        public IActionResult Auth([FromBody] User user)
        {
            var authUser = _service.AuthenticateUser(user.Email, user.PasswordHash);
            if(authUser != null)
            {
                if(authUser.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)authUser.IdProfession);

                }else if(authUser.UserType == "student")
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
            var isValid = _service.ValidateUser(user);
            if(isValid == null)
            {
                var createdUser = await _service.Add(user); 
                if (createdUser.UserType == "teacher")
                {
                    _serviceProfession.getProfessionById((int)createdUser.IdProfession);

                }
                else if (createdUser.UserType == "student")
                {
                    _serviceClass.getClassById((int)createdUser.IdClassroom);
                }
                Auth auth = new Auth(_config);
                var tokenString = auth.GenerateJSONWebToken(createdUser.Email, createdUser.DateJoined);
                return CreatedAtAction(nameof(SignUp), new { user = createdUser, token = tokenString, expiresIn = 3600 * 24 });
            }
            return Json(new {errors= isValid });
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _service.GetUserById(id);
            if(user != null)
            {
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            var updatedUser = await _service.Update(id, user);
            if(updatedUser != null)
            {
                return Ok(new { success = true, user = updatedUser });
            }
            return Json(new { success = false});
        }

    }
}
