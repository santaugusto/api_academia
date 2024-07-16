import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableLogin1720905822632  implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE login (
            id_login INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL,
            senha TEXT NOT NULL
        );        
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE login;
        `);
    }
}
