using System.Linq.Expressions;

namespace backend.DataAccess
{
    public interface IRepository<T> where T : class, new()
    {
        Task<IEnumerable<T>> GetAsync();
        Task<IEnumerable<T>> GetAsync(int pageIndex, int pageSize);
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predecate);
        Task<T> getSingleAsync(Expression<Func<T, bool>> predecate);
        Task<T> getSingleAsync(object id);
        Task InsertAsync(T temp);
        Task Update(T item);
        Task DeleteAsync(object id);

    }
}