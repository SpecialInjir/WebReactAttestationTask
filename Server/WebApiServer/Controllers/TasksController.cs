using Microsoft.AspNetCore.Mvc;
using WebApiServer.Models;
using WebApiServer.Services;

namespace WebApiServer.Controllers
{
  /// <summary>
  /// Контроллер для управления задачами.
  /// </summary>
  [Route("[controller]")]
  [ApiController]
  public class TasksController : ControllerBase
  {
    private readonly ITaskService _taskService;

    /// <summary>
    /// Инициализирует новый экземпляр контроллера задач.
    /// </summary>
    /// <param name="taskService">Сервис для работы с задачами.</param>
    public TasksController(ITaskService taskService)
    {
      _taskService = taskService;
    }

    /// <summary>
    /// Получить список всех задач.
    /// </summary>
    /// <returns>Список всех задач.</returns>
    /// <response code="200">Возвращает список задач.</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyCollection<ToDoTask>> GetTasks()
    {
      var tasks = _taskService.GetTasks();
      return Ok(tasks);
    }

    /// <summary>
    /// Добавить новую задачу.
    /// </summary>
    /// <param name="task">Задача для добавления.</param>
    /// <returns>Добавленная задача.</returns>
    /// <response code="200">Задача добавлена.</response>
    /// <response code="400">Неверные данные.</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<ToDoTask> AddTask([FromBody] ToDoTask task)
    {
      var newTask = _taskService.AddTask(task);
      return Ok(newTask);
    }

    /// <summary>
    /// Получить задачу по идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задачи.</param>
    /// <returns>Найденная задача.</returns>
    /// <response code="200">Задача найдена.</response>
    /// <response code="404">Задача с указанным ID не найдена.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ToDoTask> GetTaskById(int id)
    {
      var task = _taskService.GetTasks().FirstOrDefault(t => t.Id == id);
      if (task == null)
      {
        return NotFound($"Задача с идентификатором {id} не найдена.");
      }
      return Ok(task);
    }

    /// <summary>
    /// Удалить задачу по идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задачи.</param>
    /// <returns>Статус операции.</returns>
    /// <response code="204">Задача успешно удалена.</response>
    /// <response code="404">Задача с указанным ID не найдена.</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult DeleteTask(int id)
    {
      _taskService.DeleteTask(id);
      return NoContent();
    }

    /// <summary>
    /// Обновить задачу по идентификатору.
    /// </summary>
    /// <param name="id">Идентификатор задачи.</param>
    /// <param name="task">Задача.</param>
    /// <returns>Обновленная задача.</returns>
    /// <response code="200">Задача успешно обновлена.</response>
    /// <response code="400">Некорректные данные.</response>
    /// <response code="404">Задача с указанным ID не найдена.</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ToDoTask> UpdateTask(int id, [FromBody] ToDoTask task)
    {
      var updatedTask = _taskService.UpdateTask(id, task);
      return Ok(updatedTask);
    }
  }
}