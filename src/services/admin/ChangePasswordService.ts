import { LocalStorage } from "node-localstorage";
import { compare, hash } from "bcryptjs";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

interface IChangePasswordService {
    id?: string;
    new_password: string;
    confirm_password: string;
}

class ChangePasswordService {
    async execute({ id = undefined, new_password, confirm_password }: IChangePasswordService) {

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