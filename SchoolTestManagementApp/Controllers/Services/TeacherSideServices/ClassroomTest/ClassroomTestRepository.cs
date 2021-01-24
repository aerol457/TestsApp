using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers.TeacherSideServices.ClassroomTest
{
    public class ClassroomTestRepository : IClassroomTestRepository
    {
        private readonly ExamDataContext context;

        public ClassroomTestRepository(ExamDataContext _context)
        {
            this.context = _context;
        }
        public List<int> GetClassroomsByIdTest(int IdTest)
        {
            var ct = context.ClassroomTest.Where(t => t.IdTest == IdTest).ToList();
            List<int> list = new List<int>();
            foreach(var c in ct)
            {
                list.Add(c.IdClassroom);
            }
            return list;
        }
    }
}
