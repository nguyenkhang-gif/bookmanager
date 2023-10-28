using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.DataAccess
{
    public interface IUnitOfWork
    {
        public IRepository<Dbosach> Dbosaches { get; set; }
        public IRepository <ChuDe> ChuDes { get; set; }
        public IRepository <NhaXuatBan> NhaXuatBans { get; set; }

        public IRepository <NhanXet> NhanXets { get; set; }

        public IRepository <PhieuMuon> PhieuMuons { get; set; }

        public IRepository <Quyen> Quyens { get; set; }

        public IRepository <SachMuon> SachMuons { get; set; }

        public IRepository <TacGium> TacGia { get; set; }

        public IRepository <TaiKhoan> TaiKhoans { get; set; }

        public IRepository <YeuThich> YeuThiches { get; set; }
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task<int> SaveChangesAsync();


    }
}