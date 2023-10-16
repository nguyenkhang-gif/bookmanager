using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.DataAccess
{
    public interface IUnitOfWork
    {
        public IRepository<Book> bookCards { get; set; }
        public IRepository<Review> Reviews{get;set;}
        Task BeginTransactionAsync();
        Task CommitAsync();
        Task RollbackAsync();
        Task<int> SaveChangesAsync();


    }
}