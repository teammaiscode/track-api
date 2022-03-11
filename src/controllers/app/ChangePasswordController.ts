import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/app/ChangePasswordService";

class ChangePasswordController {
  async handle(request: Request, response: Response) {

    const { id, old_password, new_password, confirm_password } = request.body;

    const service = new ChangePasswordService();

    await service.execute({
      id,
      old_password,
      new_password,
      confirm_password
    });

    return response.json({ message: "Senha alterada com sucesso!" })

  }
}

export { ChangePasswordController }