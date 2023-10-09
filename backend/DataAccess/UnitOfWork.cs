using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BookDbContext ctx;

        public IRepository<BookCard> bookCards{get;set;}
        public UnitOfWork(BookDbContext ctx){
            this.ctx=ctx;
            bookCards = new Repository<BookCard>(ctx);
        }     

        
           
    }
}