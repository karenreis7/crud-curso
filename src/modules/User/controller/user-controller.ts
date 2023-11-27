/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from 'zod'; 
import { userService } from "../service/user-service";


class UserController {
    public async create(req: Request, res: Response){
        const {name, email, password} = req.body; 

        try {
            const zUserSchema = z.object({
                name: z.string().optional(), 
                email: z.string().email({ message: 'Email obrigatório!'}),
                password: z.string().min(8, {message: 'Senha obrigatória'})
            });

            zUserSchema.parse({name, email, password}); 
        } catch (err: any) {
            return res.status(400).json({ // codigo de dados invalidos
                message: "Dados inválidos!", 
                error: err.errors
            }) 
        }
        await userService.create(name, email, password)
    }
}

export const userController = new UserController(); 