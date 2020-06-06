import Knex from 'knex';
// Nos estamos importando com K maiusculo porque os tipos do ts são assim.

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');
      // O point_id ele vai criar uma chave estrageira na tabela points no campo id.

    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
    // Server para criar uma tabela dentro do banco de dados.
}
// Esse carinho que esta como parametro e uma estasia do knex.

export async function down(knex: Knex) {
  // VOLTAR ATRAS, DELETAR A TABELA CASO DAR ALGUMA COISA ERRADA NA TABELA
  return knex.schema.dropTable('point_items');
}