using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class ClassroomTest
    {
        public int Id { get; set; }
        public int IdTest { get; set; }
        public int IdClassroom { get; set; }

        public virtual Classroom IdClassroomNavigation { get; set; }
        public virtual Test IdTestNavigation { get; set; }
    }
}
