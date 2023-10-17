using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend;

public partial class LibraryContext : DbContext
{
    

    public LibraryContext(DbContextOptions<LibraryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ChuDe> ChuDes { get; set; }

    public virtual DbSet<Dbosach> Dbosaches { get; set; }

    public virtual DbSet<NhaXuatBan> NhaXuatBans { get; set; }

    public virtual DbSet<NhanXet> NhanXets { get; set; }

    public virtual DbSet<PhieuMuon> PhieuMuons { get; set; }

    public virtual DbSet<Quyen> Quyens { get; set; }

    public virtual DbSet<SachMuon> SachMuons { get; set; }

    public virtual DbSet<TacGium> TacGia { get; set; }

    public virtual DbSet<TaiKhoan> TaiKhoans { get; set; }

    public virtual DbSet<YeuThich> YeuThiches { get; set; }

   
}
