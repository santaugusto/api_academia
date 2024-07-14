import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoFuncionarioModule } from './endereco_funcionario/endereco_funcionario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    TypeOrmModule.forRootAsync({
      useFactory: (ConfigService: ConfigService) => ({

        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        migrations: [__dirname + '/migration/{.ts,*.js}'],
        migrationsRun: true,
        synchronize: false,
        logging: true,
      }),
    }),
    EnderecoFuncionarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


