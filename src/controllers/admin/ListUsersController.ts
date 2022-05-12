import { Request, Response } from "express";
import { ListUsersService } from "../../services/admin/ListUsersService";

class ListUsersController {
  async handle(req: Request, res: Response) {
    const { size, page } = req.body;
    const service = new ListUsersService();

    const users = await service.execute(size, page);

    return res.json(users);
  }
}

export { ListUsersController }