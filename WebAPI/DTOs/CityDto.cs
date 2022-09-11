using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTOs
{
    public class CityDto
    {
        public int Id { get; set; }
        [Required]
        public string CityName { get; set; }
        [Required]
        public string Country { get; set; }

    }
}
