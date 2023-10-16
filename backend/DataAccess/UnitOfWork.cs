using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {

        private readonly LibraryContext ctx;

        public IRepository<Book> bookCards{get;set;}
        public IRepository<Review> Reviews{get;set;}
        public IRepository<BorrowHistory> BorrowHistory{get;set;}
        public IRepository<User> User{get;set;}

         
        public UnitOfWork(LibraryContext ctx){
            this.ctx=ctx;
            bookCards = new Repository<Book>(ctx);
            Reviews = new Repository<Review>(ctx);
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