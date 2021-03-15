using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolTestManagementApp.Models
{
    public partial class Question
    {
        public Question()
        {
            QuestionOption = new HashSet<QuestionOption>();
        }

        public int Id { get; set; }
        public string QuestionType { get; set; }
        public string Content1 { get; set; }
        public string Content2 { get; set; }
        public string Content3 { get; set; }
        public string ImageUrl { get; set; }
        public int Value { get; set; }
        public int BlankType { get; set; }
        public int IdTest { get; set; }
        [NotMapped]
        public string Option1 { get; set; }
        [NotMapped]
        public string Option2 { get; set; }
        [NotMapped]
        public string Option3 { get; set; }
        [NotMapped]
        public string Answer1 { get; set; }
        [NotMapped]
        public string Answer2 { get; set; }
        [NotMapped]
        public int UserAnswer1 { get; set; }
        [NotMapped]
        public int UserAnswer2 { get; set; }
        [NotMappedAttribute]
        public IFormFile ImageFile { get; set; }
        [NotMappedAttribute]
        public string CurrentImage { get; set; }

        public virtual Test IdTestNavigation { get; set; }
        public virtual ICollection<QuestionOption> QuestionOption { get; set; }
    }
}
