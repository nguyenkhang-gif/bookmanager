using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.DataAccess
{
    public interface IUnitOfWork
    {
        public IRepository<BookCard> bookCards{get;set;}



    }
}   