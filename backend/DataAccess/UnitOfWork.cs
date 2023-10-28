using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace backend.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly LibraryContext ctx;

        public IRepository<Dbosach> Dbosaches{get;set;}
        public IRepository <ChuDe> ChuDes { get; set; }
        public IRepository <NhaXuatBan> NhaXuatBans { get; set; }

        public IRepository <NhanXet> NhanXets { get; set; }

        public IRepository <PhieuMuon> PhieuMuons { get; set; }

        public IRepository <Quyen> Quyens { get; set; }

        public IRepository <SachMuon> SachMuons { get; set; }

        public IRepository <TacGium> TacGia { get; set; }

        public IRepository <TaiKhoan> TaiKhoans { get; set; }

        public IRepository <YeuThich> YeuThiches { get; set; }
    

         
        public UnitOfWork(LibraryContext ctx){
            this.ctx=ctx;
            Dbosaches = new Repository<Dbosach>(ctx);
            ChuDes = new Repository<ChuDe>(ctx);
            NhaXuatBans = new Repository<NhaXuatBan>(ctx);
            NhanXets = new Repository<NhanXet>(ctx);
            PhieuMuons = new Repository<PhieuMuon>(ctx);
            Quyens = new Repository<Quyen>(ctx);
            SachMuons = new Repository<SachMuon>(ctx);
            TacGia = new Repository<TacGium>(ctx);
            TaiKhoans = new Repository<TaiKhoan>(ctx);
            YeuThiches = new Repository<YeuThich>(ctx);
        }     

         public Task BeginTransactionAsync(){
            return ctx.Database.BeginTransactionAsync();
        }

        public Task CommitAsync(){
            return ctx.Database.CommitTransactionAsync();
        }

        public Task RollbackAsync(){
            return ctx.Database.RollbackTransactionAsync();
        }

        public Task<int> SaveChangesAsync(){
            return ctx.SaveChangesAsync();
        }
           
    }
}