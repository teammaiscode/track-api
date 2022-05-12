import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";


class ListUsersService {
  async execute(size, page) {
    if (typeof size != "number" || typeof page != "number" || size == null || page == null || page < 1) {
      throw new Error("Dados enviados são invalidos!");
    }
    const usersRepositories = getCustomRepository(UsersRepositories)

    var users = await usersRepositories.createQueryBuilder();
    var userAll = await users.limit(size).offset(size * (page - 1)).getMany();
    var quantidade = await users.getCount();
    var quantidadePaginas = Math.ceil(quantidade / size);
    return {
      "quantidade_ususario": quantidade,
      "quantidade_paginas": quantidadePaginas,
      "usuarios": userAll,
    };

  }
}

export { ListUsersService }