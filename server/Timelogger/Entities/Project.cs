namespace Timelogger.Entities
{
	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Date { get; set; }
		public TimeSpent TimeSpent { get; set; }
		public string Client { get; set; }
		public string Deadline { get; set; }
	}
}
