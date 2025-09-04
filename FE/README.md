# Run UserAPI
- Install Docker Desktop
- Install Sql Server
  docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789@Abc" `
 -p 1433:1433 --name sql2022 -v sqlvolume:/var/opt/mssql `
 -d mcr.microsoft.com/mssql/server:2022-latest
 
 docker exec -it sql2022 /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 123456789@Abc

 create Database name: Userboard

 - in Visual Studio Code run the following command
 npm i
 npm run build
 npm run dev

# Run myswap application
 npm i
 npm run build
 npm run dev