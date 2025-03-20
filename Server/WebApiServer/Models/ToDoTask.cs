namespace WebApiServer.Models
{
    /// <summary>
    /// Модель задачи.
    /// </summary>
    /// <param name="Id">Уникальный идентификатор задачи.</param>
    /// <param name="Text">Текст задачи.</param>
    /// <param name="Important">Флаг важности задачи.</param>
    /// <param name="Completed">Статус выполнения задачи.</param>
    public record ToDoTask(int Id, string Text, bool Important, bool Completed);
}
