import { Request, Response } from 'express';
import { prismaConnect } from 'prismaConn';
import bcrypt from 'bcrypt';
import { UtilsFileUser } from '../utils/utils-file';

class UserService {
  public async create(name: string, email: string, password: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
    });

    if (findUser) {
      // verifica se já existe um usuario
      throw new Error('Dados já existente.');
    }

    const create = await prismaConnect.user.create({
      // faz a criação do usuario no banco
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 6),
      },

      select: {
        // retorna apenas esses dados selecionados
        id: true,
        name: true,
        email: true,
      },
    });

    UtilsFileUser.createFolderUser(create.id); // criação da pasta do usuario

    return create; // retorna no user-controller
  }

  public async read(paramsId: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        id: paramsId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!findUser) {
      throw new Error('Dados não encontrados!');
    }

    return findUser;
  }

  public async update(paramsId: string, name: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        id: paramsId,
      },
    });
    if (!findUser) {
      throw new Error('Dados não encontrados!');
    }

    const update = await prismaConnect.user.update({
      where: {
        id: paramsId,
      },
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}
export const userService = new UserService();
