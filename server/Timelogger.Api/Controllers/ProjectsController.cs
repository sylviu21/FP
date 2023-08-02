using Microsoft.AspNetCore.Mvc;
using Timelogger.Api.Services;

namespace Timelogger.Api.Controllers
{
  [Route("api/[controller]")]
  public class ProjectsController : Controller
  {
    private readonly ApiContext _context;
    private readonly ProjectService _projectService;


    public ProjectsController(ApiContext context, ProjectService projectService)
    {
      _context = context;
      _projectService = projectService;
    }

    [HttpGet]
    [Route("hello-world")]
    public string HelloWorld()
    {
      return "Hello Back!";
    }

    // GET api/projects
    [HttpGet]
    public IActionResult Get()
    {
      return Ok(_projectService.GetAll());
    }
  }
}
