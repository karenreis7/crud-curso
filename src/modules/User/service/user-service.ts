import { Request, Response } from 'express';
import { prismaConnect } from 'prismaConn';

class UserService {
  public async create(name: string, email: string, password: string) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        email,
      },
    });

    if(findUser){
      throw new Error()
    }

  }
}

export const userService = new UserService();
