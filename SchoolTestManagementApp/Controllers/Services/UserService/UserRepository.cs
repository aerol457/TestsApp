using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SchoolTestManagementApp.Controllers;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Data.Services.UserService;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherService
{
    public class UserRepository : IUserRepository
    {
        private readonly ExamDataContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;
        public UserRepository(ExamDataContext context, IWebHostEnvironment hostEnvironment)
        {
            this._context = context;
            this.webHostEnvironment = hostEnvironment;
        }

        public List<string> ValidateUser(User user)
        {
            Validators validate = new Validators(_context);
            return validate.ValidateUser(user);
        }

        public async Task<User> Add(User user)
        {
            try
            {
                Auth encryptPass = new Auth(null);
                var salt = encryptPass.CreateSalt(10);
                var hash = encryptPass.GenerateSHA256Hash(user.PasswordHash, salt);
                user.PasswordSalt = salt;
                user.PasswordHash = hash;
                user.DateJoined = DateTime.Now;
                SaveImage image = new SaveImage(webHostEnvironment);
                image.Save(user.ImageFile, user.ImageUrl);
                _context.User.Add(user);
                await _context.SaveChangesAsync();
                return user;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public User GetUserById(int idUser)
        {
            try
            {
                return _context.User.FirstOrDefault(t => t.Id == idUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public async Task<User> Update(int idUser, User user)
        {
            try
            {
                var oldUser = _context.User.FirstOrDefault(t => t.Id == idUser);
                if (oldUser != null)
                {
                    oldUser.IdCard = user.IdCard;
                    oldUser.City = user.City;
                    oldUser.Address = user.Address;
                    oldUser.Name = user.Name;
                    oldUser.PhoneNumber = user.PhoneNumber;
                    oldUser.ImageUrl= user.ImageUrl;
                    oldUser.IdProfession = user.IdProfession;
                    await _context.SaveChangesAsync();
                    return oldUser;
                }
                return null;
            }
            catch(Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;                
            }
        }

        public User AuthenticateUser(string email, string password)
        {
            try
            {
                Auth encryptPass = new Auth(null);
                bool isAuth = false; ;
                var userIsExits = _context.User.FirstOrDefault(t => t.Email == email);
                if (userIsExits != null)
                {
                    isAuth = encryptPass.CheckPassword(userIsExits.PasswordHash, userIsExits.PasswordSalt, password);
                    if (isAuth)
                    {
                        return userIsExits;
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public User GetStudentByIdCard(string idCard)
        {
            return _context.User.Where(u => u.IdCard == idCard).FirstOrDefault();
        }
    }
}
