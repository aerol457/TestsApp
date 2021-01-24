using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService
{
    public interface IProfessionRepository
    {
        List<Profession> getAllProfession();
        Profession getProfessionById(int idProfession);
    }
}
