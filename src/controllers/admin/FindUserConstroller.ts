import { Request, Response } from "express";
import { FindUserService } from "../../services/admin/FindUserService";


class FindUserConstroller {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const service = new FindUserService();

    var user = await service.execute(id);

    return response.json({
      user
    })
  }
}

export { FindUserConstroller }