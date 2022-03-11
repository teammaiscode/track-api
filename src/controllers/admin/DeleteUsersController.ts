import { Request, Response } from "express";
import { DeleteUsersService } from "../../services/admin/DeleteUsersService";


class DeleteUsersController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const service = new DeleteUsersService();

    await service.execute(id);

    return response.json({
      message: "Usuário deletado com sucesso!"
    })
  }
}

export { DeleteUsersController }