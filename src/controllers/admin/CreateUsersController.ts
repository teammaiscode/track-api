import { Request, Response } from "express";
import { CreateUsersService } from "../../services/admin/CreateUsersService";

class CreateUsersController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const service = new CreateUsersService();

    await service.execute({ name, email, admin, password });

  }
}

export { CreateUsersController }