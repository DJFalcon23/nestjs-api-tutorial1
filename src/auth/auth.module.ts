import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {  AuthController } from "./auth.controller"
import { PrismaClient } from "@prisma/client";

@Module({
    imports: [PrismaClient],
    controllers: [AuthController],
    providers: [AuthService],
})

export class AuthModule {
}