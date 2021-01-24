using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Controllers.Services.utils
{
    public class SaveImage
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        public SaveImage(IWebHostEnvironment hostEnvironment)
        {
            this.webHostEnvironment = hostEnvironment;
        }

        [NonAction]
        public async void Save(IFormFile imageFile, string fileName)
        {
            var imagePath = Path.Combine(webHostEnvironment.ContentRootPath, "ClientApp", "public", "Images", fileName);
            var fileStream = new FileStream(imagePath, FileMode.Create);
            await imageFile.CopyToAsync(fileStream);
        }
    }
}
