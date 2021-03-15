using Microsoft.AspNetCore.Hosting;
using SchoolTestManagementApp.Controllers.Services.utils;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AuthService
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ExamDataContext _context;
        private readonly IWebHostEnvironment webHostEnvironment;
        public AuthRepository(ExamDataContext context, IWebHostEnvironment hostEnvironment)
        {
            this._context = context;
            this.webHostEnvironment = hostEnvironment;
        }

        public List<string> ValidateUser(User user, bool isAdd, int idUser)
        {
            Validators validate = new Validators(_context);
            return validate.ValidateUser(user, isAdd, idUser);
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
                if (user.ImageFile != null && user.ImageUrl != "")
                {
                    ImageFile image = new ImageFile(webHostEnvironment);
                    image.Save(user.ImageFile, user.ImageUrl);
                }
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

        public async Task<User> UpdateUser(User user)
        {
            try
            {
                var updateUser = _context.User.Find(user.Id);
                if(user.PasswordHash != "")
                {
                    Auth encryptPass = new Auth(null);
                    var salt = encryptPass.CreateSalt(10);
                    var hash = encryptPass.GenerateSHA256Hash(user.PasswordHash, salt);
                    updateUser.PasswordSalt = salt;
                    updateUser.PasswordHash = hash;
                }
                if(user.ImageFile != null && user.ImageUrl != null)
                {
                    ImageFile image = new ImageFile(webHostEnvironment);
                    image.Save(user.ImageFile, user.ImageUrl);
                    updateUser.ImageUrl = user.ImageUrl;
                }
                updateUser.Name = user.Name;
                updateUser.PhoneNumber = user.PhoneNumber;
                updateUser.IdCard = user.IdCard;
                updateUser.Email = user.Email;
                updateUser.City = user.City;
                updateUser.Address = user.Address;
                await _context.SaveChangesAsync();
                return updateUser;
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

        public User GetUserByIdCard(string idCard)
        {
            return _context.User.Where(u => u.IdCard == idCard).FirstOrDefault();
        }

        public async Task<bool> UpdateUserClass(User user)
        {
            var updateUser = await _context.User.FindAsync(user.Id);
            if(updateUser != null)
            {
                updateUser.IdClassroom = user.IdClassroom;
                _context.User.Update(updateUser);
            }
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
