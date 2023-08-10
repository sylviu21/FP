using System.Linq;
using Microsoft.AspNetCore.Mvc;

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

    // GET api/projects
    [HttpGet]
    public IActionResult GetProjects()
    {
      return Ok(_context.Projects);
    }

    // GET api/projects/{page}
    [HttpGet("page/{page}")]
    public IActionResult GetProjectsByPage(int page)
    {

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

      var matchingProjects = _context.Projects
          .Where(p => p.Name.ToLower().Contains(searchTerm.ToLower()))
          .ToList();

      return Ok(matchingProjects);
    }

  }
}