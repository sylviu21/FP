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
              Status = "Done",
              Name = "Task 1",
              Description = "Task 1 description",
              DateAdded = DateTime.Now,
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 2,
              Status = "In Progress",
              Name = "Task 2",
              Description = "Task 2 description",
              DateAdded = DateTime.Now,
              TimeSpent = null
          },
          new Task
          {
              Id = 3,
              Status = "Done",
              Name = "Task 3",
              Description = "Task 3 description",
              DateAdded = DateTime.Now,
              TimeSpent = "2h 30m"
          },
          new Task
          {
              Id = 4,
              Status = "Pending",
              Name = "Task 4",
              Description = "Task 4 description",
              DateAdded = DateTime.Now,
              TimeSpent = null
          },
          new Task
          {
              Id = 5,
              Status = "Pending",
              Name = "Task 5",
              Description = "Task 5 description",
              DateAdded = DateTime.Now,
              TimeSpent = null
          },
          new Task
          {
              Id = 6,
              Status = "Pending",
              Name = "Task 6",
              Description = "Task 6 description",
              DateAdded = DateTime.Now,
              TimeSpent = null
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
            Deadline = new DateTime(2023, 12, 31)
        },
        new Project
        {
            Id = 2,
            Name = "Project 2",
            DateAdded =new DateTime(2022, 2, 1),
            Client = "Client 2",
            Deadline = new DateTime(2022, 3, 1)
        },
        new Project
        {
            Id = 3,
            Name = "Project 3",
            DateAdded = new DateTime(2021, 12, 1),
            Client = "Client 3",
            Deadline = new DateTime(2022, 1, 15)
        },
        new Project
        {
          Id = 4,
          Name = "Project 4",
          DateAdded = new DateTime(2022, 3, 1),
          Client = "Client 4",
          Deadline = new DateTime(2022, 4, 1)
        },

        new Project
        {
          Id = 5,
          Name = "Project 5",
          DateAdded = new DateTime(2022, 1, 1),
          Client = "Client 1",
          Deadline = new DateTime(2023, 12, 31)
        },
        new Project
        {
          Id = 6,
          Name = "Project 6",
          DateAdded = new DateTime(2022, 2, 1),
          Client = "Client 2",
          Deadline = new DateTime(2022, 3, 1)
        },
        new Project
        {
          Id = 7,
          Name = "Project 7",
          DateAdded = new DateTime(2021, 12, 1),
          Client = "Client 3",
          Deadline = new DateTime(2022, 1, 15)
        },
        new Project
        {
          Id = 8,
          Name = "Project 8",
          DateAdded = new DateTime(2022, 3, 1),
          Client = "Client 4",
          Deadline = new DateTime(2022, 4, 1)
        },
      };

      // Add the projects to the context
      context.Projects.AddRange(projects);
      context.Tasks.AddRange(tasks);

      context.SaveChanges();
    }
  }
}