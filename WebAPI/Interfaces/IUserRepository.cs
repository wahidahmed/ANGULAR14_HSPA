using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
   public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        void AddUser(User city);
        Task<User> FindUser(int id);
        void DeleteUser(int id);

        Task<User> Authenticate(string userName,string password);
        void Register(string userName, string password);
        Task<bool> UserAlreadyExist(string userName);
    }
}
