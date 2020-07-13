import { MigrationInterface, QueryRunner } from 'typeorm';

export default class ChangeOrderProdsToOrdersProds1594610110136
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable('order_products', 'orders_products');
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.renameTable('orders_products', 'order_products');
  }
}
