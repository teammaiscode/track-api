import { Request, Response } from "express";
import { ChangeEmailService } from "../../services/app/ChangeEmailService";


class ChangeEmailController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;
    const { email, emailConfirm } = request.body;

    const service = new ChangeEmailService();

    const data = await service.execute({ user_id, email, emailConfirm });

    return response.json({ response: data });

  }
}

export { ChangeEmailController }