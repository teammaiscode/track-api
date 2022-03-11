import { Request, Response } from "express";
import { ListNearBusesService } from "../../services/app/ListNearBusesService";


class ListNearBusesController {
  async handle(request: Request, response: Response) {

    const { id_config, latitude, longitude } = request.body;

    const service = new ListNearBusesService();

    const result = await service.execute(id_config, latitude, longitude)

    return response.send(result)

  }
}

export { ListNearBusesController }