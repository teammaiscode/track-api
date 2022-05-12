import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/admin/ChangePasswordService";


class ResetPasswordUsersController {
    async handle(request: Request, response: Response) {

        const { id, new_password, confirm_password } = request.body;
        const service = new ChangePasswordService();

        await service.execute({
            id,
            new_password,
            confirm_password
        });

        return response.json({ message: "Senha alterada com sucesso!" })

    }
}

export { ResetPasswordUsersController }