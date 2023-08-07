using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
  [Route("api/[controller]")]
  public class ProjectsController : Controller
  {
    private readonly ApiContext _context;

    public ProjectsController(ApiContext context)
    {
      _context = context;
    }

    private int CalculateTotalTimeSpent(Project project)
    {
      var tasks = _context.Tasks
          .Where(t => t.ProjectId == project.Id && t.TimeSpent != null)
          .ToList();

      int totalTimeSpent = tasks.Sum(t => ParseTimeSpent(t.TimeSpent));
      return totalTimeSpent;
    }

    // GET api/projects
    [HttpGet]
    public IActionResult GetProjects()
    {
      var projects = _context.Projects.ToList();

      foreach (var project in projects)
      {
        project.TimeSpent = CalculateTotalTimeSpent(project);
      }

      return Ok(projects);
    }

    private static int ParseTimeSpent(string timeSpent)
    {
      string[] timeParts = timeSpent.Split(new[] { 'h', 'm' }, StringSplitOptions.RemoveEmptyEntries);
      if (timeParts.Length == 2 && int.TryParse(timeParts[0], out int hours) && int.TryParse(timeParts[1], out int minutes))
      {
        return (hours * 60) + minutes;
      }

      return 0;
    }


    // GET api/projects/{page}
    [HttpGet("page/{page}")]
    public IActionResult GetProjectsByPage(int page)
    {

      var projects = _context.Projects.ToList();

      foreach (var project in projects)
      {
        project.TimeSpent = CalculateTotalTimeSpent(project);
      }

      int pageSize = 4;

      var paginatedProjects = _context.Projects.Skip((page - 1) * pageSize).Take(pageSize).ToList();

      bool isLastPage = _context.Projects.Count() <= page * pageSize;



      return Ok(new { projects = paginatedProjects, isLastPage });
    }

    // GET api/projects/productid={id}
    // [HttpGet("{id}")]
    // public IActionResult GetProjectById(int id)
    // {
    //   var project = _context.Projects.FirstOrDefault(p => p.Id == id);
    //   if (project == null)
    //   {
    //     return NotFound(); // Return 404 Not Found if the project with the given ID is not found
    //   }
    //   return Ok(project);
    // }

    // GET api/projects/{projectId}/tasks
    [HttpGet("{projectId}/tasks")]
    public IActionResult GetTasksByProjectId(int projectId)
    {
      var tasks = _context.Tasks.Where(t => t.ProjectId == projectId).ToList();
      return Ok(tasks);
    }

    // GET api/projects/search/{searchTerm}
    [HttpGet("search/{searchTerm}")]
    public IActionResult SearchProjectsByName(string searchTerm)
    {
      var projects = _context.Projects.ToList();

      foreach (var project in projects)
      {
        project.TimeSpent = CalculateTotalTimeSpent(project);
      }
      // Perform a case-insensitive search for projects whose name contains the search term
      var matchingProjects = _context.Projects
          .Where(p => p.Name.ToLower().Contains(searchTerm.ToLower()))
          .ToList();

      return Ok(matchingProjects);
    }

  }
}