using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolTestManagementApp.Models
{
    public partial class Test
    {
        public Test()
        {
            ClassroomTest = new HashSet<ClassroomTest>();
            Question = new HashSet<Question>();
            StudentTest = new HashSet<StudentTest>();
        }

        public int Id { get; set; }
        public string IdTest { get; set; }
        public string Name { get; set; }
        public int QuantityOfQuestions { get; set; }
        public DateTime DateOfSubmission { get; set; }
        public DateTime DateOfDistribution { get; set; }
        public long Time { get; set; }
        public int IdUser { get; set; }
        public int PassingGrade { get; set; }
        public string ProfessionName { get; set; }
        public bool IsAccess { get; set; }
        public bool IsCancel { get; set; }
        public bool Archive { get; set; }
        [NotMappedAttribute]
        public List<Question> QuestionList { get; set; } 
        [NotMappedAttribute]
        public string TeacherName { get; set; }

        public virtual User IdUserNavigation { get; set; }
        public virtual ICollection<ClassroomTest> ClassroomTest { get; set; }
        public virtual ICollection<Question> Question { get; set; }
        public virtual ICollection<StudentTest> StudentTest { get; set; }
    }
}
