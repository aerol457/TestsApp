using Microsoft.AspNetCore.Http;
using SchoolTestManagementApp.Controllers;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AuthService
{
    public interface IAuthRepository
    {
        Task<User> Add(User user);
        Task<User> Update(int idUser, User user);
        Task<bool> UpdateUserClass(User user);
        User GetUserById(int idUser);
        User GetUserByIdCard(string idCard);
        User AuthenticateUser(string email, string password);
        List<string> ValidateUser(User user);
    }
}
