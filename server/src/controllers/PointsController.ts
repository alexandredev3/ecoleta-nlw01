import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(request: Request, response: Response) {
    // filtros: cidade, uf, items (vamos utilizar os Query Params)

    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));
    // Estou convertendo o items em uma string
    // estou separando cada item por uma virgula
    // estou percorrendo o items e para cada item aquele converter ele em um number e tirar os espaços.
    // assim eu vou ter certeza que o parseItems vai ser uma array.

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')
      // whereIn: eu estou buscando todos os points que tem pelo menos um item que estar dentro desse parseItems
      // distinct: ele vai retorna os pontos de coletas realmente distindos.
      // select('point.*') quero buscar todos os dados da tabela points

    const serializedPoints = points.map(point => {
      return {
        ...point, // eu vou retorna todas as informações do point
        image_url: `http://${process.env.IMAGE_URL}/uploads/${point.image}`
      }
    });
    // estou transformando em uma informação acesseiva para o mobile.

    return response.json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    // const id = request.params.id;
    // Usando desestruturação.
    const { id } = request.params;

    const point = await knex('points').where('id', id).first();
    // 'id', id: O "id" entre aspas esta se referindo ao campo do points
      // e o id sem aspas esta referindo ao id do request.params
    // first para ele ser unico, se não for colocado o first o point vai ser uma array

    if (!point) {
      return response.status(400).json({ error: 'Point not found.' });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://${process.env.IMAGE_URL}/uploads/${point.image}`
    };
    // não estou fazendo o map porque ja retorna um point...s

    /**
     * SELECT * FROM items
     *  JOIN point_items ON items.id = point_items.item_id
     * WHERE point_items.point_id = { id }
     */

    const items = await knex('items')
      .join('point_items', 'items.id', '=', 'point_items.item_id')
      .where('point_items.point_id', id)
      .select('title');
      // estou fazendo um join que o id do item seja igual ao point_items.item_id
      // Onde o point_items.point_id seja igual ao id que nos colcamos no request.params
      // O "Select" ele so vai retorna o title, ou qualquer outra informação que vc quiser retorna

    // point_item e a tabela que relaciona o item com um ponto de coleta.

    return response.json({ point: serializedPoint, items });
  }

  async create(request: Request, response: Response) {
    const { 
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
      } = request.body;
  
      // const name = request.body.name;
      // A cima estou fazendo a mesma coisa, so que usando desestruturação.
  
      const trx = await knex.transaction();
      // nesse caso um insert depende do outro, esse trx server para não executa o outro insert caso uma falhe.
      // Eu uso o trx ao invez de knex.
  
      const point = {
        image: request.file.filename,
        // la no retorno ele vai mostra o nome da imagem que foi feito upload.
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      }

      const insertedIds = await trx('points').insert(point)
      // Acima estou usando short sintaxe que e a mesma coisa de fazer isso = name: name
  
      // FAZENDO UM RELACIONAMENTO:
  
      const point_id = insertedIds[0];
  
      const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
        // Ele vai pecorrer aquela array de items, e ele vai retornar o id de cada item, e o id do point.
        return {
        item_id,
        point_id,
        // como nos so inseriu um registro, então ele so vai ter um id, ids[0] nos estamos pegando o id dele.
        };
      })
  
      await trx('point_items').insert(pointItems);
  
      await trx.commit();
      // Ele so vai fazer realmente o inserts na base de dados se colocar esse commit.
      // toda vez que tiver esse transaction insert temos que colocar esse commit.

      return response.json({
        id: point_id,
        ...point,
      });
  }
}

// export default new PointsController();
// Podemos export ele como uma estansia aqui, ou la no arquivo de routes colocar ele como um estasia
export default PointsController;
