using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class QuestionsTestArchive
    {
        public int Id { get; set; }
        public string IdQuestion { get; set; }
        public string IdTest { get; set; }
        public int QuestionNumber { get; set; }
        public string QuestionType { get; set; }
        public string Content1 { get; set; }
        public string Content2 { get; set; }
        public string Content3 { get; set; }
        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public int Value { get; set; }
    }
}
