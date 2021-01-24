using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class Classroom
    {
        public Classroom()
        {
            ClassroomTest = new HashSet<ClassroomTest>();
            TeacherClassroom = new HashSet<TeacherClassroom>();
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ClassroomTest> ClassroomTest { get; set; }
        public virtual ICollection<TeacherClassroom> TeacherClassroom { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
