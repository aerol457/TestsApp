using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
    }
}
