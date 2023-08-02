using System;
using System.Collections.Generic;
using Timelogger.Api.DTO;

namespace Timelogger.Api.Services
{
  public class ProjectService
  {
    public List<ProjectDto> GetAll()
    {
      return new List<ProjectDto>
      {
        new ProjectDto
        {
            Id = 1,
            Name = "Project 1",
            Date = ConvertToFormattedDate(new DateTime(2022, 1, 1)),
            TimeSpent = new TimeSpentDto { Hours = 10, Minutes = 30 },
            Client = "Client 1",
            Deadline = ConvertToFormattedDate(new DateTime(2023, 12, 31))
        },
        new ProjectDto
        {
            Id = 2,
            Name = "Project 2",
            Date = ConvertToFormattedDate(new DateTime(2022, 2, 1)),
            TimeSpent = new TimeSpentDto { Hours = 5, Minutes = 45 },
            Client = "Client 2",
            Deadline = ConvertToFormattedDate(new DateTime(2022, 3, 1))
        },
        new ProjectDto
        {
            Id = 3,
            Name = "Project 3",
            Date = ConvertToFormattedDate(new DateTime(2021, 12, 1)),
            TimeSpent = new TimeSpentDto { Hours = 8, Minutes = 15 },
            Client = "Client 3",
            Deadline = ConvertToFormattedDate(new DateTime(2022, 1, 15))
        },
        new ProjectDto
        {
            Id = 4,
            Name = "Project 4",
            Date = ConvertToFormattedDate(new DateTime(2022, 3, 1)),
            TimeSpent = new TimeSpentDto { Hours = 3, Minutes = 0 },
            Client = "Client 4",
            Deadline = ConvertToFormattedDate(new DateTime(2022, 4, 1))
        }
      };
    }

    public static string ConvertToFormattedDate(DateTime inputDateString)
    {
      string formattedDate = inputDateString.ToString("dd/MM/yyyy");

      return formattedDate;
    }
  }
}
