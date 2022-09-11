using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTOs
{
    public class LoginReqDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
