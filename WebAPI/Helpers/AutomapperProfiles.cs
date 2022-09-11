using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTOs;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutomapperProfiles:Profile
    {
        public AutomapperProfiles()
        {
            //CreateMap<City, CityDto>();
            //CreateMap<CityDto, City>();
            CreateMap<City, CityDto>().ReverseMap();
        }
    }
}
