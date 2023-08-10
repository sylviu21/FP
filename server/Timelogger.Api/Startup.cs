using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Timelogger.Api
{
  public class Startup
  {
    private readonly IWebHostEnvironment _environment;
    public IConfigurationRoot Configuration { get; }

    public Startup(IWebHostEnvironment env)
    {
      _environment = env;

      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      // Add framework services.
      services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
      services.AddLogging(builder =>
      {
        builder.AddConsole();
        builder.AddDebug();
      });

      services.AddMvc(options => options.EnableEndpointRouting = false);

      if (_environment.IsDevelopment())
      {
        services.AddCors();
      }
    }



    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseCors(builder => builder
          .AllowAnyMethod()
          .AllowAnyHeader()
          .SetIsOriginAllowed(origin => true)
          .AllowCredentials());
      }

      app.UseMvc();


      var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
      using (var scope = serviceScopeFactory.CreateScope())
      {
        SeedDatabase(scope);
      }
    }

    // private static string DateTime inputDateString)
    // {
    //   string formattedDateAdded = inputDateString.ToString("dd/MM/yyyy");
    //   return formattedDateAdded;
    // }

    private static void SeedDatabase(IServiceScope scope)
    {
      var context = scope.ServiceProvider.GetService<ApiContext>();

      var tasks = new List<Task>{
        new Task
          {
              Id = 1,
              ProjectId = 1,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 1),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 2,
              ProjectId = 1,
              Status = "In Progress",
              Name = "Task 2",
              Description = "Task 2 description",
              DateAdded = new DateTime(2022, 1, 2),
              TimeSpent = null
          },
          new Task
          {
              Id = 3,
              ProjectId = 1,
              Status = "Done",
              Name = "Task 3",
              Description = "Task 3 description",
              DateAdded = new DateTime(2022, 1, 3),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 4,
              ProjectId = 1,
              Status = "Pending",
              Name = "Task 4",
              Description = "Task 4 description",
              DateAdded = new DateTime(2022, 1, 4),
              TimeSpent = null
          },
          new Task
          {
              Id = 5,
              ProjectId = 1,
              Status = "Pending",
              Name = "Task 5",
              Description = "Task 5 description",
              DateAdded = new DateTime(2022, 1, 5),
              TimeSpent = null
          },
          new Task
          {
              Id = 6,
              ProjectId = 1,
              Status = "Pending",
              Name = "Task 6",
              Description = "Task 6 description",
              DateAdded = new DateTime(2022, 1, 6),
              TimeSpent = null
          },
           new Task
          {
              Id = 7,
              ProjectId = 2,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 7),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 8,
              ProjectId = 3,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 8),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 9,
              ProjectId = 4,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 9),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 10,
              ProjectId = 5,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 10),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 11,
              ProjectId = 6,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 11),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 12,
              ProjectId = 7,
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 11),
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 13,
              ProjectId = 8,
              Status = "Pending",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = new DateTime(2022, 1, 11),
              TimeSpent = ""
          }

      };

      var projects = new List<Project>
      {
        new Project
        {
            Id = 1,
            Name = "Project 1",
            DateAdded = new DateTime(2022, 1, 1),
            Client = "Client 1",
            Deadline = new DateTime(2023, 12, 31),
            IsComplete = false,
        },
        new Project
        {
            Id = 2,
            Name = "Project 2",
            DateAdded =new DateTime(2022, 2, 1),
            Client = "Client 2",
            Deadline = new DateTime(2022, 3, 1),
            IsComplete = true,
        },
        new Project
        {
            Id = 3,
            Name = "Project 3",
            DateAdded = new DateTime(2021, 12, 1),
            Client = "Client 3",
            Deadline = new DateTime(2022, 1, 15),
            IsComplete = true,
        },
        new Project
        {
            Id = 4,
            Name = "Project 4",
            DateAdded = new DateTime(2022, 3, 1),
            Client = "Client 4",
            Deadline = new DateTime(2022, 4, 1),
            IsComplete = true,
        },

        new Project
        {
            Id = 5,
            Name = "Project 5",
            DateAdded = new DateTime(2022, 1, 1),
            Client = "Client 1",
            Deadline = new DateTime(2023, 12, 31),
            IsComplete = true,
        },
        new Project
        {
            Id = 6,
            Name = "Project 6",
            DateAdded = new DateTime(2022, 2, 1),
            Client = "Client 2",
            Deadline = new DateTime(2022, 3, 1),
            IsComplete = true,
        },
        new Project
        {
            Id = 7,
            Name = "Project 7",
            DateAdded = new DateTime(2021, 12, 1),
            Client = "Client 3",
            Deadline = new DateTime(2022, 1, 15),
            IsComplete = true,
        },
        new Project
        {
            Id = 8,
            Name = "Project 8",
            DateAdded = new DateTime(2022, 3, 1),
            Client = "Client 4",
            Deadline = new DateTime(2022, 4, 1),
            IsComplete = false,
        },
      };

      foreach (var project in projects)
      {
        var projectTasks = tasks.Where(t => t.ProjectId == project.Id).ToList();
        int totalTimeSpent = projectTasks.Sum(t => ParseTimeSpent(t.TimeSpent));

        project.TimeSpent = totalTimeSpent;

        context.Projects.Add(project);
        context.Tasks.AddRange(projectTasks);
      }
      context.SaveChanges();
    }
    private static int ParseTimeSpent(string timeSpent)
    {
      if (string.IsNullOrEmpty(timeSpent))
      {
        return 0;
      }

      string[] timeParts = timeSpent.Split(new[] { 'h', 'm' }, StringSplitOptions.RemoveEmptyEntries);
      if (timeParts.Length == 2 && int.TryParse(timeParts[0], out int hours) && int.TryParse(timeParts[1], out int minutes))
      {
        return (hours * 60) + minutes;
      }

      return 0;
    }

  }
}