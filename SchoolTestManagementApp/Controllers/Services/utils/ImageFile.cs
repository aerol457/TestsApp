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
    public class ImageFile
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        public ImageFile(IWebHostEnvironment hostEnvironment)
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

        [NonAction]
        public void Remove(string fileName)
        {
            var imagePath = Path.Combine(webHostEnvironment.ContentRootPath, "ClientApp", "public", "Images", fileName);
            GC.Collect();
            GC.WaitForPendingFinalizers();
            File.Delete(imagePath);
        }
    }
}
