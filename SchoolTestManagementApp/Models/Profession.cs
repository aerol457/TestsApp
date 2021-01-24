using System;
using System.Collections.Generic;

namespace SchoolTestManagementApp.Models
{
    public partial class Profession
    {
        public Profession()
        {
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}
