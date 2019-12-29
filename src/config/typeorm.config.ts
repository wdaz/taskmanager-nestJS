import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'taskadmin',
    password: '123456',
    database: 'TaskManagement',
    entities: [
        'dist/**/*.entity{.ts,.js}',
    ],
    synchronize: true,
};
