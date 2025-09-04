import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/model/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost', // hoặc '127.0.0.1'
      port: 1433,
      username: 'sa',
      password: '123456789@Abc', // kiểm tra lại mật khẩu
      database: 'mydoc',
      options: {
        encrypt: false,
        trustServerCertificate: true, // ✅ cần thiết nếu dùng SQL Express
      },
      entities: [User],
      synchronize: false,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: () => ({
    //     type: 'mssql',
    //     host: process.env.DB_HOST,
    //     port: parseInt(process.env.DB_PORT ?? '1433', 10),
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_DATABASE,
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     options: {
    //       encrypt: false,
    //     }       
    //   }),
    // }),    
    UserModule
  ]
})
export class AppModule {}
