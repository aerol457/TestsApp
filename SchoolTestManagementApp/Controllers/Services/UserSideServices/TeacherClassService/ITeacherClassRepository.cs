using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService
{
    public interface ITeacherClassRepository
    {
        Task<TeacherClassroom> AddTeacherClassroom(int idTeacher, int idClass);
        void RemoveTeacherClassroom(int idTeacher, int idClass);
        Task<TeacherClassroom> UpdateStudent(int idTeacherClassroom, TeacherClassroom teacherClassroom);
        List<Classroom> GetConnectedClassroomsByIdUser(int idUser);
        List<User> GetStudentsByIdUser(int idUser);

    }
}
