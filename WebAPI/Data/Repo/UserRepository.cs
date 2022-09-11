using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddUser(User user)
        {
            dc.AddAsync(user);
        }

        public async Task<User> Authenticate(string userName, string passwordText)
        {
            //var user= await dc.Users.FirstOrDefaultAsync(x=>x.UserName==userName
            //&& x.Password == passwordText
            //);
            var user = await dc.Users.FirstOrDefaultAsync(x => x.UserName == userName);
            if (user==null || user.PasswordKey==null)
            {
                return null;
            }
            if (!MatchPasswordHash(passwordText,user.Password,user.PasswordKey))
            {
                return null;
            }
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))
            {
               var passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        }

        public void DeleteUser(int id)
        {
            var user = dc.Users.Find(id);
            dc.Remove(user);
        }

        public async Task<User> FindUser(int id)
        {
            return await dc.Users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await dc.Users.ToListAsync();
        }

        public void Register(string userName, string password)
        {
            byte[] passwordHash, passwordKey;
            using (var hmac=new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }

            User user = new User
            {
                UserName=userName,
                Password=passwordHash,
                PasswordKey=passwordKey
            };

            dc.Users.Add(user);
        }

        public async Task<bool> UserAlreadyExist(string userName)
        {
            return await dc.Users.AnyAsync(x=>x.UserName==userName);
        }
    }
}
