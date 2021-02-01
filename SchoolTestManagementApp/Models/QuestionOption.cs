using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class QuestionOption
    {
        public int Id { get; set; }
        public int IdQuestion { get; set; }
        public int IdOption { get; set; }
        public int Type { get; set; }

        public virtual Option IdOptionNavigation { get; set; }
        public virtual Question IdQuestionNavigation { get; set; }
    }
}
