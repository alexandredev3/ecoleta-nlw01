import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index (request: Request, response: Response) {
    const items = await knex('items').select('*');
  
    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        image_url: `http://${process.env.IMAGE_URL}/uploads/${item.image}`,
      };
    });
    // serializedItems porque nos estamos tranformando em uma informação mais acessivel.
  
    return response.json(serializedItems);
  }
}

export default ItemsController;