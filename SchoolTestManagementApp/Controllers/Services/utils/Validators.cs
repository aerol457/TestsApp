using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers.Services.utils
{
    public class Validators
    {
        private readonly ExamDataContext _context;
        public Validators(ExamDataContext context)
        {
            this._context = context;
        }
        #region IsVaild?

        public List<string> ValidateUser(User user)
        {
            List<string> errors = new List<string>();
            if (!AllAttrFill(user))
            {
                errors.Add("all");
            }
            if (IsValidEmail(user.Email))
            {
                User emailExits = _context.User
                    .Where(u => u.Email == user.Email)
                    .FirstOrDefault();
                if (emailExits != null)
                {
                    errors.Add("email");
                }
            }
            if (!IsValidPassword(user.PasswordHash))
            {
                errors.Add("password");
            }
            if (!IsValidID(user.IdCard))
            {
                User idCardExits = _context.User
                    .Where(u => u.IdCard == user.IdCard)
                    .FirstOrDefault();
                if (idCardExits != null)
                {
                    errors.Add("idCard");
                }
            }
            if (!IsVaildPhoneNumber(user.PhoneNumber))
            {
                errors.Add("phoneNumber");
            }
            return errors;
        }

        #endregion

        #region Check Valid Id Card
        private bool IsValidID(string id)
        {
            if (7 < id.Length && id.Length <= 10)
            {
                var isExits = _context.User.Where(u => u.IdCard == id).FirstOrDefault();
                if(isExits == null)
                {
                    return true;
                }
            }
            return false;
        }

        #endregion

        #region IsVaildPhoneNumber

        public bool IsVaildPhoneNumber(string phoneNumber)
        {
            if (phoneNumber.Length == 10 && int.TryParse(phoneNumber, out int result))
            {
                return true;
            }
            return false;
        }

        #endregion

        #region Check Vaild Email

        public bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        #endregion

        #region Check Vaild Password

        public bool IsValidPassword(string password)
        {
            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasLowerChar = new Regex(@"[a-z]+");
            var hasMinimum8Chars = new Regex(@".{6,15}");

            return hasNumber.IsMatch(password) && hasUpperChar.IsMatch(password) && hasLowerChar.IsMatch(password) && hasMinimum8Chars.IsMatch(password);
        }

        #endregion

        #region Check If All Attributes Are Filled

        private bool AllAttrFill(User user)
        {
            if (user.IdCard == "" || user.Name == "" || user.Email == "" || user.PasswordHash == "" || user.PhoneNumber == "" || user.City == "" || user.Address == "")
            {
                return false;
            }
            if (user.UserType.ToLower() == "student" && user.IdClassroom == null)
            {
                return false;
            }
            if (user.IdProfession == null && user.UserType.ToLower() == "teacher")
            {
                return false;
            }
            return true;
        }

        #endregion
    }
}
