import knex from 'knex';
import path from 'path';

// Qual cliente que nos vamos estar utilizando. (que e a liguagem sql)
const connection = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true
  // o sqlite não suporta valores padrões então precisamos passar essa flag
})

export default connection;