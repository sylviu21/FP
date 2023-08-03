﻿using Microsoft.AspNetCore.Mvc;

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
  }
}