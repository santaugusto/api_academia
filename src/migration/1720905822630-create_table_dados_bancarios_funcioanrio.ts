import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDadosBancariosFuncioanrio1720905822630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE dados_bancarios_funcionario (
            id_dados_bancarios INT PRIMARY KEY AUTO_INCREMENT,
            banco TEXT,
            agencia TEXT,
            conta TEXT,
            tipo_conta TEXT
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE dados_bancarios_funcionario;
        `);
    }
}
