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

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public IActionResult NewChore(ChoreDTO choreDTO)
    {
        var chore = _mapper.Map<Chore>(choreDTO);
        _dbContext.Chores.Add(chore);
        _dbContext.SaveChanges();
        return CreatedAtAction(nameof(GetChore), new { id = chore.Id }, _mapper.Map<ChoreDTO>(chore));
    }


    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult EditChore([FromBody] ChoreDTO updatedChore, int id)
    {
        Chore? choreToUpdate = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToUpdate == null)
        {
            return NotFound();
        }
        else if (id != updatedChore.Id)
        {
            return BadRequest();
        }


        choreToUpdate.Name = updatedChore.Name;
        choreToUpdate.ChoreFrequencyDays = updatedChore.ChoreFrequencyDays;
        choreToUpdate.Difficulty = updatedChore.Difficulty;

        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        Chore? choreToDelete = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (choreToDelete == null)
        {
            return NotFound();
        }
        
        _dbContext.Chores.Remove(choreToDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpPost("{id}/assign")]
    [Authorize(Roles = "Admin")]
    public IActionResult AssignChore(int id, [FromQuery] int userId)
    {
        _dbContext.ChoreAssignments.Add(new ChoreAssignment
        {
            ChoreId = id,
            UserProfileId = userId,
        });
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    [Authorize(Roles = "Admin")]
    public IActionResult UnassignChore(int id, [FromQuery] int userId)
    {
        var assignment = _dbContext.ChoreAssignments
            .SingleOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == userId);

        if (assignment == null)
        {
            return NotFound();
        }

        _dbContext.ChoreAssignments.Remove(assignment);
        _dbContext.SaveChanges();
        return NoContent();
    }

}
