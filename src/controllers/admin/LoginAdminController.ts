import { Request, Response } from "express";
import { LoginAdminService } from "../../services/admin/LoginAdminService";

class LoginAdminController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const service = new LoginAdminService()

    const token = await service.execute({
      email,
      password
    })

    return response.json(token)
  }
}

export { LoginAdminController }