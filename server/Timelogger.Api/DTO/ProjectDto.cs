namespace Timelogger.Api.DTO
{
  public class ProjectDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Date { get; set; }
    public TimeSpentDto TimeSpent { get; set; }
    public string Client { get; set; }
    public string Deadline { get; set; }
  }
}