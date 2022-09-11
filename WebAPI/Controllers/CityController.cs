using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTOs;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        [HttpGet]
        //[AllowAnonymous]
        public async Task<IActionResult> Getcities()
        {
            var data =await unitOfWork.CityRepository.GetCitiesAsync();

            //var cityDto = from c in data
            //              select new CityDto
            //              {
            //                  Id=c.Id,
            //                  CityName=c.CityName
            //              };

            var cityDto = mapper.Map<IEnumerable<CityDto>>(data);
            return Ok(cityDto);
        }

        //[HttpPost("add")]
        //[HttpPost("add/{cityName}")]
        //public IActionResult AddCity(string cityName)
        //{
        //    City city = new City
        //    {
        //        CityName = cityName
        //    };

        //    return Ok(city);
        //}

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {

            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedOn = DateTime.Now;
            city.LastUpdatedBy = 0;
            //City city = new City
            //{
            //    CityName=cityDto.CityName,
            //    LastUpdatedOn=DateTime.Now,
            //    LastUpdatedBy=0
            //};
            unitOfWork.CityRepository.AddCity(city);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            try
            {
                if (id != cityDto.Id)
                {
                    BadRequest("Update not allowed ");
                }
                var city = await unitOfWork.CityRepository.FindCity(id);
                if (city == null)
                {
                    BadRequest("Update not allowed ");
                }
                city.LastUpdatedOn = DateTime.Now;
                city.LastUpdatedBy = 0;
                mapper.Map(cityDto, city);
                await unitOfWork.SaveAsync();
                return StatusCode(200);
            }
            catch
            {

                return StatusCode(500,"unknown error occured");
            }
            
        }

        [HttpPatch("Update/{id}")]
        public async Task<IActionResult> UpdateCityPatch(int id,JsonPatchDocument<City> cityToPatch)
        {
            //[
            //    { "op":"replace","path":"/Country","value":"Bangladesh"}
            //    { "op":"replace","path":"/CityName","value":"Feni"}
            //]
            var city = await unitOfWork.CityRepository.FindCity(id);
            city.LastUpdatedOn = DateTime.Now;
            city.LastUpdatedBy = 0;
            cityToPatch.ApplyTo(city);
            await unitOfWork.SaveAsync();
            return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            unitOfWork.CityRepository.DeleteCity(id);
            await unitOfWork.SaveAsync();
            return Ok(id);
        }
    }
}
