import { ConfigModule, ConfigService } from '@nestjs/config';
import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnderecoFuncionarioModule } from './endereco_funcionario/endereco_funcionario.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InformacaoFuncionarioModule } from './informacao-funcionario/informacao-funcionario.module';
import { DadosBancariosFuncionaarioModule } from './dados-bancarios-funcionaario/dados-bancarios-funcionaario.module';
import { DadosBancariosFuncionario } from './dados-bancarios-funcionaario/entities/dados-bancarios-funcionaario.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*/*.entity{.js,.ts}' ],
        migrations: [__dirname + '/migration/{.ts,*.js}'],
        migrationsRun: true,
        synchronize: false,
        logging: true,
      }),
    }),
    EnderecoFuncionarioModule,
    InformacaoFuncionarioModule,
    DadosBancariosFuncionaarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USERNAME:', process.env.DB_USERNAME);