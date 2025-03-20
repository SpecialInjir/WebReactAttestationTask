using WebApiServer.Models;

namespace WebApiServer.Services
{
    /// <summary>
    /// Реализация сервиса для управления задачами.
    /// </summary>
    public class TaskService : ITaskService
    {
        private readonly Dictionary<int, ToDoTask> _tasks = new();
        private int _nextId = 1;

        /// <inheritdoc />
        public IReadOnlyCollection<ToDoTask> GetTasks()
        {
            return _tasks.Values.ToList().AsReadOnly();
        }

        /// <inheritdoc />
        public ToDoTask AddTask(ToDoTask task)
        {
            int newId = _nextId++;
            var newTask = task with { Id = newId };
            _tasks.Add(newId, newTask);
            return newTask;
        }

        /// <inheritdoc />
        public void DeleteTask(int id)
        {
            if (!_tasks.Remove(id))
            {
                throw new KeyNotFoundException($"Задача с идентификатором {id} не найдена.");
            }
        }

        /// <inheritdoc />
        public ToDoTask UpdateTask(int id, ToDoTask task)
        {
            if (!_tasks.ContainsKey(id))
            {
                throw new KeyNotFoundException($"Задача с идентификатором {id} не найдена.");
            }

            var updatedTask = task with { Id = id };
            _tasks[id] = updatedTask;
            return updatedTask;
        }
    }
}