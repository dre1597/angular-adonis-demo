import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('forgot_password_token').nullable();
      table.timestamp('forgot_password_token_expires_at', { useTz: true }).nullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('forgot_password_token');
      table.dropColumn('forgot_password_token_expires_at');
    });
  }
}
