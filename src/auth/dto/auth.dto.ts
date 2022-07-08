import {  IsEmail, IsInt, IsNotEmpty, IsString, Length, Max } from "class-validator";

 export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 16 )
    password: string;

    @IsString()
    @Length(1, 23)
    firstName: string;

    @IsString()
    @Length(1, 36 )
    lastName: string;
    
    @IsInt()
    @Max(124)
    age: number;
}