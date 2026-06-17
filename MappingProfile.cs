using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

namespace HouseRules;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserProfile, UserProfileDTO>();
        CreateMap<UserProfileDTO, UserProfile>();

        CreateMap<Chore, ChoreDTO>().ReverseMap();
        CreateMap<ChoreAssignment, ChoreAssignmentDTO>().ReverseMap();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>().ReverseMap();
    }
}
