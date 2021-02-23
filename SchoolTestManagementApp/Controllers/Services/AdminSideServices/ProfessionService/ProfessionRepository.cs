using SchoolTestManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolTestManagementApp.Data.Services.AdminSideServices.ProfessionService
{
    public class ProfessionRepository :IProfessionRepository
    {
        private readonly ExamDataContext context;
        public ProfessionRepository(ExamDataContext context)
        {
            this.context = context;
        }

        public async Task<Profession> Add(string name)
        {
            var profession = new Profession() { Name = name };
            context.Profession.Add(profession);
            await context.SaveChangesAsync();
            return profession;
        }

        public List<Profession> getAllProfession()
        {
            return context.Profession.ToList();
        }

        public Profession getProfessionById(int idProfession)
        {
            Profession getProfession = context.Profession.FirstOrDefault(p => p.Id == idProfession);
            return getProfession;
        }
    }
}
