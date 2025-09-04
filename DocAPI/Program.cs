using DocAPI.Data;
using DocAPI.Logger.Formatter;
using DocAPI.Logger.Model;
using DocAPI.RabbitMQService.Services;
using Microsoft.EntityFrameworkCore;
using DocAPI.FirebaseService;

using var loggerFactory = LoggerFactory.Create(builder =>
{
    builder
        .AddConsole(o =>
        {
            o.FormatterName = "customName";
            o.LogToStandardErrorThreshold = LogLevel.Trace;
        })
        .AddConsoleFormatter<CustomFormatter, CustomOptions>(o =>
        {
            o.IncludeScopes = true;
            o.TimestampFormat = "HH:mm:ss ";
        });
});

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Cấu hình CORS cho Angular dev server

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAngularApp",
//        policy => policy
//            .WithOrigins("http://localhost:4200") // Angular dev server
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials()); // Optional if you're using cookies or auth
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Thêm các dịch vụ cần thiết
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<ILoggerFactory>(loggerFactory);
// Publisher
// RabbitMQ config
builder.Services.Configure<DocAPI.RabbitMQService.Modal.RabbitMqSettings>(
    builder.Configuration.GetSection("RabbitMqSettings")
);

builder.Services.AddSingleton<IRabbitMqPublisher, RabbitMqPublisher>();
// Consumer runs in background
//builder.Services.AddHostedService<RabbitMqConsumer>();
//var firebaseCredentialPath = "firebase.json";
//builder.Services.AddSingleton(new FirebaseServiceMessage(firebaseCredentialPath));
//builder.Services.AddHostedService<RabbitMqConsumer>();

var app = builder.Build();

app.Use(async (context, next) =>
{
    context.Request.EnableBuffering();
    var reader = new StreamReader(context.Request.Body);
    var body = await reader.ReadToEndAsync();
    Console.WriteLine("Request Body: " + body);
    context.Request.Body.Position = 0;
    await next();
});
app.UseCors("AllowAll");
// Swagger chỉ bật khi dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
