import { Request, Response } from "express";
import { LoginUsersService } from "../../services/app/LoginUsersService";


class LoginUsersController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body

    const service = new LoginUsersService()

    const token = await service.execute({
      email,
      password
    })

    return res.json(token)
  }
}

export { LoginUsersController }