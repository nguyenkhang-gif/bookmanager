using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess
{
    public class Repository<T> : IRepository<T> where T: class, new()
    {   
        //inject 
        private readonly BookDbContext dbcontext;
        

        // public IRepository<T> bookRepository {get; set;}
        public Repository(BookDbContext dbcontext){
            this.dbcontext=dbcontext;
            // bookRepository = new Repository<T>(dbcontext);
        }

        public async Task<IEnumerable<T>> GetAsync(){
            return await dbcontext.Set<T>().ToListAsync();
        }
    }
}