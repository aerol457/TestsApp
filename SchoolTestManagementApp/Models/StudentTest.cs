using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolTestManagementApp.Models
{
    public partial class StudentTest
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public int IdTest { get; set; }
        public int Grade { get; set; }
        public bool IsPass { get; set; }
        public bool IsDone { get; set; }

        public virtual Test IdTestNavigation { get; set; }
    }
}
