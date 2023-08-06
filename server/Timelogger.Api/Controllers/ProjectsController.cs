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

    [HttpGet]
    [Route("tasks")]
    public IActionResult GetTasks()
    {
      return Ok(_context.Tasks);
    }

    // GET api/projects
    [HttpGet]
    public IActionResult GetProjects()
    {
      return Ok(_context.Projects);
    }

    // GET api/projects/{page}
    [HttpGet("{page}")]
    public IActionResult GetProjectsByPage(int page)
    {
      int pageSize = 4;

      var paginatedProjects = _context.Projects.Skip((page - 1) * pageSize).Take(pageSize).ToList();

      bool isLastPage = _context.Projects.Count() <= page * pageSize;
      return Ok(new { projects = paginatedProjects, isLastPage });
    }

  }
}