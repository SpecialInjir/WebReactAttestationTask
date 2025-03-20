using System.Text.Json;
using WebApiServer.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ITaskService, TaskService>();

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseHttpsRedirection();
app.MapControllers();
app.MapGet("/", () => "Hello! It is Web API server!");

app.Run();
