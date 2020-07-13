import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class ChangeQuantityToInt41594611291401
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'orders_products',
      'quantity',
      new TableColumn({
        name: 'quantity',
        type: 'int',
      }),
    );
    await queryRunner.changeColumn(
      'products',
      'quantity',
      new TableColumn({
        name: 'quantity',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'orders_products',
      'quantity',
      new TableColumn({
        name: 'quantity',
        type: 'bigint',
      }),
    );
    await queryRunner.changeColumn(
      'products',
      'quantity',
      new TableColumn({
        name: 'quantity',
        type: 'bigint',
      }),
    );
  }
}
