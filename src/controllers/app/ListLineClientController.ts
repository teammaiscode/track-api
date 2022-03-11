import { Request, Response } from "express";
import { ListLineClientService } from "../../services/app/ListLineClientService";


class ListLineClientController {
  async handle(request: Request, response: Response) {
    const { id_config, client } = request.body;

    const service = new ListLineClientService();

    const result = await service.execute(id_config, client)

    return response.send(result)
  }
}

export { ListLineClientController }