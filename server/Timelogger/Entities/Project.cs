using System;

namespace Timelogger.Entities
{
	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public DateTime DateAdded { get; set; }
		public string Client { get; set; }
		public DateTime Deadline { get; set; }
		public int TimeSpent { get; set; }
		public bool IsComplete { get; set; }
	}
}
