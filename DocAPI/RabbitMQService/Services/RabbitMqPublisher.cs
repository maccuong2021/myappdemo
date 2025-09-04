using DocAPI.RabbitMQService.Modal;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;
using System.Text;

namespace DocAPI.RabbitMQService.Services
{
    public interface IRabbitMqPublisher
    {
        void PublishMessage(string message);
    }

    public class RabbitMqPublisher : IRabbitMqPublisher, IDisposable
    {
        private readonly RabbitMqSettings _settings;
        private readonly IConnection _connection;
        private readonly IModel _channel;

        public RabbitMqPublisher(IOptions<RabbitMqSettings> options)
        {
            _settings = options.Value;

            // Create connection factory
            var factory = new ConnectionFactory
            {
                HostName = _settings.HostName,
                Port = _settings.Port,
                UserName = _settings.UserName,
                Password = _settings.Password
            };

            // Synchronous connection and channel
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            // Declare queue
            _channel.QueueDeclare(
                queue: _settings.QueueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null
            );
        }

        public void PublishMessage(string message)
        {
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish(
                exchange: "",
                routingKey: _settings.QueueName,
                basicProperties: null,
                body: body
            );
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
}
