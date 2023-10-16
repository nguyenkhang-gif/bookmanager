using System.Linq.Expressions;

namespace backend.DataAccess
{
    public interface IRepository<T> where T : class, new()
    {        
        Task<IEnumerable<T>> GetAsync();
        Task<T> getSingleAsync(object id);
        Task InsertAsync(T temp);
        Task<T> getSingleAsync(Expression<Func<T,bool>> predecate);
    }
}