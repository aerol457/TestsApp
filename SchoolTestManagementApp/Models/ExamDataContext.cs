using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SchoolTestManagementApp.Models
{
    public partial class ExamDataContext : DbContext
    {
        public ExamDataContext()
        {
        }

        public ExamDataContext(DbContextOptions<ExamDataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Classroom> Classroom { get; set; }
        public virtual DbSet<ClassroomTest> ClassroomTest { get; set; }
        public virtual DbSet<Option> Option { get; set; }
        public virtual DbSet<Profession> Profession { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<QuestionOption> QuestionOption { get; set; }
        public virtual DbSet<StudentTest> StudentTest { get; set; }
        public virtual DbSet<TeacherClassroom> TeacherClassroom { get; set; }
        public virtual DbSet<Test> Test { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Classroom>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ClassroomTest>(entity =>
            {
                entity.HasOne(d => d.IdClassroomNavigation)
                    .WithMany(p => p.ClassroomTest)
                    .HasForeignKey(d => d.IdClassroom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassroomTest_Classroom");

                entity.HasOne(d => d.IdTestNavigation)
                    .WithMany(p => p.ClassroomTest)
                    .HasForeignKey(d => d.IdTest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ClassroomTest_Test");
            });

            modelBuilder.Entity<Option>(entity =>
            {
                entity.Property(e => e.Content)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Profession>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.Property(e => e.Content1)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.Content2).IsUnicode(false);

                entity.Property(e => e.Content3).IsUnicode(false);

                entity.Property(e => e.ImageUrl).IsUnicode(false);

                entity.Property(e => e.QuestionType)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdTestNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.IdTest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Question_Test");
            });

            modelBuilder.Entity<QuestionOption>(entity =>
            {
                entity.HasOne(d => d.IdOptionNavigation)
                    .WithMany(p => p.QuestionOption)
                    .HasForeignKey(d => d.IdOption)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QuestionOption_Option");

                entity.HasOne(d => d.IdQuestionNavigation)
                    .WithMany(p => p.QuestionOption)
                    .HasForeignKey(d => d.IdQuestion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_QuestionOption_Question");
            });

            modelBuilder.Entity<StudentTest>(entity =>
            {
                entity.HasOne(d => d.IdTestNavigation)
                    .WithMany(p => p.StudentTest)
                    .HasForeignKey(d => d.IdTest)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_StudentTest_Test");
            });

            modelBuilder.Entity<TeacherClassroom>(entity =>
            {
                entity.HasOne(d => d.IdClassroomNavigation)
                    .WithMany(p => p.TeacherClassroom)
                    .HasForeignKey(d => d.IdClassroom)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherClassroom_Classroom");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.TeacherClassroom)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TeacherClassroom_User");
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.Property(e => e.DateOfDistribution).HasColumnType("datetime");

                entity.Property(e => e.DateOfSubmission).HasColumnType("datetime");

                entity.Property(e => e.IdTest)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.ProfessionName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PassingGrade)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.Test)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Test_User");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.DateJoined).HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.IdCard)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.ImageUrl).IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(12)
                    .IsUnicode(false);

                entity.Property(e => e.UserType)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdClassroomNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdClassroom)
                    .HasConstraintName("FK_User_Classroom");

                entity.HasOne(d => d.IdProfessionNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdProfession)
                    .HasConstraintName("FK_User_Profession");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
