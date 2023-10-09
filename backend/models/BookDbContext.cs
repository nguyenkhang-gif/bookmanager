using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.models;

public partial class BookDbContext : DbContext
{
    // public BookDbContext()
    // {
    // }

    public BookDbContext(DbContextOptions<BookDbContext> options)
        : base(options)
    {
    }

    //bao nhiêu bản thì bấy nhiêu DbSet
    public virtual DbSet<BookCard> BookCards { get; set; }

//     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Data Source=DESKTOP-NQ9064U\\SQLEXPRESS;Initial Catalog=bookDB;Trusted_Connection=Yes;TrustServerCertificate=True;");

//     protected override void OnModelCreating(ModelBuilder modelBuilder)
//     {
//         modelBuilder.Entity<BookCard>(entity =>
//         {
//             entity.HasKey(e => e.Id).HasName("PK__bookCard__3213E83F306B05D9");

//             entity.ToTable("bookCard");

//             entity.HasIndex(e => e.BookId, "UQ__bookCard__8BE5A10CCCD9C16A").IsUnique();

//             entity.Property(e => e.Id).HasColumnName("id");
//             entity.Property(e => e.AuthName)
//                 .HasMaxLength(255)
//                 .IsUnicode(false)
//                 .HasColumnName("authName");
//             entity.Property(e => e.BookId).HasColumnName("bookId");
//             entity.Property(e => e.BookName)
//                 .HasMaxLength(255)
//                 .IsUnicode(false)
//                 .HasColumnName("bookName");
//             entity.Property(e => e.Category)
//                 .HasMaxLength(255)
//                 .IsUnicode(false)
//                 .HasColumnName("category");
//         });

//         OnModelCreatingPartial(modelBuilder);
//     }

//     partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
