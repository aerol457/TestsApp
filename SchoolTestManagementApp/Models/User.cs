using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolTestManagementApp.Models
{
    public partial class User
    {
        public User()
        {
            TeacherClassroom = new HashSet<TeacherClassroom>();
            Test = new HashSet<Test>();
        }

        public int Id { get; set; }
        public string IdCard { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string ImageUrl { get; set; }
        public string PhoneNumber { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime DateJoined { get; set; }
        public int? IdClassroom { get; set; }
        public int? IdProfession { get; set; }
        public string UserType { get; set; }
        [NotMappedAttribute]
        public IFormFile ImageFile { get; set; }

        public virtual Classroom IdClassroomNavigation { get; set; }
        public virtual Profession IdProfessionNavigation { get; set; }
        public virtual ICollection<TeacherClassroom> TeacherClassroom { get; set; }
        public virtual ICollection<Test> Test { get; set; }
    }
}
