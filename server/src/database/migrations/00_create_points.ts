import Knex from 'knex';
// Nos estamos importando com K maiusculo porque os tipos do ts são assim.

export async function up(knex: Knex) {
  // CRIAR A TABELA
  return knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
    // 'uf', 2 porque a uf so vai ter 2 caracteres.
  });
    // Server para criar uma tabela dentro do banco de dados.
}
// Esse carinho que esta como parametro e uma estasia do knex.

export async function down(knex: Knex) {
  // VOLTAR ATRAS, DELETAR A TABELA CASO DAR ALGUMA COISA ERRADA NA TABELA
  return knex.schema.dropTable('points');
}