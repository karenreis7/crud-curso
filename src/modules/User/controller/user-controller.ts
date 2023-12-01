/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { z } from 'zod';
import { userService } from '../service/user-service';

class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const zUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email({ message: 'Email obrigatório!' }),
        password: z.string().min(8, { message: 'Senha obrigatória' }),
      });

      zUserSchema.parse({ name, email, password });
    } catch (err: any) {
      return res.status(400).json({
        // codigo de dados invalidos
        message: 'Dados inválidos!',
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: 'Usuario criado com sucesso!',
        data: await userService.create(name, email, password),
      });
    } catch (err: any) {
      return res.status(409).json({
        message: err.message,
      });
    }
  }

  public async read(req: Request, res: Response) {
    const paramsId = req.params.id;

    try {
      const zUserSchema = z.string().min(30, { message: 'ID é obrigatório!' });
      zUserSchema.parse(paramsId);
    } catch (err: any) {
      return res.status(400).json({
        // codigo de dados invalidos
        message: 'Dados inválidos!',
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: 'usuario encontrado com sucesso!',
        data: await userService.read(paramsId),
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }
  public async update(req: Request, res: Response) {
    const paramsId = req.params.id;
    const { name } = req.body;

    try {
      const zUserSchema = z.object({
        paramsId: z.string().min(30, { message: 'ID é obrigatório' }),
        name: z.string().min(1, { message: 'Nome é obrigatório' }),
      });
      zUserSchema.parse({ paramsId, name });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }

    try {
      return res.json({
        message: 'Atualizado com sucesso!',
        data: await userService.update(paramsId, name),
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }
}
export const userController = new UserController();
