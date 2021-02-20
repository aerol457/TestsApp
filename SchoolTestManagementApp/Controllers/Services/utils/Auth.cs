using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace SchoolTestManagementApp.Controllers.Services.utils
{
    public class Auth
    {
        private IConfiguration _config;
        public Auth(IConfiguration config)
        {
            this._config = config;
        }

        #region Hash Password
        public string CreateSalt(int size)
        {
            var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
            var buff = new byte[size];
            rng.GetBytes(buff);
            return Convert.ToBase64String(buff);
        }
        public string GenerateSHA256Hash(string password, string salt)
        {
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(password + salt);
            System.Security.Cryptography.SHA256Managed sha256hashstring =
                    new System.Security.Cryptography.SHA256Managed();
            byte[] hash = sha256hashstring.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
        #endregion

        #region Check Valid Password
        public bool CheckPassword(string holdHash, string salt, string password)
        {
            byte[] bytes = System.Text.Encoding.UTF8.GetBytes(password + salt);
            System.Security.Cryptography.SHA256Managed sha256hashstring =
                    new System.Security.Cryptography.SHA256Managed();
            byte[] hash = sha256hashstring.ComputeHash(bytes);
            return holdHash == Convert.ToBase64String(hash);
        }

        #endregion

        public string GenerateJSONWebToken(string email, DateTime dateTime)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Email, email),
        new Claim("DateOfJoing", dateTime.ToString("yyyy-MM-dd")),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        public void SendVerifyEmail()
        {
            //using (MailMessage mail = new MailMessage())
            //{
            //    mail.From = new MailAddress("harelnahari@gmail.com"); //enter whatever email you are sending from here 
            //    mail.To.Add("Request for Verification"); //Text box that the user enters their email address 
            //    mail.Subject = "Email Subject"; //enter whatever subject you would like 
            //    mail.Body = "<p> Dear ......</p> <br> <p> Enter message here </p>";
            //    mail.IsBodyHtml = true;

            //    using (SmtpClient smtp = new SmtpClient("harelnahari@gmail.com", 587)) //enter the same email that the message is sending from along with port 587
            //    {
            //        smtp.Credentials = new NetworkCredential("harelnahari@gmail.com", "myNala457"); //Enter email with password 
            //        smtp.Enablessl = true;
            //        smtp.Send(mail);
            //    }

            //}
        }
    }
}
