import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IChangeEmailRequest {
  user_id: string;
  email: string;
  emailConfirm: string;
}

class ChangeEmailService {
  async execute({ user_id, email, emailConfirm }: IChangeEmailRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    if (email !== emailConfirm) {
      throw new Error("Os emails informados não são iguais!");
    }
    if (!email) {
      throw new Error("Necessário email para efetuar a troca!");
    }

    await usersRepositories.update(
      {
        id: user_id
      },
      {
        email
      }
    );

    return "Email Alterado com Sucesso!";
  }
}

export { ChangeEmailService }