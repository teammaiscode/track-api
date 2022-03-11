import { Request, Response } from "express";
import { AuthMeService } from "../../services/admin/AuthMeService";


class AuthMeController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const service = new AuthMeService();

    const userInfo = await service.execute(user_id);

    return response.json(userInfo);

  }
}

export { AuthMeController }