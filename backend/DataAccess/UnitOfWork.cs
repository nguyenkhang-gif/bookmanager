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
        public UnitOfWork(LibraryContext ctx){
            this.ctx=ctx;
            bookCards = new Repository<Book>(ctx);
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