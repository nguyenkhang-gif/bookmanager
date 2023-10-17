using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

namespace backend.DataAccess
{
    public class Repository<T> : IRepository<T> where T : class, new()
    {
        //inject 
        private readonly LibraryContext dbcontext;
        

        // public IRepository<T> bookRepository {get; set;}
        public Repository(LibraryContext dbcontext)
        {
            this.dbcontext = dbcontext;
            // bookRepository = new Repository<T>(dbcontext);
        }

        public async Task<IEnumerable<T>> GetAsync()
        {
            return await dbcontext.Set<T>().ToListAsync();
        }
        public async Task<T> getSingleAsync(object id)
        {
            return await dbcontext.Set<T>().FindAsync(id);
        }

        public async Task<T> getSingleAsync(Expression<Func<T,bool>> predecate){

            return await dbcontext.Set<T>().FirstOrDefaultAsync(predecate);
        }

        //insert lag đó thêm T nó bát return val :

        public async Task InsertAsync(T temp)
        {
            await dbcontext.Set<T>().AddAsync(temp);
        }
    }
}