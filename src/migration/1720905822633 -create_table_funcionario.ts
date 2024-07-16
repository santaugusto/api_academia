import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFuncionario1720905822633 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE funcionario (
            id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255),
            email VARCHAR(255) UNIQUE NOT NULL,
            cargo VARCHAR(255),
            senha VARCHAR(255),  
            id_informacoes_cadastro_funcionario INT NULL,
            id_login INT,
            FOREIGN KEY (id_informacoes_cadastro_funcionario) REFERENCES informacoes_cadastro_funcionario(id_informacoes_cadastro_funcionario),
            FOREIGN KEY (id_login) REFERENCES login(id_login)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE funcionario;
        `);
    }
}
