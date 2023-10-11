import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({example: 'email@gmail.com', description: 'foydalanuvchi emaili'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 'password', description: 'foydalanuvchi passwordi'})
    @IsNotEmpty()
    @IsString()
    password: string;   
}