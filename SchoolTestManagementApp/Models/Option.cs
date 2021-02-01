using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class Option
    {
        public Option()
        {
            QuestionOption = new HashSet<QuestionOption>();
        }

        public int Id { get; set; }
        public string Content { get; set; }

        public virtual ICollection<QuestionOption> QuestionOption { get; set; }
    }
}
