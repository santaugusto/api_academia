import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFuncionario1720905822632 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE funcionario (
                id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
                nome TEXT,
                senha TEXT,
                email TEXT,
                cargo TEXT,
                id_informacoes_cadastro_funcionario INT,
                FOREIGN KEY (id_informacoes_cadastro_funcionario) REFERENCES informacoes_cadastro_funcionario(id_informacoes_cadastro_funcionario)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE funcionario;
        `);
    }
}
