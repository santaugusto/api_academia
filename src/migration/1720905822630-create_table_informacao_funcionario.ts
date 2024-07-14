import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableInformacaoFuncionario1720905822630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE informacoes_cadastro_funcionario (
            id_informacoes_cadastro_funcionario INT PRIMARY KEY AUTO_INCREMENT,
            id_endereco_funcionario INT,
            telefone TEXT,
            cpf TEXT,
            salario FLOAT,
            data_nascimento DATE,
            data_desligamento DATE NULL,
            data_cadastro DATE,
            ativo BOOL,
            FOREIGN KEY (id_endereco_funcionario) REFERENCES endereco_funcionario(id_endereco_funcionario)
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE informacoes_cadastro_funcionario;
        `);
    }
}
