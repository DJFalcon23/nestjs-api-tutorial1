import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "../../node_modules/.prisma/client/runtime"
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) { }
    login() { }
    async signUp(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    age: dto.age,
                    hash
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            })
            delete user.hash;
            return user
        } catch(error) {
            console.log(error.code);
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }

    }
    async signIn(dto: AuthDto) {
        const user = await this.prisma.user.findUnique(
            { 
                where: { 
                    email: dto.email,
                }
            });
            if(!user) {
                throw new ForbiddenException('Credentials incorrect');
            }
        const isHash = await argon.verify(user.hash, dto.password);

            console.log(user, `hash string: ${user.hash}`);
        if (isHash){
            delete user.hash
            return {
                user,
                msg: "Hi, I've signed in!"
            }
        } else {
            throw new ForbiddenException('Credentials incorrect');
        }
    }
}