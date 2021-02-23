using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers.TeacherSideServices.ClassroomTest
{
    public interface IClassroomTestRepository
    {
        List<int> GetClassroomsByIdTest(int IdTest);
    }
}
