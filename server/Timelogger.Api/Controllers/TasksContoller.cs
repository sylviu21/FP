using Microsoft.AspNetCore.Mvc;

namespace Timelogger.Api.Controllers
{
  [Route("api/[controller]")]
  public class TasksController : Controller
  {
    private readonly ApiContext _context;

    public TasksController(ApiContext context)
    {
      _context = context;
    }

    [HttpGet]
    [Route("tasks")]
    public string HelloWorld()
    {
      return "Hello Back!222";
    }

    // GET api/projects
    [HttpGet]
    public IActionResult Get()
    {
      return Ok(_context.Projects);
    }
  }
}