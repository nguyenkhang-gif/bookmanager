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



        public Repository(LibraryContext dbcontext)
        {
            this.dbcontext = dbcontext;

        }

        public async Task<IEnumerable<T>> GetAsync()
        {
            return await dbcontext.Set<T>().ToListAsync();
        }
        //hỗ trợ lấy theo điều kiện 
        public async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predecate)
        {
            return await dbcontext.Set<T>().Where(predecate).ToListAsync();
        }




        public async Task<T> getSingleAsync(object id)
        {
            return await dbcontext.Set<T>().FindAsync(id);
        }

        public async Task<T> getSingleAsync(Expression<Func<T, bool>> predecate)
        {
            return await dbcontext.Set<T>().FirstOrDefaultAsync(predecate);
        }

        //insert lag đó thêm T nó bát return val :

        public async Task InsertAsync(T temp)
        {
            await dbcontext.Set<T>().AddAsync(temp);
        }
        public async Task Update(T item)
        {
            dbcontext.Set<T>().Update(item);
        }
        public async Task DeleteAsync(object id)
        {
            var entity = await getSingleAsync(id);
            dbcontext.Set<T>().Remove(entity);
        }
    }
}