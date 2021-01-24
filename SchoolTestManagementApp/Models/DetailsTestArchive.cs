using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class DetailsTestArchive
    {
        public string IdTest { get; set; }
        public string Name { get; set; }
        public int QuantityOfQuestions { get; set; }
        public DateTime? DateOfSubmission { get; set; }
        public DateTime DateOfDistribution { get; set; }
        public long Time { get; set; }
        public int IdTeacher { get; set; }
        public string ProfessionName { get; set; }
    }
}
