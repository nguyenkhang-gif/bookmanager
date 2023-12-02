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

        public async Task<IEnumerable<T>> GetAsync(int pageIndex, int pageSize)
        {
            return await dbcontext
                .Set<T>()
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<IEnumerable<T>> GetAsync(int pageIndex, int pageSize, Expression<Func<T, bool>> filter = null)
        {
            return await dbcontext
                .Set<T>()

                .Where(filter)

                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task<IEnumerable<T>> GetAsync(int pageIndex, int pageSize, Expression<Func<T, bool>> filter = null, Expression<Func<T, object>>? orderBy = null, Expression<Func<T, object>>? orderByDescending = null)
        {
            IQueryable<T> query = dbcontext.Set<T>().Where(filter);

            if (orderBy != null)
            {
                query = query.OrderBy(orderBy);
            }
            else if (orderByDescending != null)
            {
                query = query.OrderByDescending(orderByDescending);
            }
            else
            {
                // If neither orderBy nor orderByDescending is provided, add random ordering
                query = query.OrderBy(_ => Guid.NewGuid());
            }

            return await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
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
        public async Task DeleteAsync(Expression<Func<T, bool>> predecate)
        {
            var entitiesToDelete = await GetAsync(predecate);

            foreach (var entity in entitiesToDelete)
            {
                dbcontext.Set<T>().Remove(entity);
            }

            await dbcontext.SaveChangesAsync();
        }

    }
}