import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class SendTokenEmailService {
  async execute(email: string) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error("Email inválido!")
    }

    const token = Math.floor(1000 + Math.random() * 9000);

    return token;

  }
}

export { SendTokenEmailService }