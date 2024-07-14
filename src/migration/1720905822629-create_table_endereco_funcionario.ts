import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableEnderecoFuncionario1720905822629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE endereco_funcionario (
            id_endereco_funcionario INT PRIMARY KEY AUTO_INCREMENT,
            rua TEXT,
            numero TEXT,
            bairro TEXT,
            cidade TEXT,
            estado TEXT,
            cep TEXT
        );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE endereco_funcionario;
        `);
    }

}
