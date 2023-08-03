using System;

namespace Timelogger.Entities
{
  public class Task
  {
    public int Id { get; set; }
    public string Status { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DateAdded { get; set; }
    public string TimeSpent { get; set; }
  }
}
