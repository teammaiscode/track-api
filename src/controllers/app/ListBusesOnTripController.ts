import { Request, Response } from "express";
import { ListBusesOnTripService } from "../../services/app/ListBusesOnTripService";


class ListBusesOnTripController {
  async handle(request: Request, response: Response) {
    const { id_config, id_linha, id_rota } = request.body

    const service = new ListBusesOnTripService()

    const result = await service.execute({ id_config, id_linha, id_rota })

    return response.send(result)
  }
}

export { ListBusesOnTripController }