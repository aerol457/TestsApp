﻿using Microsoft.AspNetCore.Http;
using SchoolTestManagementApp.Controllers;
using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.UserService
{
    public interface IUserRepository
    {
        Task<User> Add(User user);
        Task<User> Update(int idUser, User user);
        User GetUserById(int idUser);
        User GetStudentByIdCard(string idCard);
        User AuthenticateUser(string email, string password);
        List<string> ValidateUser(User user);
    }
}
