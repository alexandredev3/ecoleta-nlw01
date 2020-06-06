import Knex from 'knex';
// Nos estamos importando com K maiusculo porque os tipos do ts são assim.

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
    // Server para criar uma tabela dentro do banco de dados.
}
// Esse carinho que esta como parametro e uma estasia do knex.

export async function down(knex: Knex) {
  // VOLTAR ATRAS, DELETAR A TABELA CASO DAR ALGUMA COISA ERRADA NA TABELA
  return knex.schema.dropTable('items');
}