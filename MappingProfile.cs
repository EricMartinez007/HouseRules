using AutoMapper;
using HouseRules.Models;
using HouseRules.Models.DTOs;

namespace HouseRules;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserProfile, UserProfileDTO>()
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.IdentityUser.Email))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.IdentityUser.UserName))
            .ReverseMap();

        CreateMap<Chore, ChoreDTO>().ReverseMap();
        CreateMap<ChoreAssignment, ChoreAssignmentDTO>().ReverseMap();
        CreateMap<ChoreCompletion, ChoreCompletionDTO>().ReverseMap();
    }
}
