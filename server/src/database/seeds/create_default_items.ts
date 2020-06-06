import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    // Aqui podemos inserir quantos dados nos quisermos.
    { title: 'Lâmpadas', image: 'lampadas.svg' },
    { title: 'Pilhas e Baterias', image: 'baterias.svg' },
    { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
    { title: 'Resíduos e Eletrônicos', image: 'eletronicos.svg' },
    { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
    { title: 'Ôleo de Cozinha', image: 'oleo.svg' },
  ])
}