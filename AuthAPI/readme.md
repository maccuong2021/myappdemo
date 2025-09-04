dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0

dotnet ef migrations add Init
dotnet ef migrations add AddRefreshTokenToUser
dotnet ef database update

761e427169fdd5c8356b5c34211b3463b145b95a640b6d8a516c7e8e560e7acf