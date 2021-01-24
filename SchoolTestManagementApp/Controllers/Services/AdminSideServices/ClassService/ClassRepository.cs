using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AdminSideServices.ClassService
{
    public class ClassRepository : IClassRepository
    {
        private readonly ExamDataContext context;
        public ClassRepository(ExamDataContext context)
        {
            this.context = context;
        }

        public List<Classroom> getAllClass()
        {
            return context.Classroom.ToList();
        }

        public Classroom getClassById(int idClass)
        {
            Classroom getClass = context.Classroom.FirstOrDefault(c => c.Id == idClass);
            return getClass;
        }
    }   
}
