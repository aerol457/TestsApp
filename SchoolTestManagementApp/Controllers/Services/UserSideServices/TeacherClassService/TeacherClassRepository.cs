﻿using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.TeacerSideServices.TeacherClassService
{
    public class TeacherClassRepository : ITeacherClassRepository
    {
        private readonly ExamDataContext context;

        public TeacherClassRepository(ExamDataContext context)
        {
            this.context = context;
        }

        public List<User> GetStudentsByIdUser(int idUser)
        {
            try
            {
                var classes = GetConnectedClassroomsByIdUser(idUser);
                if(classes == null)
                {
                    return null;
                }
                List<User> students = new List<User>();
                List<User> allStudents = new List<User>();
                foreach(var classroom in classes)
                {
                    allStudents.AddRange(context.User.Where(s => s.IdClassroom == classroom.Id).ToList());                
                }
                return allStudents;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }

        public async Task<TeacherClassroom> UpdateStudent(int idTeacherClassroom, TeacherClassroom teacherClassroom)
        {
            try
            {
                var oldTeacherClassroom = context.TeacherClassroom.FirstOrDefault(tc => tc.Id == idTeacherClassroom);
                if (oldTeacherClassroom != null)
                {
                    oldTeacherClassroom.IdClassroom = teacherClassroom.IdClassroom;
                    oldTeacherClassroom.IdUser = teacherClassroom.IdUser;
                    await context.SaveChangesAsync();
                    return oldTeacherClassroom;
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: ", ex.Message);
                return null;
            }
        }
        public List<Classroom> GetConnectedClassroomsByIdUser(int idUser)
        {
            try
            {
                List<Classroom> classroomList = new List<Classroom>();
                classroomList = context.Classroom.Join(context.TeacherClassroom,
                                                                       tc => tc.Id,
                                                                       c => c.IdClassroom,
                                                                       (tc, c) => new { classroom = tc, teacherClass = c })
                                                                       .Where(ssa => ssa.teacherClass.IdUser == idUser)
                                                                       .Select(ssa => ssa.classroom).ToList();
                
                return classroomList;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }

        public async Task<TeacherClassroom> AddTeacherClassroom(int idTeacher, int idClass)
        {
            var teacher = context.User.Find(idTeacher);
            var classroom = context.Classroom.Find(idClass);
            if(teacher != null && classroom != null)
            {
                var teacherClass = new TeacherClassroom();
                teacherClass.IdClassroom = idClass;
                teacherClass.IdUser = idTeacher;
                context.TeacherClassroom.Add(teacherClass);
                await context.SaveChangesAsync();
                return teacherClass;
            }
            return null;
        }

        public void RemoveTeacherClassroom(int idTeacher, int idClass)
        {
            var teacherClass = context.TeacherClassroom.Where(tc => tc.IdClassroom == idClass && tc.IdUser == idTeacher).FirstOrDefault();
            context.TeacherClassroom.Remove(teacherClass);
            context.SaveChanges();
        }
    }
}
