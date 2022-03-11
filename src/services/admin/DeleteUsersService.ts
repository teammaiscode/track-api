import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

class DeleteUsersService {
  async execute(id: string) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      where: {
        id
      }
    })

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    await usersRepositories.delete({
      id
    });
  }
}

export { DeleteUsersService }