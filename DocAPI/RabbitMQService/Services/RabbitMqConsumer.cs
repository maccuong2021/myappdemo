using DocAPI.RabbitMQService.Modal;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using DocAPI.FirebaseService;

namespace DocAPI.RabbitMQService.Services
{
    public class RabbitMqConsumer : BackgroundService
    {
        private readonly RabbitMqSettings _settings;
        private readonly ILogger<RabbitMqConsumer> _logger;
        private readonly FirebaseServiceMessage _firebaseService;
        private IConnection _connection;
        private IModel _channel;

        public RabbitMqConsumer(IOptions<RabbitMqSettings> options,
                                ILoggerFactory logFactory,
                                FirebaseServiceMessage firebaseService)
        {
            _settings = options.Value;
            _logger = logFactory.CreateLogger<RabbitMqConsumer>();
            _firebaseService = firebaseService;

            var factory = new ConnectionFactory()
            {
                HostName = _settings.HostName,
                Port = _settings.Port,
                UserName = _settings.UserName,
                Password = _settings.Password
            };

            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            _channel.QueueDeclare(queue: _settings.QueueName,
                                 durable: true,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                _logger.LogInformation("Received message: {Message}", message);

                // TODO: Replace with actual FCM token
                var deviceToken = "<DEVICE_TOKEN>";

                try
                {
                    await _firebaseService.SendNotificationAsync(deviceToken, "New Message", message);
                    _logger.LogInformation("Message sent to Firebase successfully.");
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send message to Firebase.");
                }
            };

            _channel.BasicConsume(queue: _settings.QueueName,
                                  autoAck: true,
                                  consumer: consumer);

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            base.Dispose();
        }
    }
}
