using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService
{
    public interface ITeacherClassRepository
    {
        Task<TeacherClassroom> UpdateStudent(int idTeacherClassroom, TeacherClassroom teacherClassroom);
        List<Classroom> GetClassroomsByIdUser(int idUser);
        List<User> GetStudentsByIdUser(int idUser);

    }
}
