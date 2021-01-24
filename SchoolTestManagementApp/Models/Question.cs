using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class Question
    {
        public int Id { get; set; }
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
        public string ImageUrl { get; set; }
        public int Value { get; set; }
        public int IdTest { get; set; }

        public virtual Test IdTestNavigation { get; set; }
    }
}
