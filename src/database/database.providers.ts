
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '!e1969',
                database: 'academia',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                migrations: [__dirname + '/migration/{.ts,*.js}'],
                migrationsRun: true,
                synchronize: false,
            });

            return dataSource.initialize();
        },
    },
];