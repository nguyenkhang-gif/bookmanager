namespace backend.DataAccess
{
    public interface IRepository<T> where T : class, new()
    {

        
        Task<IEnumerable<T>> GetAsync();

    }
}