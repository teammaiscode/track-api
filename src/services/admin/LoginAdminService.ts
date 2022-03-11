import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";

interface ILoginRequest {
  email: string;
  password: string;
}

class LoginAdminService {
  async execute({ email, password }: ILoginRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories)

    const user = await usersRepositories.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new Error("Credenciais Inválidas!");
    }

    if (user.admin == false) {
      throw new Error("Somente admins tem acesso!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Credenciais Inválidas!");
    }

    const token = sign({
      email: user.email
    }, "fe48a24cc0d472dffa04dab0feec9b49",
      {
        subject: user.id,
        expiresIn: "1d"
      })

    return { token };

  }
}

export { LoginAdminService }