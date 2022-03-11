import { Request, Response } from "express";
import { ListBusOnGarageService } from "../../services/app/ListBusOnGarageService";

class ListBusOnGarageController {
  async handle(request: Request, response: Response) {

    const { id_config, identification } = request.body;

    const listBusOnGarageService = new ListBusOnGarageService();

    const buses = await listBusOnGarageService.execute(id_config, identification);

    return response.send(buses);
  }
}

export { ListBusOnGarageController }