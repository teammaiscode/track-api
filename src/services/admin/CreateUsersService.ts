import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUsersService {
  async execute({ name, email, admin = false, password }: IUserRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    if (!email) {
      throw new Error("Email obrigatório!")
    }

    const userAlreadyExists = await usersRepositories.findOne({
      where: {
        email
      }
    })

    if (userAlreadyExists) {
      throw new Error("Usuário já existente no sistema!!")
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepositories.create({
      name,
      email,
      admin,
      password: passwordHash
    })

    await usersRepositories.save(user);

    return user;
  }
}

export { CreateUsersService }