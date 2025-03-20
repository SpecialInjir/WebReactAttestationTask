using WebApiServer.Models;

namespace WebApiServer.Services
{
  /// <summary>
  /// Интерфейс для сервиса управления задачами.
  /// </summary>
  public interface ITaskService
  {
    /// <summary>
    /// Получить список всех задач.
    /// </summary>
    /// <returns>Список задач.</returns>
    IReadOnlyCollection<ToDoTask> GetTasks();

    /// <summary>
    /// Добавить новую задачу.
    /// </summary>
    /// <param name="task">Задача для добавления.</param>
    /// <returns>Добавленная задача.</returns>
    ToDoTask AddTask(ToDoTask task);

    /// <summary>
    /// Удалить задачу по идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задачи.</param>
    void DeleteTask(int id);

    /// <summary>
    /// Обновить задачу по идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задачи.</param>
    /// <param name="task">Обновленные данные задачи.</param>
    /// <returns>Обновленная задача.</returns>
    ToDoTask UpdateTask(int id, ToDoTask task);
  }
}
