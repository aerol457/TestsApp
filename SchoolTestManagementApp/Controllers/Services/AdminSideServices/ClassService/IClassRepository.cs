using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AdminSideServices.ClassService
{
    public interface IClassRepository
    {
        List<Classroom> getAllClass();
        Classroom getClassById(int idClass);
    }
}
