using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private readonly HouseRulesDbContext _dbContext;
    private readonly IMapper _mapper;

    public ChoreController(HouseRulesDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAllChores()
    {
        var chores = _dbContext
            .Chores
            .ToList();

        return Ok(_mapper.Map<List<ChoreDTO>>(chores));
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetChore(int id)
    {
        var chore = _dbContext
            .Chores
            .Include(c => c.ChoreAssignments)
            .ThenInclude(ca => ca.UserProfile)
            .Include(c => c.ChoreCompletions)
            .SingleOrDefault(c => c.Id == id);
            
        if (chore == null)
        {
            return NotFound();
        }
        return Ok(_mapper.Map<ChoreDTO>(chore));
    }

    [HttpPost("{id}/complete")]
    [Authorize]
    public IActionResult CompleteChore(int id, [FromQuery] int userId)
    {
        _dbContext.ChoreCompletions.Add(new ChoreCompletion
        {
            ChoreId = id,
            UserProfileId = userId,
            CompletedOn = DateTime.Now
        });
        _dbContext.SaveChanges();
        return NoContent();
    }
}
