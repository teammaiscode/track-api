import { LocalStorage } from "node-localstorage";
import { compare, hash } from "bcryptjs";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

interface IChangePasswordRequest {
  id?: string;
  old_password?: string;
  new_password: string;
  confirm_password: string;
}

class ChangePasswordService {
  async execute({ id = undefined, old_password = undefined, new_password, confirm_password }: IChangePasswordRequest) {

    var localStorage = new LocalStorage('./scratch');

    const usersRepositories = getCustomRepository(UsersRepositories)

    const usuario = await usersRepositories.findOne({
      where: [
        { email: localStorage.getItem("emailRecuperar") || undefined },
        { id: id }
      ],
    })

    if (localStorage.getItem("emailRecuperar") !== 'undefined') {
      localStorage.removeItem("emailRecuperar");
    }

    if (!usuario) {
      throw new Error("Credenciais Inválidas!");
    }

    if (old_password !== undefined) {
      const correctPass = compare(old_password, usuario.password);

      if (!correctPass) {
        throw new Error("Senha atual é inválida!");
      }
    }

    if (new_password !== confirm_password) {
      throw new Error("Senhas não conferem!");
    }

    const passwordHash = await hash(new_password, 8);

    const changePass = await usersRepositories.update(
      {
        id: usuario.id
      },
      {
        password: passwordHash
      }
    )

    return changePass;

  }
}

export { ChangePasswordService }