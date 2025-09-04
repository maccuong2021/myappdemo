using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;

namespace DocAPI.FirebaseService
{
    public class FirebaseServiceMessage
    {
        private readonly FirebaseMessaging _messaging;

        public FirebaseServiceMessage(string credentialPath)
        {
            FirebaseApp app;
            if (FirebaseApp.DefaultInstance == null)
            {
                app = FirebaseApp.Create(new AppOptions()
                {
                    Credential = GoogleCredential.FromFile(credentialPath)
                });
            }
            else
            {
                app = FirebaseApp.DefaultInstance;
            }

            _messaging = FirebaseMessaging.GetMessaging(app);
        }

        public async Task SendNotificationAsync(string token, string title, string body)
        {
            var message = new Message()
            {
                Token = token,
                Notification = new Notification()
                {
                    Title = title,
                    Body = body
                }
            };

            await _messaging.SendAsync(message);
        }
    }
}
