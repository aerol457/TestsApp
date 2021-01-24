using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class TeacherClassroom
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdClassroom { get; set; }

        public virtual Classroom IdClassroomNavigation { get; set; }
        public virtual User IdUserNavigation { get; set; }
    }
}
